"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _faCalendarAlt = require("@fortawesome/free-regular-svg-icons/faCalendarAlt");
var _analytics = require("@edx/frontend-platform/analytics");
var _i18n = require("@edx/frontend-platform/i18n");
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _modelStore = require("../../generic/model-store");
var _utils = require("../dates-tab/utils");
require("./DateSummary.scss");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const DateSummary = _ref => {
  let {
    dateBlock,
    userTimezone
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    org
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const linkedTitle = dateBlock.link && (0, _utils.isLearnerAssignment)(dateBlock);
  const timezoneFormatArgs = userTimezone ? {
    timeZone: userTimezone
  } : {};
  const logVerifiedUpgradeClick = () => {
    (0, _analytics.sendTrackEvent)('edx.bi.ecommerce.upsell_links_clicked', {
      org_key: org,
      courserun_key: courseId,
      linkCategory: '(none)',
      linkName: 'course_home_dates',
      linkType: 'link',
      pageName: 'course_home'
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
    className: "p-0 mb-3 small text-dark-500",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "row",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
        icon: _faCalendarAlt.faCalendarAlt,
        className: "ml-3 mt-1 mr-1",
        fixedWidth: true
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ml-1 font-weight-bold",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedDate, _objectSpread({
          value: dateBlock.date,
          day: "numeric",
          month: "short",
          weekday: "short",
          year: "numeric"
        }, timezoneFormatArgs))
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "row ml-4 pr-2",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "date-summary-text",
        children: [linkedTitle && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "font-weight-bold mt-2",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
            href: dateBlock.link,
            children: dateBlock.title
          })
        }), !linkedTitle && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "font-weight-bold mt-2",
          children: dateBlock.title
        })]
      }), dateBlock.description && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "date-summary-text mt-1",
        children: dateBlock.description
      }), !linkedTitle && dateBlock.link && /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
        href: dateBlock.link,
        onClick: dateBlock.dateType === 'verified-upgrade-deadline' ? logVerifiedUpgradeClick : () => {},
        className: "description-link",
        children: dateBlock.linkText
      })]
    })]
  });
};
DateSummary.propTypes = {
  dateBlock: _propTypes.default.shape({
    date: _propTypes.default.string.isRequired,
    dateType: _propTypes.default.string,
    description: _propTypes.default.string,
    link: _propTypes.default.string,
    linkText: _propTypes.default.string,
    title: _propTypes.default.string.isRequired,
    learnerHasAccess: _propTypes.default.bool
  }).isRequired,
  userTimezone: _propTypes.default.string
};
DateSummary.defaultProps = {
  userTimezone: null
};
var _default = exports.default = DateSummary;
//# sourceMappingURL=DateSummary.js.map