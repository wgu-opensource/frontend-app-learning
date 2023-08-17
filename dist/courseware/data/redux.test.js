"use strict";

var _rosie = require("rosie");

var _axiosMockAdapter = _interopRequireDefault(require("axios-mock-adapter"));

var _auth = require("@edx/frontend-platform/auth");

var _frontendPlatform = require("@edx/frontend-platform");

var thunks = _interopRequireWildcard(require("./thunks"));

var _utils = require("../../utils");

var _courseBlocks = require("../../shared/data/__factories__/courseBlocks.factory");

var _learningSequencesOutline = require("./__factories__/learningSequencesOutline.factory");

var _setupTest = require("../../setupTest");

var _store = _interopRequireDefault(require("../../store"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  loggingService
} = (0, _setupTest.initializeMockApp)();
const axiosMock = new _axiosMockAdapter.default((0, _auth.getAuthenticatedHttpClient)());
describe('Data layer integration tests', () => {
  const courseBaseUrl = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/courseware/course`;
  const learningSequencesUrlRegExp = new RegExp(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/learning_sequences/v1/course_outline/*`);
  const sequenceBaseUrl = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/courseware/sequence`; // building minimum set of api responses to test all thunks

  const courseMetadata = _rosie.Factory.build('courseMetadata');

  const courseId = courseMetadata.id;

  const courseHomeMetadata = _rosie.Factory.build('courseHomeMetadata');

  const {
    courseBlocks,
    unitBlocks,
    sequenceBlocks
  } = (0, _courseBlocks.buildSimpleCourseBlocks)(courseId);

  const sequenceMetadata = _rosie.Factory.build('sequenceMetadata', {}, {
    courseId,
    unitBlocks,
    sequenceBlock: sequenceBlocks[0]
  });

  const simpleOutline = (0, _learningSequencesOutline.buildOutlineFromBlocks)(courseBlocks);
  let courseUrl = `${courseBaseUrl}/${courseId}`;
  courseUrl = (0, _utils.appendBrowserTimezoneToUrl)(courseUrl);
  const courseHomeMetadataUrl = (0, _utils.appendBrowserTimezoneToUrl)(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/course_home/course_metadata/${courseId}`);
  const sequenceUrl = `${sequenceBaseUrl}/${sequenceMetadata.item_id}`;
  const sequenceId = sequenceBlocks[0].id;
  const unitId = unitBlocks[0].id;
  let store;
  beforeEach(() => {
    axiosMock.reset();
    loggingService.logError.mockReset();
    store = (0, _store.default)();
  });
  describe('Test fetchCourse', () => {
    it('Should fail to fetch course and blocks if request error happens', async () => {
      axiosMock.onGet(courseUrl).networkError();
      axiosMock.onGet(learningSequencesUrlRegExp).networkError();
      await (0, _utils.executeThunk)(thunks.fetchCourse(courseId), store.dispatch);
      expect(loggingService.logError).toHaveBeenCalled();
      expect(store.getState().courseware).toEqual(expect.objectContaining({
        courseId,
        courseStatus: 'failed'
      }));
    });
    it('Should fetch, normalize, and save metadata, but with denied status', async () => {
      const forbiddenCourseMetadata = _rosie.Factory.build('courseMetadata');

      const forbiddenCourseHomeMetadata = _rosie.Factory.build('courseHomeMetadata', {
        course_access: {
          has_access: false
        }
      });

      const forbiddenCourseHomeUrl = (0, _utils.appendBrowserTimezoneToUrl)(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/course_home/course_metadata/${courseId}`);

      const forbiddenCourseBlocks = _rosie.Factory.build('courseBlocks', {
        courseId: forbiddenCourseMetadata.id
      });

      let forbiddenCourseUrl = `${courseBaseUrl}/${forbiddenCourseMetadata.id}`;
      forbiddenCourseUrl = (0, _utils.appendBrowserTimezoneToUrl)(forbiddenCourseUrl);
      axiosMock.onGet(forbiddenCourseHomeUrl).reply(200, forbiddenCourseHomeMetadata);
      axiosMock.onGet(forbiddenCourseUrl).reply(200, forbiddenCourseMetadata);
      axiosMock.onGet(learningSequencesUrlRegExp).reply(200, (0, _learningSequencesOutline.buildOutlineFromBlocks)(forbiddenCourseBlocks));
      await (0, _utils.executeThunk)(thunks.fetchCourse(forbiddenCourseMetadata.id), store.dispatch);
      const state = store.getState();
      expect(state.courseware.courseStatus).toEqual('denied'); // check that at least one key camel cased, thus course data normalized

      expect(state.models.courseHomeMeta[forbiddenCourseMetadata.id].courseAccess).not.toBeUndefined();
    });
    it('Should fetch, normalize, and save metadata', async () => {
      axiosMock.onGet(courseHomeMetadataUrl).reply(200, courseHomeMetadata);
      axiosMock.onGet(courseUrl).reply(200, courseMetadata);
      axiosMock.onGet(learningSequencesUrlRegExp).reply(200, (0, _learningSequencesOutline.buildOutlineFromBlocks)(courseBlocks));
      await (0, _utils.executeThunk)(thunks.fetchCourse(courseId), store.dispatch);
      const state = store.getState();
      expect(state.courseware.courseStatus).toEqual('loaded');
      expect(state.courseware.courseId).toEqual(courseId);
      expect(state.courseware.sequenceStatus).toEqual('loading');
      expect(state.courseware.sequenceId).toEqual(null); // check that at least one key camel cased, thus course data normalized

      expect(state.models.coursewareMeta[courseId].marketingUrl).not.toBeUndefined();
    });
    it('Should fetch, normalize, and save metadata; filtering has no effect', async () => {
      // Very similar to previous test, but pass back an outline for filtering
      // (even though it won't actually filter down in this case).
      axiosMock.onGet(courseHomeMetadataUrl).reply(200, courseHomeMetadata);
      axiosMock.onGet(courseUrl).reply(200, courseMetadata);
      axiosMock.onGet(learningSequencesUrlRegExp).reply(200, simpleOutline);
      await (0, _utils.executeThunk)(thunks.fetchCourse(courseId), store.dispatch);
      const state = store.getState();
      expect(state.courseware.courseStatus).toEqual('loaded');
      expect(state.courseware.courseId).toEqual(courseId);
      expect(state.courseware.sequenceStatus).toEqual('loading');
      expect(state.courseware.sequenceId).toEqual(null); // check that at least one key camel cased, thus course data normalized

      expect(state.models.coursewareMeta[courseId].marketingUrl).not.toBeUndefined();
      expect(state.models.sequences.length === 1);
      Object.values(state.models.sections).forEach(section => expect(section.sequenceIds.length === 1));
    });
    it('Should fetch, normalize, and save metadata; filtering removes sequence', async () => {
      // Very similar to previous test, but pass back an outline for filtering
      // (even though it won't actually filter down in this case).
      axiosMock.onGet(courseHomeMetadataUrl).reply(200, courseHomeMetadata);
      axiosMock.onGet(courseUrl).reply(200, courseMetadata); // Create an outline with basic matching metadata, but then empty it out...

      const emptyOutline = (0, _learningSequencesOutline.buildOutlineFromBlocks)(courseBlocks);
      emptyOutline.sequences = {};
      emptyOutline.sections = [];
      axiosMock.onGet(learningSequencesUrlRegExp).reply(200, emptyOutline);
      await (0, _utils.executeThunk)(thunks.fetchCourse(courseId), store.dispatch);
      const state = store.getState();
      expect(state.courseware.courseStatus).toEqual('loaded');
      expect(state.courseware.courseId).toEqual(courseId);
      expect(state.courseware.sequenceStatus).toEqual('loading');
      expect(state.courseware.sequenceId).toEqual(null); // check that at least one key camel cased, thus course data normalized

      expect(state.models.coursewareMeta[courseId].marketingUrl).not.toBeUndefined();
      expect(state.models.sequences === null);
      Object.values(state.models.sections).forEach(section => expect(section.sequenceIds.length === 0));
    });
  });
  describe('Test fetchSequence', () => {
    it('Should result in fetch failure if error occurs', async () => {
      axiosMock.onGet(sequenceUrl).networkError();
      await (0, _utils.executeThunk)(thunks.fetchSequence(sequenceId), store.dispatch);
      expect(loggingService.logError).toHaveBeenCalled();
      expect(store.getState().courseware.sequenceStatus).toEqual('failed');
    });
    it('Should result in fetch failure if a non-sequential block is returned', async () => {
      const sectionMetadata = _objectSpread(_objectSpread({}, sequenceMetadata), {}, {
        // 'chapter' is the block_type of a Section, which the sequence metadata
        // API will happily return if requested, since SectionBlock is implemented
        // as a subclass of SequenceBlock.
        tag: 'chapter'
      });

      axiosMock.onGet(sequenceUrl).reply(200, sectionMetadata);
      await (0, _utils.executeThunk)(thunks.fetchSequence(sequenceId), store.dispatch);
      expect(loggingService.logError).toHaveBeenCalled();
      expect(store.getState().courseware.sequenceStatus).toEqual('failed');
    });
    it('Should fetch and normalize metadata, and then update existing models with sequence metadata', async () => {
      axiosMock.onGet(courseHomeMetadataUrl).reply(200, courseHomeMetadata);
      axiosMock.onGet(courseUrl).reply(200, courseMetadata);
      axiosMock.onGet(learningSequencesUrlRegExp).reply(200, (0, _learningSequencesOutline.buildOutlineFromBlocks)(courseBlocks));
      axiosMock.onGet(sequenceUrl).reply(200, sequenceMetadata); // setting course with blocks before sequence to check that blocks receive
      // additional information after fetchSequence call.

      await (0, _utils.executeThunk)(thunks.fetchCourse(courseId), store.dispatch); // ensure that initial state has no additional sequence info

      let state = store.getState();
      expect(state.models.sequences).toEqual({
        [sequenceId]: expect.not.objectContaining({
          gatedContent: expect.any(Object),
          activeUnitIndex: expect.any(Number)
        })
      }); // Update our state variable again.

      state = store.getState();
      expect(state.courseware.courseStatus).toEqual('loaded');
      expect(state.courseware.courseId).toEqual(courseId);
      expect(state.courseware.sequenceStatus).toEqual('loading');
      expect(state.courseware.sequenceId).toEqual(null);
      await (0, _utils.executeThunk)(thunks.fetchSequence(sequenceId), store.dispatch); // Update our state variable again.

      state = store.getState(); // ensure that additional information appeared in store

      expect(state.models.sequences).toEqual({
        [sequenceId]: expect.objectContaining({
          gatedContent: expect.any(Object),
          activeUnitIndex: expect.any(Number)
        })
      });
      expect(state.models.units).toEqual({
        [unitId]: expect.objectContaining({
          complete: null,
          bookmarked: expect.any(Boolean)
        })
      });
      expect(state.courseware.courseStatus).toEqual('loaded');
      expect(state.courseware.courseId).toEqual(courseId);
      expect(state.courseware.sequenceStatus).toEqual('loaded');
      expect(state.courseware.sequenceId).toEqual(sequenceId);
    });
  });
  describe('Thunks that require fetched sequences', () => {
    beforeEach(async () => {
      // thunks tested in this block rely on fact, that store already has
      // some info about sequence
      axiosMock.onGet(sequenceUrl).reply(200, sequenceMetadata);
      await (0, _utils.executeThunk)(thunks.fetchSequence(sequenceMetadata.item_id), store.dispatch);
    });
    describe('Test checkBlockCompletion', () => {
      const getCompletionURL = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/courses/${courseId}/xblock/${sequenceId}/handler/get_completion`;
      it('Should fail to check completion and log error', async () => {
        axiosMock.onPost(getCompletionURL).networkError();
        await (0, _utils.executeThunk)(thunks.checkBlockCompletion(courseId, sequenceId, unitId), store.dispatch, store.getState);
        expect(loggingService.logError).toHaveBeenCalled();
        expect(axiosMock.history.post[0].url).toEqual(getCompletionURL);
      });
      it('Should update complete field of unit model', async () => {
        axiosMock.onPost(getCompletionURL).reply(201, {
          complete: true
        });
        await (0, _utils.executeThunk)(thunks.checkBlockCompletion(courseId, sequenceId, unitId), store.dispatch, store.getState);
        expect(store.getState().models.units[unitId].complete).toBeTruthy();
      });
    });
    describe('Test saveSequencePosition', () => {
      const gotoPositionURL = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/courses/${courseId}/xblock/${sequenceId}/handler/goto_position`;
      it('Should change and revert sequence model activeUnitIndex in case of error', async () => {
        axiosMock.onPost(gotoPositionURL).networkError();
        const oldPosition = store.getState().models.sequences[sequenceId].activeUnitIndex;
        const newPosition = 123;
        await (0, _utils.executeThunk)(thunks.saveSequencePosition(courseId, sequenceId, newPosition), store.dispatch, store.getState);
        expect(loggingService.logError).toHaveBeenCalled();
        expect(axiosMock.history.post[0].url).toEqual(gotoPositionURL);
        expect(store.getState().models.sequences[sequenceId].activeUnitIndex).toEqual(oldPosition);
      });
      it('Should update sequence model activeUnitIndex', async () => {
        axiosMock.onPost(gotoPositionURL).reply(201, {});
        const newPosition = 123;
        await (0, _utils.executeThunk)(thunks.saveSequencePosition(courseId, sequenceId, newPosition), store.dispatch, store.getState);
        expect(axiosMock.history.post[0].url).toEqual(gotoPositionURL);
        expect(store.getState().models.sequences[sequenceId].activeUnitIndex).toEqual(newPosition);
      });
    });
  });
  describe('test saveIntegritySignature', () => {
    it('Should update userNeedsIntegritySignature upon success', async () => {
      const courseMetadataNeedSignature = _rosie.Factory.build('courseMetadata', {
        user_needs_integrity_signature: true
      });

      let courseUrlNeedSignature = `${courseBaseUrl}/${courseMetadataNeedSignature.id}`;
      courseUrlNeedSignature = (0, _utils.appendBrowserTimezoneToUrl)(courseUrlNeedSignature);
      axiosMock.onGet(courseUrlNeedSignature).reply(200, courseMetadataNeedSignature);
      await (0, _utils.executeThunk)(thunks.fetchCourse(courseMetadataNeedSignature.id), store.dispatch);
      expect(store.getState().models.coursewareMeta[courseMetadataNeedSignature.id].userNeedsIntegritySignature).toEqual(true);
      const integritySignatureUrl = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/agreements/v1/integrity_signature/${courseMetadataNeedSignature.id}`;
      axiosMock.onPost(integritySignatureUrl).reply(200, {});
      await (0, _utils.executeThunk)(thunks.saveIntegritySignature(courseMetadataNeedSignature.id), store.dispatch, store.getState);
      expect(store.getState().models.coursewareMeta[courseMetadataNeedSignature.id].userNeedsIntegritySignature).toEqual(false);
    });
  });
});
//# sourceMappingURL=redux.test.js.map