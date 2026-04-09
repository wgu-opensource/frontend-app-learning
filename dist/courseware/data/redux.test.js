var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Factory } from 'rosie';
import MockAdapter from 'axios-mock-adapter';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';
import { FAILED, LOADING } from '@src/constants';
import * as thunks from './thunks';
import { appendBrowserTimezoneToUrl, executeThunk } from '../../utils';
import { buildSimpleCourseBlocks } from '../../shared/data/__factories__/courseBlocks.factory';
import { buildOutlineFromBlocks } from './__factories__/learningSequencesOutline.factory';
import { initializeMockApp } from '../../setupTest';
import initializeStore from '../../store';
const { loggingService } = initializeMockApp();
const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
describe('Data layer integration tests', () => {
    const courseBaseUrl = `${getConfig().LMS_BASE_URL}/api/courseware/course`;
    const learningSequencesUrlRegExp = new RegExp(`${getConfig().LMS_BASE_URL}/api/learning_sequences/v1/course_outline/*`);
    const sequenceBaseUrl = `${getConfig().LMS_BASE_URL}/api/courseware/sequence`;
    // building minimum set of api responses to test all thunks
    const courseMetadata = Factory.build('courseMetadata');
    const courseId = courseMetadata.id;
    const courseHomeMetadata = Factory.build('courseHomeMetadata');
    const { courseBlocks, unitBlocks, sequenceBlocks } = buildSimpleCourseBlocks(courseId);
    const sequenceMetadata = Factory.build('sequenceMetadata', {}, { courseId, unitBlocks, sequenceBlock: sequenceBlocks[0] });
    const simpleOutline = buildOutlineFromBlocks(courseBlocks);
    let courseUrl = `${courseBaseUrl}/${courseId}`;
    courseUrl = appendBrowserTimezoneToUrl(courseUrl);
    const courseHomeMetadataUrl = appendBrowserTimezoneToUrl(`${getConfig().LMS_BASE_URL}/api/course_home/course_metadata/${courseId}`);
    const sequenceUrl = `${sequenceBaseUrl}/${sequenceMetadata.item_id}`;
    const sequenceId = sequenceBlocks[0].id;
    const unitId = unitBlocks[0].id;
    const coursewareSidebarSettingsUrl = `${getConfig().LMS_BASE_URL}/courses/${courseId}/courseware-navigation-sidebar/toggles/`;
    let store;
    beforeEach(() => {
        axiosMock.reset();
        loggingService.logError.mockReset();
        store = initializeStore();
    });
    describe('Test fetchCourse', () => {
        it('Should fail to fetch course and blocks if request error happens', () => __awaiter(void 0, void 0, void 0, function* () {
            axiosMock.onGet(courseUrl).networkError();
            axiosMock.onGet(learningSequencesUrlRegExp).networkError();
            axiosMock.onGet(coursewareSidebarSettingsUrl).networkError();
            yield executeThunk(thunks.fetchCourse(courseId), store.dispatch);
            expect(loggingService.logError).toHaveBeenCalled();
            expect(store.getState().courseware).toEqual(expect.objectContaining({
                courseId,
                courseOutline: {},
                courseStatus: FAILED,
                coursewareOutlineSidebarSettings: {},
                courseOutlineStatus: LOADING,
                sequenceId: null,
                sequenceMightBeUnit: false,
                sequenceStatus: LOADING,
            }));
        }));
        it('Should fetch, normalize, and save metadata, but with denied status', () => __awaiter(void 0, void 0, void 0, function* () {
            const forbiddenCourseMetadata = Factory.build('courseMetadata');
            const forbiddenCourseHomeMetadata = Factory.build('courseHomeMetadata', {
                course_access: {
                    has_access: false,
                },
            });
            const forbiddenCourseHomeUrl = appendBrowserTimezoneToUrl(`${getConfig().LMS_BASE_URL}/api/course_home/course_metadata/${courseId}`);
            const forbiddenCourseBlocks = Factory.build('courseBlocks', {
                courseId: forbiddenCourseMetadata.id,
            });
            let forbiddenCourseUrl = `${courseBaseUrl}/${forbiddenCourseMetadata.id}`;
            forbiddenCourseUrl = appendBrowserTimezoneToUrl(forbiddenCourseUrl);
            axiosMock.onGet(forbiddenCourseHomeUrl).reply(200, forbiddenCourseHomeMetadata);
            axiosMock.onGet(forbiddenCourseUrl).reply(200, forbiddenCourseMetadata);
            axiosMock.onGet(learningSequencesUrlRegExp).reply(200, buildOutlineFromBlocks(forbiddenCourseBlocks));
            yield executeThunk(thunks.fetchCourse(forbiddenCourseMetadata.id), store.dispatch);
            const state = store.getState();
            expect(state.courseware.courseStatus).toEqual('denied');
            // check that at least one key camel cased, thus course data normalized
            expect(state.models.courseHomeMeta[forbiddenCourseMetadata.id].courseAccess).not.toBeUndefined();
        }));
        it('Should fetch, normalize, and save metadata', () => __awaiter(void 0, void 0, void 0, function* () {
            axiosMock.onGet(courseHomeMetadataUrl).reply(200, courseHomeMetadata);
            axiosMock.onGet(courseUrl).reply(200, courseMetadata);
            axiosMock.onGet(learningSequencesUrlRegExp).reply(200, buildOutlineFromBlocks(courseBlocks));
            axiosMock.onGet(coursewareSidebarSettingsUrl).reply(200, {
                enable_completion_tracking: true,
            });
            yield executeThunk(thunks.fetchCourse(courseId), store.dispatch);
            const state = store.getState();
            expect(state.courseware.courseStatus).toEqual('loaded');
            expect(state.courseware.courseId).toEqual(courseId);
            expect(state.courseware.sequenceStatus).toEqual('loading');
            expect(state.courseware.sequenceId).toEqual(null);
            expect(state.courseware.coursewareOutlineSidebarSettings).toEqual({
                enableCompletionTracking: true,
            });
            // check that at least one key camel cased, thus course data normalized
            expect(state.models.coursewareMeta[courseId].marketingUrl).not.toBeUndefined();
        }));
        it('Should fetch, normalize, and save metadata; filtering has no effect', () => __awaiter(void 0, void 0, void 0, function* () {
            // Very similar to previous test, but pass back an outline for filtering
            // (even though it won't actually filter down in this case).
            axiosMock.onGet(courseHomeMetadataUrl).reply(200, courseHomeMetadata);
            axiosMock.onGet(courseUrl).reply(200, courseMetadata);
            axiosMock.onGet(learningSequencesUrlRegExp).reply(200, simpleOutline);
            axiosMock.onGet(coursewareSidebarSettingsUrl).reply(200, {
                enable_completion_tracking: false,
            });
            yield executeThunk(thunks.fetchCourse(courseId), store.dispatch);
            const state = store.getState();
            expect(state.courseware.courseStatus).toEqual('loaded');
            expect(state.courseware.courseId).toEqual(courseId);
            expect(state.courseware.sequenceStatus).toEqual('loading');
            expect(state.courseware.sequenceId).toEqual(null);
            expect(state.courseware.coursewareOutlineSidebarSettings).toEqual({
                enableCompletionTracking: false,
            });
            // check that at least one key camel cased, thus course data normalized
            expect(state.models.coursewareMeta[courseId].marketingUrl).not.toBeUndefined();
            expect(state.models.sequences.length === 1);
            Object.values(state.models.sections).forEach(section => expect(section.sequenceIds.length === 1));
        }));
        it('Should fetch, normalize, and save metadata; filtering removes sequence', () => __awaiter(void 0, void 0, void 0, function* () {
            // Very similar to previous test, but pass back an outline for filtering
            // (even though it won't actually filter down in this case).
            axiosMock.onGet(courseHomeMetadataUrl).reply(200, courseHomeMetadata);
            axiosMock.onGet(courseUrl).reply(200, courseMetadata);
            // Create an outline with basic matching metadata, but then empty it out...
            const emptyOutline = buildOutlineFromBlocks(courseBlocks);
            emptyOutline.sequences = {};
            emptyOutline.sections = [];
            axiosMock.onGet(learningSequencesUrlRegExp).reply(200, emptyOutline);
            yield executeThunk(thunks.fetchCourse(courseId), store.dispatch);
            const state = store.getState();
            expect(state.courseware.courseStatus).toEqual('loaded');
            expect(state.courseware.courseId).toEqual(courseId);
            expect(state.courseware.sequenceStatus).toEqual('loading');
            expect(state.courseware.sequenceId).toEqual(null);
            // check that at least one key camel cased, thus course data normalized
            expect(state.models.coursewareMeta[courseId].marketingUrl).not.toBeUndefined();
            expect(state.models.sequences === null);
            Object.values(state.models.sections).forEach(section => expect(section.sequenceIds.length === 0));
        }));
    });
    describe('Test fetchSequence', () => {
        it('Should result in fetch failure if error occurs', () => __awaiter(void 0, void 0, void 0, function* () {
            axiosMock.onGet(sequenceUrl).networkError();
            yield executeThunk(thunks.fetchSequence(sequenceId), store.dispatch);
            expect(loggingService.logError).toHaveBeenCalled();
            expect(store.getState().courseware.sequenceStatus).toEqual('failed');
        }));
        it('Should result in fetch failure if a non-sequential block is returned', () => __awaiter(void 0, void 0, void 0, function* () {
            const sectionMetadata = Object.assign(Object.assign({}, sequenceMetadata), { 
                // 'chapter' is the block_type of a Section, which the sequence metadata
                // API will happily return if requested, since SectionBlock is implemented
                // as a subclass of SequenceBlock.
                tag: 'chapter' });
            axiosMock.onGet(sequenceUrl).reply(200, sectionMetadata);
            yield executeThunk(thunks.fetchSequence(sequenceId), store.dispatch);
            expect(loggingService.logError).toHaveBeenCalled();
            expect(store.getState().courseware.sequenceStatus).toEqual('failed');
        }));
        it('Should fetch and normalize metadata, and then update existing models with sequence metadata', () => __awaiter(void 0, void 0, void 0, function* () {
            axiosMock.onGet(courseHomeMetadataUrl).reply(200, courseHomeMetadata);
            axiosMock.onGet(courseUrl).reply(200, courseMetadata);
            axiosMock.onGet(learningSequencesUrlRegExp).reply(200, buildOutlineFromBlocks(courseBlocks));
            axiosMock.onGet(sequenceUrl).reply(200, sequenceMetadata);
            // setting course with blocks before sequence to check that blocks receive
            // additional information after fetchSequence call.
            yield executeThunk(thunks.fetchCourse(courseId), store.dispatch);
            // ensure that initial state has no additional sequence info
            let state = store.getState();
            expect(state.models.sequences).toEqual({
                [sequenceId]: expect.not.objectContaining({
                    gatedContent: expect.any(Object),
                    activeUnitIndex: expect.any(Number),
                }),
            });
            // Update our state variable again.
            state = store.getState();
            expect(state.courseware.courseStatus).toEqual('loaded');
            expect(state.courseware.courseId).toEqual(courseId);
            expect(state.courseware.sequenceStatus).toEqual('loading');
            expect(state.courseware.sequenceId).toEqual(null);
            yield executeThunk(thunks.fetchSequence(sequenceId), store.dispatch);
            // Update our state variable again.
            state = store.getState();
            // ensure that additional information appeared in store
            expect(state.models.sequences).toEqual({
                [sequenceId]: expect.objectContaining({
                    gatedContent: expect.any(Object),
                    activeUnitIndex: expect.any(Number),
                }),
            });
            expect(state.models.units).toEqual({
                [unitId]: expect.objectContaining({
                    complete: null,
                    bookmarked: expect.any(Boolean),
                }),
            });
            expect(state.courseware.courseStatus).toEqual('loaded');
            expect(state.courseware.courseId).toEqual(courseId);
            expect(state.courseware.sequenceStatus).toEqual('loaded');
            expect(state.courseware.sequenceId).toEqual(sequenceId);
        }));
    });
    describe('Thunks that require fetched sequences', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            // thunks tested in this block rely on fact, that store already has
            // some info about sequence
            axiosMock.onGet(sequenceUrl).reply(200, sequenceMetadata);
            yield executeThunk(thunks.fetchSequence(sequenceMetadata.item_id), store.dispatch);
        }));
        describe('Test checkBlockCompletion', () => {
            const getCourseOutlineURL = `${getConfig().LMS_BASE_URL}/api/course_home/v1/navigation/${courseId}`;
            const getCompletionURL = `${getConfig().LMS_BASE_URL}/courses/${courseId}/xblock/${sequenceId}/handler/get_completion`;
            it('Should fail to check completion and log error', () => __awaiter(void 0, void 0, void 0, function* () {
                axiosMock.onPost(getCompletionURL).networkError();
                axiosMock.onGet(getCourseOutlineURL).networkError();
                yield executeThunk(thunks.checkBlockCompletion(courseId, sequenceId, unitId), store.dispatch, store.getState);
                yield executeThunk(thunks.getCourseOutlineStructure(courseId, sequenceId, unitId), store.dispatch, store.getState);
                expect(loggingService.logError).toHaveBeenCalled();
                expect(axiosMock.history.post[0].url).toEqual(getCompletionURL);
            }));
            it('Should update complete field of unit model and course outline', () => __awaiter(void 0, void 0, void 0, function* () {
                axiosMock.onPost(getCompletionURL).reply(201, { complete: true });
                axiosMock.onGet(getCourseOutlineURL).reply(201, Object.assign(Object.assign(Object.assign({}, courseBlocks), sequenceBlocks), unitBlocks));
                yield executeThunk(thunks.getCourseOutlineStructure(courseId), store.dispatch, store.getState);
                const [unit] = Object.values(store.getState().courseware.courseOutline.units);
                const [sequence] = Object.values(store.getState().courseware.courseOutline.sequences);
                const [section] = Object.values(store.getState().courseware.courseOutline.sections);
                expect(unit.complete).not.toBeTruthy();
                expect(sequence.complete).not.toBeTruthy();
                expect(section.complete).not.toBeTruthy();
                yield executeThunk(thunks.checkBlockCompletion(courseId, sequenceId, unit.id), store.dispatch, store.getState);
                expect(store.getState().models.units[unit.id].complete).toBeTruthy();
                expect(store.getState().courseware.courseOutline.units[unit.id].complete).toBeTruthy();
                expect(store.getState().courseware.courseOutline.sequences[sequence.id].complete).toBeTruthy();
                expect(store.getState().courseware.courseOutline.sections[section.id].complete).toBeTruthy();
            }));
            it('Shouldn\'t update complete field if complete is false', () => __awaiter(void 0, void 0, void 0, function* () {
                axiosMock.onPost(getCompletionURL).reply(201, { complete: false });
                axiosMock.onGet(getCourseOutlineURL).reply(201, Object.assign(Object.assign(Object.assign({}, courseBlocks), sequenceBlocks), unitBlocks));
                yield executeThunk(thunks.getCourseOutlineStructure(courseId), store.dispatch, store.getState);
                const [unit] = Object.values(store.getState().courseware.courseOutline.units);
                const [sequence] = Object.values(store.getState().courseware.courseOutline.sequences);
                const [section] = Object.values(store.getState().courseware.courseOutline.sections);
                yield executeThunk(thunks.checkBlockCompletion(courseId, sequenceId, unit.id), store.dispatch, store.getState);
                expect(store.getState().models.units[unit.id].complete).not.toBeTruthy();
                expect(store.getState().courseware.courseOutline.units[unit.id].complete).not.toBeTruthy();
                expect(store.getState().courseware.courseOutline.sequences[sequence.id].complete).not.toBeTruthy();
                expect(store.getState().courseware.courseOutline.sections[section.id].complete).not.toBeTruthy();
            }));
        });
        describe('Test saveSequencePosition', () => {
            const gotoPositionURL = `${getConfig().LMS_BASE_URL}/courses/${courseId}/xblock/${sequenceId}/handler/goto_position`;
            it('Should change and revert sequence model activeUnitIndex in case of error', () => __awaiter(void 0, void 0, void 0, function* () {
                axiosMock.onPost(gotoPositionURL).networkError();
                const oldPosition = store.getState().models.sequences[sequenceId].activeUnitIndex;
                const newPosition = 123;
                yield executeThunk(thunks.saveSequencePosition(courseId, sequenceId, newPosition), store.dispatch, store.getState);
                expect(loggingService.logError).toHaveBeenCalled();
                expect(axiosMock.history.post[0].url).toEqual(gotoPositionURL);
                expect(store.getState().models.sequences[sequenceId].activeUnitIndex).toEqual(oldPosition);
            }));
            it('Should update sequence model activeUnitIndex', () => __awaiter(void 0, void 0, void 0, function* () {
                axiosMock.onPost(gotoPositionURL).reply(201, {});
                const newPosition = 123;
                yield executeThunk(thunks.saveSequencePosition(courseId, sequenceId, newPosition), store.dispatch, store.getState);
                expect(axiosMock.history.post[0].url).toEqual(gotoPositionURL);
                expect(store.getState().models.sequences[sequenceId].activeUnitIndex).toEqual(newPosition);
            }));
        });
    });
    describe('test saveIntegritySignature', () => {
        it('Should update userNeedsIntegritySignature upon success', () => __awaiter(void 0, void 0, void 0, function* () {
            const courseMetadataNeedSignature = Factory.build('courseMetadata', {
                user_needs_integrity_signature: true,
            });
            let courseUrlNeedSignature = `${courseBaseUrl}/${courseMetadataNeedSignature.id}`;
            courseUrlNeedSignature = appendBrowserTimezoneToUrl(courseUrlNeedSignature);
            axiosMock.onGet(courseUrlNeedSignature).reply(200, courseMetadataNeedSignature);
            yield executeThunk(thunks.fetchCourse(courseMetadataNeedSignature.id), store.dispatch);
            expect(store.getState().models.coursewareMeta[courseMetadataNeedSignature.id].userNeedsIntegritySignature).toEqual(true);
            const integritySignatureUrl = `${getConfig().LMS_BASE_URL}/api/agreements/v1/integrity_signature/${courseMetadataNeedSignature.id}`;
            axiosMock.onPost(integritySignatureUrl).reply(200, {});
            yield executeThunk(thunks.saveIntegritySignature(courseMetadataNeedSignature.id), store.dispatch, store.getState);
            expect(store.getState().models.coursewareMeta[courseMetadataNeedSignature.id].userNeedsIntegritySignature).toEqual(false);
        }));
    });
});
//# sourceMappingURL=redux.test.js.map