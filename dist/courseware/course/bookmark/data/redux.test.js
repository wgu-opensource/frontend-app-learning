"use strict";

var _axiosMockAdapter = _interopRequireDefault(require("axios-mock-adapter"));
var _auth = require("@edx/frontend-platform/auth");
var _frontendPlatform = require("@edx/frontend-platform");
var thunks = _interopRequireWildcard(require("./thunks"));
var _utils = require("../../../../utils");
var _setupTest = require("../../../../setupTest");
var _store = _interopRequireDefault(require("../../../../store"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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