"use strict";

var _rosie = require("rosie");
var _axiosMockAdapter = _interopRequireDefault(require("axios-mock-adapter"));
var _auth = require("@edx/frontend-platform/auth");
var _frontendPlatform = require("@edx/frontend-platform");
var thunks = _interopRequireWildcard(require("./thunks"));
var _utils = require("../../utils");
var _setupTest = require("../../setupTest");
var _store = _interopRequireDefault(require("../../store"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  loggingService
} = (0, _setupTest.initializeMockApp)();
const axiosMock = new _axiosMockAdapter.default((0, _auth.getAuthenticatedHttpClient)());
describe('Data layer integration tests', () => {
  const courseHomeMetadata = _rosie.Factory.build('courseHomeMetadata');
  const {
    id: courseId
  } = courseHomeMetadata;
  let courseMetadataUrl = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/course_home/course_metadata/${courseId}`;
  courseMetadataUrl = (0, _utils.appendBrowserTimezoneToUrl)(courseMetadataUrl);
  const courseHomeAccessDeniedMetadata = _rosie.Factory.build('courseHomeMetadata', {
    id: courseId,
    course_access: {
      has_access: false,
      error_code: 'bad codes',
      additional_context_user_message: 'your Codes Are BAD'
    }
  });
  let store;
  beforeEach(() => {
    axiosMock.reset();
    loggingService.logError.mockReset();
    store = (0, _store.default)();
  });
  describe('Test fetchDatesTab', () => {
    const datesBaseUrl = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/course_home/dates`;
    it('Should fail to fetch if error occurs', async () => {
      axiosMock.onGet(courseMetadataUrl).networkError();
      axiosMock.onGet(`${datesBaseUrl}/${courseId}`).networkError();
      await (0, _utils.executeThunk)(thunks.fetchDatesTab(courseId), store.dispatch);
      expect(loggingService.logError).toHaveBeenCalled();
      expect(store.getState().courseHome.courseStatus).toEqual('failed');
    });
    it('Should fetch, normalize, and save metadata', async () => {
      const datesTabData = _rosie.Factory.build('datesTabData');
      const datesUrl = `${datesBaseUrl}/${courseId}`;
      axiosMock.onGet(courseMetadataUrl).reply(200, courseHomeMetadata);
      axiosMock.onGet(datesUrl).reply(200, datesTabData);
      await (0, _utils.executeThunk)(thunks.fetchDatesTab(courseId), store.dispatch);
      const state = store.getState();
      expect(state.courseHome.courseStatus).toEqual('loaded');
      expect(state).toMatchSnapshot({
        // The Xpert chatbot (frontend-lib-learning-assistant) generates a unique UUID
        // to keep track of conversations. This causes snapshots to fail, because this UUID
        // is generated on each run of the snapshot. Instead, we use an asymmetric matcher here.
        learningAssistant: expect.objectContaining({
          conversationId: expect.any(String)
        })
      });
    });
    it.each([401, 403, 404])('should result in fetch denied for expected errors and failed for all others', async errorStatus => {
      axiosMock.onGet(courseMetadataUrl).reply(200, courseHomeAccessDeniedMetadata);
      axiosMock.onGet(`${datesBaseUrl}/${courseId}`).reply(errorStatus, {});
      await (0, _utils.executeThunk)(thunks.fetchDatesTab(courseId), store.dispatch);
      let expectedState = 'failed';
      if (errorStatus === 401 || errorStatus === 403) {
        expectedState = 'denied';
      }
      expect(store.getState().courseHome.courseStatus).toEqual(expectedState);
    });
  });
  describe('Test fetchOutlineTab', () => {
    const outlineBaseUrl = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/course_home/outline`;
    const outlineUrl = `${outlineBaseUrl}/${courseId}`;
    it('Should result in fetch failure if error occurs', async () => {
      axiosMock.onGet(courseMetadataUrl).networkError();
      axiosMock.onGet(outlineUrl).networkError();
      await (0, _utils.executeThunk)(thunks.fetchOutlineTab(courseId), store.dispatch);
      expect(loggingService.logError).toHaveBeenCalled();
      expect(store.getState().courseHome.courseStatus).toEqual('failed');
    });
    it('Should fetch, normalize, and save metadata', async () => {
      const outlineTabData = _rosie.Factory.build('outlineTabData', {
        courseId
      });
      axiosMock.onGet(courseMetadataUrl).reply(200, courseHomeMetadata);
      axiosMock.onGet(outlineUrl).reply(200, outlineTabData);
      await (0, _utils.executeThunk)(thunks.fetchOutlineTab(courseId), store.dispatch);
      const state = store.getState();
      expect(state.courseHome.courseStatus).toEqual('loaded');
      expect(state).toMatchSnapshot({
        // The Xpert chatbot (frontend-lib-learning-assistant) generates a unique UUID
        // to keep track of conversations. This causes snapshots to fail, because this UUID
        // is generated on each run of the snapshot. Instead, we use an asymmetric matcher here.
        learningAssistant: expect.objectContaining({
          conversationId: expect.any(String)
        })
      });
    });
    it.each([401, 403, 404])('should result in fetch denied for expected errors and failed for all others', async errorStatus => {
      axiosMock.onGet(courseMetadataUrl).reply(200, courseHomeAccessDeniedMetadata);
      axiosMock.onGet(outlineUrl).reply(errorStatus, {});
      await (0, _utils.executeThunk)(thunks.fetchOutlineTab(courseId), store.dispatch);
      let expectedState = 'failed';
      if (errorStatus === 403) {
        expectedState = 'denied';
      }
      expect(store.getState().courseHome.courseStatus).toEqual(expectedState);
    });
  });
  describe('Test fetchProgressTab', () => {
    const progressBaseUrl = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/course_home/progress`;
    it('Should result in fetch failure if error occurs', async () => {
      axiosMock.onGet(courseMetadataUrl).networkError();
      axiosMock.onGet(`${progressBaseUrl}/${courseId}`).networkError();
      await (0, _utils.executeThunk)(thunks.fetchProgressTab(courseId), store.dispatch);
      expect(loggingService.logError).toHaveBeenCalled();
      expect(store.getState().courseHome.courseStatus).toEqual('failed');
    });
    it('Should fetch, normalize, and save metadata', async () => {
      const progressTabData = _rosie.Factory.build('progressTabData', {
        courseId
      });
      const progressUrl = `${progressBaseUrl}/${courseId}`;
      axiosMock.onGet(courseMetadataUrl).reply(200, courseHomeMetadata);
      axiosMock.onGet(progressUrl).reply(200, progressTabData);
      await (0, _utils.executeThunk)(thunks.fetchProgressTab(courseId), store.dispatch);
      const state = store.getState();
      expect(state.courseHome.courseStatus).toEqual('loaded');
      expect(state).toMatchSnapshot({
        // The Xpert chatbot (frontend-lib-learning-assistant) generates a unique UUID
        // to keep track of conversations. This causes snapshots to fail, because this UUID
        // is generated on each run of the snapshot. Instead, we use an asymmetric matcher here.
        learningAssistant: expect.objectContaining({
          conversationId: expect.any(String)
        })
      });
    });
    it('Should handle the url including a targetUserId', async () => {
      const progressTabData = _rosie.Factory.build('progressTabData', {
        courseId
      });
      const targetUserId = 2;
      const progressUrl = `${progressBaseUrl}/${courseId}/${targetUserId}/`;
      axiosMock.onGet(courseMetadataUrl).reply(200, courseHomeMetadata);
      axiosMock.onGet(progressUrl).reply(200, progressTabData);
      await (0, _utils.executeThunk)(thunks.fetchProgressTab(courseId, 2), store.dispatch);
      const state = store.getState();
      expect(state.courseHome.targetUserId).toEqual(2);
    });
    it.each([401, 403, 404])('should result in fetch denied for expected errors and failed for all others', async errorStatus => {
      const progressUrl = `${progressBaseUrl}/${courseId}`;
      axiosMock.onGet(courseMetadataUrl).reply(200, courseHomeAccessDeniedMetadata);
      axiosMock.onGet(progressUrl).reply(errorStatus, {});
      await (0, _utils.executeThunk)(thunks.fetchProgressTab(courseId), store.dispatch);
      expect(store.getState().courseHome.courseStatus).toEqual('denied');
    });
  });
  describe('Test saveCourseGoal', () => {
    it('Should save course goal', async () => {
      const goalUrl = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/course_home/save_course_goal`;
      axiosMock.onPost(goalUrl).reply(200, {});
      await thunks.deprecatedSaveCourseGoal(courseId, 'unsure');
      expect(axiosMock.history.post[0].url).toEqual(goalUrl);
      expect(axiosMock.history.post[0].data).toEqual(`{"course_id":"${courseId}","goal_key":"unsure"}`);
    });
  });
  describe('Test resetDeadlines', () => {
    it('Should reset course deadlines', async () => {
      const resetUrl = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/course_experience/v1/reset_course_deadlines`;
      const model = 'dates';
      axiosMock.onPost(resetUrl).reply(201, {});
      const getTabDataMock = jest.fn(() => ({
        type: 'MOCK_ACTION'
      }));
      await (0, _utils.executeThunk)(thunks.resetDeadlines(courseId, model, getTabDataMock), store.dispatch);
      expect(axiosMock.history.post[0].url).toEqual(resetUrl);
      expect(axiosMock.history.post[0].data).toEqual(`{"course_key":"${courseId}","research_event_data":{"location":"dates-tab"}}`);
      expect(getTabDataMock).toHaveBeenCalledWith(courseId);
    });
  });
  describe('Test dismissWelcomeMessage', () => {
    it('Should dismiss welcome message', async () => {
      const dismissUrl = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/course_home/dismiss_welcome_message`;
      axiosMock.onPost(dismissUrl).reply(201);
      await (0, _utils.executeThunk)(thunks.dismissWelcomeMessage(courseId), store.dispatch);
      expect(axiosMock.history.post[0].url).toEqual(dismissUrl);
      expect(axiosMock.history.post[0].data).toEqual(`{"course_id":"${courseId}"}`);
    });
  });
});
//# sourceMappingURL=redux.test.js.map