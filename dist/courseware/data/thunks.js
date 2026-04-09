var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { logError, logInfo } from '@edx/frontend-platform/logging';
import { getCourseHomeCourseMetadata } from '../../course-home/data/api';
import { addModel, addModelsMap, updateModel, updateModels, updateModelsMap, } from '../../generic/model-store';
import { getBlockCompletion, getCourseDiscussionConfig, getCourseMetadata, getCourseOutline, getCourseTopics, getCoursewareOutlineSidebarToggles, getLearningSequencesOutline, getSequenceMetadata, postIntegritySignature, postSequencePosition, } from './api';
import { fetchCourseDenied, fetchCourseFailure, fetchCourseRequest, fetchCourseSuccess, fetchSequenceFailure, fetchSequenceRequest, fetchSequenceSuccess, fetchCourseOutlineRequest, fetchCourseOutlineSuccess, fetchCourseOutlineFailure, setCoursewareOutlineSidebarToggles, updateCourseOutlineCompletion, } from './slice';
export function fetchCourse(courseId) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        dispatch(fetchCourseRequest({ courseId }));
        Promise.allSettled([
            getCourseMetadata(courseId),
            getLearningSequencesOutline(courseId),
            getCourseHomeCourseMetadata(courseId, 'courseware'),
            getCoursewareOutlineSidebarToggles(courseId),
        ]).then(([courseMetadataResult, learningSequencesOutlineResult, courseHomeMetadataResult, coursewareOutlineSidebarTogglesResult]) => {
            const fetchedMetadata = courseMetadataResult.status === 'fulfilled';
            const fetchedCourseHomeMetadata = courseHomeMetadataResult.status === 'fulfilled';
            const fetchedOutline = learningSequencesOutlineResult.status === 'fulfilled';
            const fetchedCoursewareOutlineSidebarTogglesResult = coursewareOutlineSidebarTogglesResult.status === 'fulfilled';
            if (fetchedMetadata) {
                dispatch(addModel({
                    modelType: 'coursewareMeta',
                    model: courseMetadataResult.value,
                }));
            }
            if (fetchedCourseHomeMetadata) {
                dispatch(addModel({
                    modelType: 'courseHomeMeta',
                    model: Object.assign({ id: courseId }, courseHomeMetadataResult.value),
                }));
            }
            if (fetchedOutline) {
                const { courses, sections, sequences, } = learningSequencesOutlineResult.value;
                // This updates the course with a sectionIds array from the Learning Sequence data.
                dispatch(updateModelsMap({
                    modelType: 'coursewareMeta',
                    modelsMap: courses,
                }));
                dispatch(addModelsMap({
                    modelType: 'sections',
                    modelsMap: sections,
                }));
                // We update for sequences because the sequence metadata may have come back first.
                dispatch(updateModelsMap({
                    modelType: 'sequences',
                    modelsMap: sequences,
                }));
            }
            if (fetchedCoursewareOutlineSidebarTogglesResult) {
                const { enable_completion_tracking: enableCompletionTracking, } = coursewareOutlineSidebarTogglesResult.value;
                dispatch(setCoursewareOutlineSidebarToggles({ enableCompletionTracking }));
            }
            // Log errors for each request if needed. Outline failures may occur
            // even if the course metadata request is successful
            if (!fetchedOutline) {
                const { response } = learningSequencesOutlineResult.reason;
                if (response && response.status === 403) {
                    // 403 responses are normal - they happen when the learner is logged out.
                    // We'll redirect them in a moment to the outline tab by calling fetchCourseDenied() below.
                    logInfo(learningSequencesOutlineResult.reason);
                }
                else {
                    logError(learningSequencesOutlineResult.reason);
                }
            }
            if (!fetchedMetadata) {
                logError(courseMetadataResult.reason);
            }
            if (!fetchedCourseHomeMetadata) {
                logError(courseHomeMetadataResult.reason);
            }
            if (!fetchedCoursewareOutlineSidebarTogglesResult) {
                logError(coursewareOutlineSidebarTogglesResult.reason);
            }
            if (fetchedMetadata && fetchedCourseHomeMetadata) {
                if (courseHomeMetadataResult.value.courseAccess.hasAccess && fetchedOutline) {
                    // User has access
                    dispatch(fetchCourseSuccess({ courseId }));
                    return;
                }
                // User either doesn't have access or only has partial access
                // (can't access course blocks)
                dispatch(fetchCourseDenied({ courseId }));
                return;
            }
            // Definitely an error happening
            dispatch(fetchCourseFailure({ courseId }));
        });
    });
}
export function fetchSequence(sequenceId, isPreview) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        dispatch(fetchSequenceRequest({ sequenceId }));
        try {
            const { sequence, units } = yield getSequenceMetadata(sequenceId, { preview: isPreview ? '1' : '0' });
            if (sequence.blockType !== 'sequential') {
                // Some other block types (particularly 'chapter') can be returned
                // by this API. We want to error in that case, since downstream
                // courseware code is written to render Sequences of Units.
                logError(`Requested sequence '${sequenceId}' `
                    + `has block type '${sequence.blockType}'; expected block type 'sequential'.`);
                dispatch(fetchSequenceFailure({ sequenceId }));
            }
            else {
                dispatch(updateModel({
                    modelType: 'sequences',
                    model: sequence,
                }));
                dispatch(updateModels({
                    modelType: 'units',
                    models: units,
                }));
                dispatch(fetchSequenceSuccess({ sequenceId }));
            }
        }
        catch (error) {
            // Some errors are expected - for example, CoursewareContainer may request sequence metadata for a unit and rely
            // on the request failing to notice that it actually does have a unit (mostly so it doesn't have to know anything
            // about the opaque key structure). In such cases, the backend gives us a 422.
            const sequenceMightBeUnit = ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status) === 422;
            if (!sequenceMightBeUnit) {
                logError(error);
            }
            dispatch(fetchSequenceFailure({ sequenceId, sequenceMightBeUnit }));
        }
    });
}
export function checkBlockCompletion(courseId, sequenceId, unitId) {
    return (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { models } = getState();
        if ((_a = models.units[unitId]) === null || _a === void 0 ? void 0 : _a.complete) {
            return {}; // do nothing. Things don't get uncompleted after they are completed.
        }
        try {
            const isComplete = yield getBlockCompletion(courseId, sequenceId, unitId);
            dispatch(updateModel({
                modelType: 'units',
                model: {
                    id: unitId,
                    complete: isComplete,
                },
            }));
            dispatch(updateCourseOutlineCompletion({ sequenceId, unitId, isComplete }));
            return isComplete;
        }
        catch (error) {
            logError(error);
        }
        return {};
    });
}
export function saveSequencePosition(courseId, sequenceId, activeUnitIndex) {
    return (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
        const { models } = getState();
        const initialActiveUnitIndex = models.sequences[sequenceId].activeUnitIndex;
        // Optimistically update the position.
        dispatch(updateModel({
            modelType: 'sequences',
            model: {
                id: sequenceId,
                activeUnitIndex,
            },
        }));
        try {
            yield postSequencePosition(courseId, sequenceId, activeUnitIndex);
            // Update again under the assumption that the above call succeeded, since it doesn't return a
            // meaningful response.
            dispatch(updateModel({
                modelType: 'sequences',
                model: {
                    id: sequenceId,
                    activeUnitIndex,
                },
            }));
        }
        catch (error) {
            logError(error);
            dispatch(updateModel({
                modelType: 'sequences',
                model: {
                    id: sequenceId,
                    activeUnitIndex: initialActiveUnitIndex,
                },
            }));
        }
    });
}
export function saveIntegritySignature(courseId, isMasquerading) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        try {
            // If the request is made by a staff user masquerading as a specific learner,
            // don't actually create a signature for them on the backend,
            // only the modal dialog will be dismissed
            if (!isMasquerading) {
                yield postIntegritySignature(courseId);
            }
            dispatch(updateModel({
                modelType: 'coursewareMeta',
                model: {
                    id: courseId,
                    userNeedsIntegritySignature: false,
                },
            }));
        }
        catch (error) {
            logError(error);
        }
    });
}
export function getCourseDiscussionTopics(courseId) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        try {
            const config = yield getCourseDiscussionConfig(courseId);
            // Only load topics for the openedx provider, the legacy provider uses
            // the xblock
            if (config.provider === 'openedx') {
                const topics = yield getCourseTopics(courseId);
                dispatch(updateModels({
                    modelType: 'discussionTopics',
                    models: topics.filter(topic => topic.usageKey),
                    idField: 'usageKey',
                }));
            }
        }
        catch (error) {
            logError(error);
        }
    });
}
export function getCourseOutlineStructure(courseId) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        dispatch(fetchCourseOutlineRequest());
        try {
            const courseOutline = yield getCourseOutline(courseId);
            dispatch(fetchCourseOutlineSuccess({ courseOutline }));
        }
        catch (error) {
            logError(error);
            dispatch(fetchCourseOutlineFailure());
        }
    });
}
//# sourceMappingURL=thunks.js.map