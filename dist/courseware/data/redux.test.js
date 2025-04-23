"use strict";

var _rosie = require("rosie");
var _axiosMockAdapter = _interopRequireDefault(require("axios-mock-adapter"));
var _auth = require("@edx/frontend-platform/auth");
var _frontendPlatform = require("@edx/frontend-platform");
var thunks = _interopRequireWildcard(require("./thunks"));
var _slice = require("./slice");
var _utils = require("../../utils");
var _courseBlocks = require("../../shared/data/__factories__/courseBlocks.factory");
var _learningSequencesOutline = require("./__factories__/learningSequencesOutline.factory");
var _setupTest = require("../../setupTest");
var _store = _interopRequireDefault(require("../../store"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  loggingService
} = (0, _setupTest.initializeMockApp)();
const axiosMock = new _axiosMockAdapter.default((0, _auth.getAuthenticatedHttpClient)());
describe('Data layer integration tests', () => {
  const courseBaseUrl = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/courseware/course`;
  const learningSequencesUrlRegExp = new RegExp(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/learning_sequences/v1/course_outline/*`);
  const sequenceBaseUrl = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/courseware/sequence`;

  // building minimum set of api responses to test all thunks
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
  const coursewareSidebarSettingsUrl = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/courses/${courseId}/courseware-navigation-sidebar/toggles/`;
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
      axiosMock.onGet(coursewareSidebarSettingsUrl).networkError();
      await (0, _utils.executeThunk)(thunks.fetchCourse(courseId), store.dispatch);
      expect(loggingService.logError).toHaveBeenCalled();
      expect(store.getState().courseware).toEqual(expect.objectContaining({
        courseId,
        courseOutline: {},
        courseStatus: _slice.FAILED,
        coursewareOutlineSidebarSettings: {},
        courseOutlineStatus: _slice.LOADING,
        sequenceId: null,
        sequenceMightBeUnit: false,
        sequenceStatus: _slice.LOADING
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
      expect(state.courseware.courseStatus).toEqual('denied');

      // check that at least one key camel cased, thus course data normalized
      expect(state.models.courseHomeMeta[forbiddenCourseMetadata.id].courseAccess).not.toBeUndefined();
    });
    it('Should fetch, normalize, and save metadata', async () => {
      axiosMock.onGet(courseHomeMetadataUrl).reply(200, courseHomeMetadata);
      axiosMock.onGet(courseUrl).reply(200, courseMetadata);
      axiosMock.onGet(learningSequencesUrlRegExp).reply(200, (0, _learningSequencesOutline.buildOutlineFromBlocks)(courseBlocks));
      axiosMock.onGet(coursewareSidebarSettingsUrl).reply(200, {
        enable_navigation_sidebar: true,
        always_open_auxiliary_sidebar: true
      });
      await (0, _utils.executeThunk)(thunks.fetchCourse(courseId), store.dispatch);
      const state = store.getState();
      expect(state.courseware.courseStatus).toEqual('loaded');
      expect(state.courseware.courseId).toEqual(courseId);
      expect(state.courseware.sequenceStatus).toEqual('loading');
      expect(state.courseware.sequenceId).toEqual(null);
      expect(state.courseware.coursewareOutlineSidebarSettings).toEqual({
        enableNavigationSidebar: true,
        alwaysOpenAuxiliarySidebar: true
      });

      // check that at least one key camel cased, thus course data normalized
      expect(state.models.coursewareMeta[courseId].marketingUrl).not.toBeUndefined();
    });
    it('Should fetch, normalize, and save metadata; filtering has no effect', async () => {
      // Very similar to previous test, but pass back an outline for filtering
      // (even though it won't actually filter down in this case).
      axiosMock.onGet(courseHomeMetadataUrl).reply(200, courseHomeMetadata);
      axiosMock.onGet(courseUrl).reply(200, courseMetadata);
      axiosMock.onGet(learningSequencesUrlRegExp).reply(200, simpleOutline);
      axiosMock.onGet(coursewareSidebarSettingsUrl).reply(200, {
        enable_navigation_sidebar: false,
        always_open_auxiliary_sidebar: false
      });
      await (0, _utils.executeThunk)(thunks.fetchCourse(courseId), store.dispatch);
      const state = store.getState();
      expect(state.courseware.courseStatus).toEqual('loaded');
      expect(state.courseware.courseId).toEqual(courseId);
      expect(state.courseware.sequenceStatus).toEqual('loading');
      expect(state.courseware.sequenceId).toEqual(null);
      expect(state.courseware.coursewareOutlineSidebarSettings).toEqual({
        enableNavigationSidebar: false,
        alwaysOpenAuxiliarySidebar: false
      });

      // check that at least one key camel cased, thus course data normalized
      expect(state.models.coursewareMeta[courseId].marketingUrl).not.toBeUndefined();
      expect(state.models.sequences.length === 1);
      Object.values(state.models.sections).forEach(section => expect(section.sequenceIds.length === 1));
    });
    it('Should fetch, normalize, and save metadata; filtering removes sequence', async () => {
      // Very similar to previous test, but pass back an outline for filtering
      // (even though it won't actually filter down in this case).
      axiosMock.onGet(courseHomeMetadataUrl).reply(200, courseHomeMetadata);
      axiosMock.onGet(courseUrl).reply(200, courseMetadata);

      // Create an outline with basic matching metadata, but then empty it out...
      const emptyOutline = (0, _learningSequencesOutline.buildOutlineFromBlocks)(courseBlocks);
      emptyOutline.sequences = {};
      emptyOutline.sections = [];
      axiosMock.onGet(learningSequencesUrlRegExp).reply(200, emptyOutline);
      await (0, _utils.executeThunk)(thunks.fetchCourse(courseId), store.dispatch);
      const state = store.getState();
      expect(state.courseware.courseStatus).toEqual('loaded');
      expect(state.courseware.courseId).toEqual(courseId);
      expect(state.courseware.sequenceStatus).toEqual('loading');
      expect(state.courseware.sequenceId).toEqual(null);

      // check that at least one key camel cased, thus course data normalized
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
      axiosMock.onGet(sequenceUrl).reply(200, sequenceMetadata);

      // setting course with blocks before sequence to check that blocks receive
      // additional information after fetchSequence call.
      await (0, _utils.executeThunk)(thunks.fetchCourse(courseId), store.dispatch);

      // ensure that initial state has no additional sequence info
      let state = store.getState();
      expect(state.models.sequences).toEqual({
        [sequenceId]: expect.not.objectContaining({
          gatedContent: expect.any(Object),
          activeUnitIndex: expect.any(Number)
        })
      });

      // Update our state variable again.
      state = store.getState();
      expect(state.courseware.courseStatus).toEqual('loaded');
      expect(state.courseware.courseId).toEqual(courseId);
      expect(state.courseware.sequenceStatus).toEqual('loading');
      expect(state.courseware.sequenceId).toEqual(null);
      await (0, _utils.executeThunk)(thunks.fetchSequence(sequenceId), store.dispatch);

      // Update our state variable again.
      state = store.getState();

      // ensure that additional information appeared in store
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
      const getCourseOutlineURL = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/course_home/v1/navigation/${courseId}`;
      const getCompletionURL = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/courses/${courseId}/xblock/${sequenceId}/handler/get_completion`;
      it('Should fail to check completion and log error', async () => {
        axiosMock.onPost(getCompletionURL).networkError();
        axiosMock.onGet(getCourseOutlineURL).networkError();
        await (0, _utils.executeThunk)(thunks.checkBlockCompletion(courseId, sequenceId, unitId), store.dispatch, store.getState);
        await (0, _utils.executeThunk)(thunks.getCourseOutlineStructure(courseId, sequenceId, unitId), store.dispatch, store.getState);
        expect(loggingService.logError).toHaveBeenCalled();
        expect(axiosMock.history.post[0].url).toEqual(getCompletionURL);
      });
      it('Should update complete field of unit model and course outline', async () => {
        axiosMock.onPost(getCompletionURL).reply(201, {
          complete: true
        });
        axiosMock.onGet(getCourseOutlineURL).reply(201, _objectSpread(_objectSpread(_objectSpread({}, courseBlocks), sequenceBlocks), unitBlocks));
        await (0, _utils.executeThunk)(thunks.getCourseOutlineStructure(courseId), store.dispatch, store.getState);
        const [unit] = Object.values(store.getState().courseware.courseOutline.units);
        const [sequence] = Object.values(store.getState().courseware.courseOutline.sequences);
        const [section] = Object.values(store.getState().courseware.courseOutline.sections);
        expect(unit.complete).not.toBeTruthy();
        expect(sequence.complete).not.toBeTruthy();
        expect(section.complete).not.toBeTruthy();
        await (0, _utils.executeThunk)(thunks.checkBlockCompletion(courseId, sequenceId, unit.id), store.dispatch, store.getState);
        expect(store.getState().models.units[unit.id].complete).toBeTruthy();
        expect(store.getState().courseware.courseOutline.units[unit.id].complete).toBeTruthy();
        expect(store.getState().courseware.courseOutline.sequences[sequence.id].complete).toBeTruthy();
        expect(store.getState().courseware.courseOutline.sections[section.id].complete).toBeTruthy();
      });
      it('Shouldn\'t update complete field if complete is false', async () => {
        axiosMock.onPost(getCompletionURL).reply(201, {
          complete: false
        });
        axiosMock.onGet(getCourseOutlineURL).reply(201, _objectSpread(_objectSpread(_objectSpread({}, courseBlocks), sequenceBlocks), unitBlocks));
        await (0, _utils.executeThunk)(thunks.getCourseOutlineStructure(courseId), store.dispatch, store.getState);
        const [unit] = Object.values(store.getState().courseware.courseOutline.units);
        const [sequence] = Object.values(store.getState().courseware.courseOutline.sequences);
        const [section] = Object.values(store.getState().courseware.courseOutline.sections);
        await (0, _utils.executeThunk)(thunks.checkBlockCompletion(courseId, sequenceId, unit.id), store.dispatch, store.getState);
        expect(store.getState().models.units[unit.id].complete).not.toBeTruthy();
        expect(store.getState().courseware.courseOutline.units[unit.id].complete).not.toBeTruthy();
        expect(store.getState().courseware.courseOutline.sequences[sequence.id].complete).not.toBeTruthy();
        expect(store.getState().courseware.courseOutline.sections[section.id].complete).not.toBeTruthy();
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