"use strict";

var _axiosMockAdapter = _interopRequireDefault(require("axios-mock-adapter"));
var _auth = require("@edx/frontend-platform/auth");
var _frontendPlatform = require("@edx/frontend-platform");
var thunks = _interopRequireWildcard(require("./thunks"));
var _utils = require("../../../../utils");
var _setupTest = require("../../../../setupTest");
var _store = _interopRequireDefault(require("../../../../store"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  loggingService
} = (0, _setupTest.initializeMockApp)();
const axiosMock = new _axiosMockAdapter.default((0, _auth.getAuthenticatedHttpClient)());
describe('Data layer integration tests', () => {
  const unitId = 'unitId';
  let store;
  beforeEach(() => {
    axiosMock.reset();
    loggingService.logError.mockReset();
    store = (0, _store.default)();
  });
  describe('Test addBookmark', () => {
    const createBookmarkURL = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/bookmarks/v1/bookmarks/`;
    it('Should fail to create bookmark in case of error', async () => {
      axiosMock.onPost(createBookmarkURL).networkError();
      await (0, _utils.executeThunk)(thunks.addBookmark(unitId), store.dispatch);
      expect(loggingService.logError).toHaveBeenCalled();
      expect(axiosMock.history.post[0].url).toEqual(createBookmarkURL);
      expect(store.getState().models.units[unitId]).toEqual(expect.objectContaining({
        bookmarked: false,
        bookmarkedUpdateState: 'failed'
      }));
    });
    it('Should create bookmark and update model state', async () => {
      axiosMock.onPost(createBookmarkURL).reply(201);
      await (0, _utils.executeThunk)(thunks.addBookmark(unitId), store.dispatch);
      expect(store.getState().models.units[unitId]).toEqual(expect.objectContaining({
        bookmarked: true,
        bookmarkedUpdateState: 'loaded'
      }));
    });
  });
  describe('Test removeBookmark', () => {
    const deleteBookmarkURL = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/bookmarks/v1/bookmarks/${(0, _auth.getAuthenticatedUser)().username},${unitId}/`;
    it('Should fail to remove bookmark in case of error', async () => {
      axiosMock.onDelete(deleteBookmarkURL).networkError();
      await (0, _utils.executeThunk)(thunks.removeBookmark(unitId), store.dispatch);
      expect(loggingService.logError).toHaveBeenCalled();
      expect(axiosMock.history.delete[0].url).toEqual(deleteBookmarkURL);
      expect(store.getState().models.units[unitId]).toEqual(expect.objectContaining({
        bookmarked: true,
        bookmarkedUpdateState: 'failed'
      }));
    });
    it('Should delete bookmark and update model state', async () => {
      axiosMock.onDelete(deleteBookmarkURL).reply(201);
      await (0, _utils.executeThunk)(thunks.removeBookmark(unitId), store.dispatch);
      expect(store.getState().models.units[unitId]).toEqual(expect.objectContaining({
        bookmarked: false,
        bookmarkedUpdateState: 'loaded'
      }));
    });
  });
});
//# sourceMappingURL=redux.test.js.map