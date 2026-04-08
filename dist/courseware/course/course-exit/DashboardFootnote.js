"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _faCalendarAlt = require("@fortawesome/free-regular-svg-icons/faCalendarAlt");
var _CourseExitPluginSlots = require("../../../plugin-slots/CourseExitPluginSlots");
var _Footnote = _interopRequireDefault(require("./Footnote"));
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DashboardFootnote = ({
  variant
}) => {
  const intl = (0, _i18n.useIntl)();
  const dashboardLink = /*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseExitPluginSlots.DashboardFootnoteLinkPluginSlot, {
    variant: variant
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Footnote.default, {
    icon: _faCalendarAlt.faCalendarAlt,
    text: intl.formatMessage(_messages.default.dashboardInfo, {
      dashboardLink
    })
  });
};
DashboardFootnote.propTypes = {
  variant: _propTypes.default.string.isRequired
};
var _default = exports.default = DashboardFootnote;
//# sourceMappingURL=DashboardFootnote.js.map