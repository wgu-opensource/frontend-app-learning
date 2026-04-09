var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';
import { executePostFromPostEvent, getCourseHomeCourseMetadata, getDatesTabData, getOutlineTabData, getProgressTabData, postCourseDeadlines, deprecatedPostCourseGoals, postWeeklyLearningGoal, postDismissWelcomeMessage, postRequestCert, getLiveTabIframe, getCoursewareSearchEnabled, searchCourseContentFromAPI, } from './api';
import { addModel, updateModel, } from '../../generic/model-store';
import { fetchTabDenied, fetchTabFailure, fetchTabRequest, fetchTabSuccess, setCallToActionToast, } from './slice';
import mapSearchResponse from '../courseware-search/map-search-response';
const eventTypes = {
    POST_EVENT: 'post_event',
};
export function fetchTab(courseId, tab, getTabData, targetUserId) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        dispatch(fetchTabRequest({ courseId }));
        try {
            const promisesToFulfill = [getCourseHomeCourseMetadata(courseId, 'outline')];
            if (getTabData) {
                promisesToFulfill.push(getTabData(courseId, targetUserId));
            }
            const [courseHomeCourseMetadataResult, tabDataResult,] = yield Promise.allSettled(promisesToFulfill);
            if (courseHomeCourseMetadataResult.status === 'fulfilled') {
                dispatch(addModel({
                    modelType: 'courseHomeMeta',
                    model: Object.assign({ id: courseId }, courseHomeCourseMetadataResult.value),
                }));
            }
            if ((tabDataResult === null || tabDataResult === void 0 ? void 0 : tabDataResult.status) === 'fulfilled') {
                dispatch(addModel({
                    modelType: tab,
                    model: Object.assign({ id: courseId }, tabDataResult.value),
                }));
            }
            if (courseHomeCourseMetadataResult.status === 'rejected') {
                throw courseHomeCourseMetadataResult.reason;
            }
            else if (!courseHomeCourseMetadataResult.value.courseAccess.hasAccess) {
                // If the learner does not have access to the course, short cut to dispatch to a denied response regardless of
                // the tabDataResult.
                dispatch(fetchTabDenied({ courseId }));
            }
            else if ((tabDataResult === null || tabDataResult === void 0 ? void 0 : tabDataResult.status) === 'rejected') {
                throw tabDataResult.reason;
            }
            else {
                dispatch(fetchTabSuccess({
                    courseId,
                    targetUserId,
                }));
            }
        }
        catch (e) {
            dispatch(fetchTabFailure({ courseId }));
            logError(e);
        }
    });
}
export function fetchDatesTab(courseId) {
    return fetchTab(courseId, 'dates', getDatesTabData);
}
export function fetchProgressTab(courseId, targetUserId) {
    return fetchTab(courseId, 'progress', getProgressTabData, parseInt(targetUserId, 10) || targetUserId);
}
export function fetchOutlineTab(courseId) {
    return fetchTab(courseId, 'outline', getOutlineTabData);
}
export function fetchLiveTab(courseId) {
    return fetchTab(courseId, 'live', getLiveTabIframe);
}
export function fetchDiscussionTab(courseId) {
    return fetchTab(courseId, 'discussion');
}
export function dismissWelcomeMessage(courseId) {
    return () => __awaiter(this, void 0, void 0, function* () { return postDismissWelcomeMessage(courseId); });
}
export function requestCert(courseId) {
    return () => __awaiter(this, void 0, void 0, function* () { return postRequestCert(courseId); });
}
export function resetDeadlines(courseId, model, getTabData) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        postCourseDeadlines(courseId, model).then(response => {
            const { data } = response;
            const { header, link, link_text: linkText, } = data;
            dispatch(getTabData(courseId));
            dispatch(setCallToActionToast({ header, link, linkText }));
        });
    });
}
export function deprecatedSaveCourseGoal(courseId, goalKey) {
    return __awaiter(this, void 0, void 0, function* () {
        return deprecatedPostCourseGoals(courseId, goalKey);
    });
}
export function saveWeeklyLearningGoal(courseId, daysPerWeek, subscribedToReminders) {
    return __awaiter(this, void 0, void 0, function* () {
        return postWeeklyLearningGoal(courseId, daysPerWeek, subscribedToReminders);
    });
}
export function processEvent(eventData, getTabData) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        // Pulling this out early so the data doesn't get camelCased and is easier
        // to use when it's passed to the backend
        const { research_event_data: researchEventData } = eventData;
        const event = camelCaseObject(eventData);
        if (event.eventName === eventTypes.POST_EVENT) {
            executePostFromPostEvent(event.postData, researchEventData).then(response => {
                const { data } = response;
                const { header, link, link_text: linkText, } = data;
                dispatch(getTabData(event.postData.bodyParams.courseId));
                dispatch(setCallToActionToast({ header, link, linkText }));
            });
        }
    });
}
export function fetchCoursewareSearchSettings(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { enabled } = yield getCoursewareSearchEnabled(courseId);
            return { enabled };
        }
        catch (e) {
            return { enabled: false };
        }
    });
}
export function searchCourseContent(courseId, searchKeyword) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        const start = new Date();
        dispatch(addModel({
            modelType: 'contentSearchResults',
            model: {
                id: courseId,
                searchKeyword,
                results: [],
                errors: undefined,
                loading: true,
            },
        }));
        let data;
        let curatedResponse;
        let errors;
        try {
            ({ data } = yield searchCourseContentFromAPI(courseId, searchKeyword));
            curatedResponse = mapSearchResponse(data, searchKeyword);
        }
        catch (e) {
            // TODO: Remove when publishing to prod. Just temporary for performance debugging.
            // eslint-disable-next-line no-console
            console.error('Error on Courseware Search: ', e.message);
            errors = e.message;
        }
        dispatch(updateModel({
            modelType: 'contentSearchResults',
            model: Object.assign(Object.assign({}, curatedResponse), { id: courseId, searchKeyword,
                errors, loading: false }),
        }));
        const end = new Date();
        const clientMs = (end - start);
        const { took, total, maxScore, accessDeniedCount, } = data;
        // TODO: Remove when publishing to prod. Just temporary for performance debugging.
        // eslint-disable-next-line no-console
        console.table({
            'Search Keyword': searchKeyword,
            'Client time (ms)': clientMs,
            'Server time (ms)': took,
            'Total matches': total,
            'Max score': maxScore,
            'Access denied count': accessDeniedCount,
        });
    });
}
//# sourceMappingURL=thunks.js.map