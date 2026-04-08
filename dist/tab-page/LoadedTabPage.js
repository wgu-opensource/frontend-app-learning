"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactHelmet = require("react-helmet");
var _frontendPlatform = require("@edx/frontend-platform");
var _paragon = require("@openedx/paragon");
var _courseTabs = require("../course-tabs");
var _modelStore = require("../generic/model-store");
var _userMessages = require("../generic/user-messages");
var _streakCelebration = _interopRequireDefault(require("../shared/streak-celebration"));
var _instructorToolbar = _interopRequireDefault(require("../instructor-toolbar"));
var _enrollmentAlert = _interopRequireDefault(require("../alerts/enrollment-alert"));
var _logistrationAlert = _interopRequireDefault(require("../alerts/logistration-alert"));
var _ProductTours = _interopRequireDefault(require("../product-tours/ProductTours"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const LoadedTabPage = ({
  activeTabSlug,
  children,
  courseId,
  metadataModel,
  unitId
}) => {
  const {
    celebrations,
    org,
    originalUserIsStaff,
    tabs,
    title,
    verifiedMode,
    hasCourseAuthorAccess
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);

  // Logistration and enrollment alerts are only really used for the outline tab, but loaded here to put them above
  // breadcrumbs when they are visible.
  const logistrationAlert = (0, _logistrationAlert.default)(courseId);
  const enrollmentAlert = (0, _enrollmentAlert.default)(courseId);
  const activeTab = tabs.filter(tab => tab.slug === activeTabSlug)[0];
  const streakLengthToCelebrate = celebrations && celebrations.streakLengthToCelebrate;
  const streakDiscountCouponEnabled = celebrations && celebrations.streakDiscountEnabled && verifiedMode;
  const [isStreakCelebrationOpen,, closeStreakCelebration] = (0, _paragon.useToggle)(streakLengthToCelebrate);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ProductTours.default, {
      activeTab: activeTabSlug,
      courseId: courseId,
      isStreakCelebrationOpen: isStreakCelebrationOpen,
      org: org
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactHelmet.Helmet, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("title", {
        children: `${activeTab ? `${activeTab.title} | ` : ''}${title} | ${(0, _frontendPlatform.getConfig)().SITE_NAME}`
      })
    }), originalUserIsStaff && /*#__PURE__*/(0, _jsxRuntime.jsx)(_instructorToolbar.default, {
      courseId: courseId,
      unitId: unitId,
      tab: activeTabSlug,
      isStudioButtonVisible: hasCourseAuthorAccess
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_streakCelebration.default, {
      courseId: courseId,
      metadataModel: metadataModel,
      streakLengthToCelebrate: streakLengthToCelebrate,
      isStreakCelebrationOpen: !!isStreakCelebrationOpen,
      closeStreakCelebration: closeStreakCelebration,
      streakDiscountCouponEnabled: streakDiscountCouponEnabled,
      verifiedMode: verifiedMode
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
      className: "d-flex flex-column flex-grow-1",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_userMessages.AlertList, {
        topic: "outline",
        className: "mx-5 mt-3",
        customAlerts: _objectSpread(_objectSpread({}, enrollmentAlert), logistrationAlert)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_courseTabs.CourseTabsNavigation, {
        tabs: tabs,
        className: "mb-3",
        activeTabSlug: activeTabSlug
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        id: "main-content",
        className: "container-xl",
        children: children
      })]
    })]
  });
};
LoadedTabPage.propTypes = {
  activeTabSlug: _propTypes.default.string.isRequired,
  children: _propTypes.default.node,
  courseId: _propTypes.default.string.isRequired,
  metadataModel: _propTypes.default.string,
  unitId: _propTypes.default.string
};
LoadedTabPage.defaultProps = {
  children: null,
  metadataModel: 'courseHomeMeta',
  unitId: null
};
var _default = exports.default = LoadedTabPage;
//# sourceMappingURL=LoadedTabPage.js.map