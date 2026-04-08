"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _data = require("../data");
var _modelStore = require("../../generic/model-store");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ShiftDatesAlert = ({
  fetch,
  model
}) => {
  const intl = (0, _i18n.useIntl)();
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    datesBannerInfo,
    hasEnded
  } = (0, _modelStore.useModel)(model, courseId);
  const {
    missedDeadlines,
    missedGatedContent
  } = datesBannerInfo;
  const dispatch = (0, _reactRedux.useDispatch)();
  if (!missedDeadlines || missedGatedContent || hasEnded) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert, {
    variant: "warning",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Row, {
      className: "w-100 m-0",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Col, {
        xs: 12,
        md: 9,
        className: "small p-0 pr-md-2",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("strong", {
          children: intl.formatMessage(_messages.default.missedDeadlines)
        }), ' ', intl.formatMessage(_messages.default.shiftDatesBody)]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Col, {
        xs: 12,
        md: 3,
        className: "align-self-center text-right mt-3 mt-md-0 p-0",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
          variant: "primary",
          size: "sm",
          className: "w-xs-100 w-md-auto",
          onClick: () => dispatch((0, _data.resetDeadlines)(courseId, model, fetch)),
          children: intl.formatMessage(_messages.default.shiftDatesButton)
        })
      })]
    })
  });
};
ShiftDatesAlert.propTypes = {
  fetch: _propTypes.default.func.isRequired,
  model: _propTypes.default.string.isRequired
};
var _default = exports.default = ShiftDatesAlert;
//# sourceMappingURL=ShiftDatesAlert.js.map