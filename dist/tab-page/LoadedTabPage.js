"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactHelmet = require("react-helmet");
var _frontendPlatform = require("@edx/frontend-platform");
var _paragon = require("@edx/paragon");
var _courseTabs = require("../course-tabs");
var _modelStore = require("../generic/model-store");
var _userMessages = require("../generic/user-messages");
var _streakCelebration = _interopRequireDefault(require("../shared/streak-celebration"));
var _instructorToolbar = _interopRequireDefault(require("../instructor-toolbar"));
var _enrollmentAlert = _interopRequireDefault(require("../alerts/enrollment-alert"));
var _logistrationAlert = _interopRequireDefault(require("../alerts/logistration-alert"));
var _ProductTours = _interopRequireDefault(require("../product-tours/ProductTours"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const LoadedTabPage = _ref => {
  let {
    activeTabSlug,
    children,
    courseId,
    metadataModel,
    unitId
  } = _ref;
  const {
    celebrations,
    org,
    originalUserIsStaff,
    tabs,
    title,
    verifiedMode
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
      tab: activeTabSlug
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_streakCelebration.default, {
      courseId: courseId,
      metadataModel: metadataModel,
      streakLengthToCelebrate: streakLengthToCelebrate,
      isStreakCelebrationOpen: !!isStreakCelebrationOpen,
      closeStreakCelebration: closeStreakCelebration,
      streakDiscountCouponEnabled: streakDiscountCouponEnabled,
      verifiedMode: verifiedMode
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
      id: "main-content",
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
var _default = LoadedTabPage;
exports.default = _default;
//# sourceMappingURL=LoadedTabPage.js.map