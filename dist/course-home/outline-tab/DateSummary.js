"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DateSummary;

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function DateSummary(_ref) {
  let {
    dateBlock,
    userTimezone,

    /** [MM-P2P] Experiment */
    mmp2p
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
  /** [MM-P2P] Experiment */

  const showMMP2P = mmp2p.state.isEnabled && dateBlock.dateType === 'verified-upgrade-deadline';

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
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedDate
        /** [MM-P2P] Experiment */
        , _objectSpread({
          value: showMMP2P ? mmp2p.state.upgradeDeadline : dateBlock.date,
          day: "numeric",
          month: "short",
          weekday: "short",
          year: "numeric"
        }, timezoneFormatArgs))
      })]
    }), showMMP2P ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "row ml-4 pr-2",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "date-summary-text",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "font-weight-bold mt-2",
          children: "Last chance to upgrade"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "date-summary-text mt-1",
        children: "You are still eligible to upgrade to a Verified Certificate! \xA0 Unlock full course access and highlight the knowledge you'll gain."
      })]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
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
}

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
  userTimezone: _propTypes.default.string,

  /** [MM-P2P] Experiment */
  mmp2p: _propTypes.default.shape({
    state: _propTypes.default.shape({
      isEnabled: _propTypes.default.bool.isRequired,
      upgradeDeadline: _propTypes.default.string
    })
  })
};
DateSummary.defaultProps = {
  userTimezone: null,

  /** [MM-P2P] Experiment */
  mmp2p: {
    state: {
      isEnabled: false,
      upgradeDeadline: ''
    }
  }
};
//# sourceMappingURL=DateSummary.js.map