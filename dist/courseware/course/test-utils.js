"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _rosie = require("rosie");
var _frontendPlatform = require("@edx/frontend-platform");
var _auth = require("@edx/frontend-platform/auth");
var _axiosMockAdapter = _interopRequireDefault(require("axios-mock-adapter"));
var _paragon = require("@openedx/paragon");
var _utils = require("@src/utils");
var _setupTest = require("@src/setupTest");
var _SidebarContext = _interopRequireDefault(require("@src/courseware/course/sidebar/SidebarContext"));
var _discussionTopics = require("../data/__factories__/discussionTopics.factory");
var thunks = _interopRequireWildcard(require("../data/thunks"));
var _Course = _interopRequireDefault(require("./Course"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const mockData = {
  nextSequenceHandler: () => {},
  previousSequenceHandler: () => {},
  unitNavigationHandler: () => {}
};
const setupDiscussionSidebar = async HomeMetaParams => {
  const params = _objectSpread({
    verifiedMode: null,
    enabledInContext: true
  }, HomeMetaParams);
  const store = await (0, _setupTest.initializeTestStore)();
  const {
    courseware,
    models
  } = store.getState();
  const {
    courseId,
    sequenceId
  } = courseware;
  Object.assign(mockData, {
    courseId,
    sequenceId,
    unitId: Object.values(models.units)[0].id
  });
  global.innerWidth = _paragon.breakpoints.extraExtraLarge.minWidth;
  const courseHomeMetadata = _rosie.Factory.build('courseHomeMetadata', _objectSpread({}, (0, _frontendPlatform.snakeCaseObject)(params)));
  const testStore = await (0, _setupTest.initializeTestStore)({
    provider: 'openedx',
    courseHomeMetadata
  });
  const state = testStore.getState();
  const axiosMock = new _axiosMockAdapter.default((0, _auth.getAuthenticatedHttpClient)());
  axiosMock.onGet(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/discussion/v1/courses/${courseId}`).reply(200, {
    provider: 'openedx'
  });
  const topicsResponse = (0, _discussionTopics.buildTopicsFromUnits)(state.models.units, params.enabledInContext);
  axiosMock.onGet(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/discussion/v2/course_topics/${courseId}`).reply(200, topicsResponse);
  await (0, _utils.executeThunk)(thunks.getCourseDiscussionTopics(courseId), testStore.dispatch);
  const [firstUnitId] = Object.keys(state.models.units);
  mockData.unitId = firstUnitId;
  const [firstSequenceId] = Object.keys(state.models.sequences);
  mockData.sequenceId = firstSequenceId;
  const contextValue = {
    courseId: mockData.courseId,
    currentSidebar: null,
    toggleSidebar: jest.fn()
  };
  const wrapper = await (0, _setupTest.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_SidebarContext.default.Provider, {
    value: contextValue,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Course.default, _objectSpread({}, mockData))
  }), {
    store: testStore,
    wrapWithRouter: true
  });
  return wrapper;
};
var _default = exports.default = setupDiscussionSidebar;
//# sourceMappingURL=test-utils.js.map