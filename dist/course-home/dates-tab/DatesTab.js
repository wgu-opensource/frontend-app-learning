"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _analytics = require("@edx/frontend-platform/analytics");
var _i18n = require("@edx/frontend-platform/i18n");
var _messages = _interopRequireDefault(require("./messages"));
var _Timeline = _interopRequireDefault(require("./timeline/Timeline"));
var _data = require("../data");
var _modelStore = require("../../generic/model-store");
var _SuggestedScheduleHeader = _interopRequireDefault(require("../suggested-schedule-messaging/SuggestedScheduleHeader"));
var _ShiftDatesAlert = _interopRequireDefault(require("../suggested-schedule-messaging/ShiftDatesAlert"));
var _UpgradeToCompleteAlert = _interopRequireDefault(require("../suggested-schedule-messaging/UpgradeToCompleteAlert"));
var _UpgradeToShiftDatesAlert = _interopRequireDefault(require("../suggested-schedule-messaging/UpgradeToShiftDatesAlert"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DatesTab = _ref => {
  let {
    intl
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    isSelfPaced,
    org
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    courseDateBlocks
  } = (0, _modelStore.useModel)('dates', courseId);
  const hasDeadlines = courseDateBlocks && courseDateBlocks.some(x => x.dateType === 'assignment-due-date');
  const logUpgradeLinkClick = () => {
    (0, _analytics.sendTrackEvent)('edx.bi.ecommerce.upsell_links_clicked', {
      org_key: org,
      courserun_key: courseId,
      linkCategory: 'personalized_learner_schedules',
      linkName: 'dates_upgrade',
      linkType: 'button',
      pageName: 'dates_tab'
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      role: "heading",
      "aria-level": "1",
      className: "h2 my-3",
      children: intl.formatMessage(_messages.default.title)
    }), isSelfPaced && hasDeadlines && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ShiftDatesAlert.default, {
        model: "dates",
        fetch: _data.fetchDatesTab
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SuggestedScheduleHeader.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_UpgradeToCompleteAlert.default, {
        logUpgradeLinkClick: logUpgradeLinkClick
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_UpgradeToShiftDatesAlert.default, {
        logUpgradeLinkClick: logUpgradeLinkClick,
        model: "dates"
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Timeline.default, {})]
  });
};
DatesTab.propTypes = {
  intl: _i18n.intlShape.isRequired
};
var _default = (0, _i18n.injectIntl)(DatesTab);
exports.default = _default;
//# sourceMappingURL=DatesTab.js.map