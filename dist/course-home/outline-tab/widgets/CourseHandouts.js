"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _i18n = require("@edx/frontend-platform/i18n");
var _LmsHtmlFragment = _interopRequireDefault(require("../LmsHtmlFragment"));
var _messages = _interopRequireDefault(require("../messages"));
var _modelStore = require("../../../generic/model-store");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CourseHandouts = _ref => {
  let {
    intl
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    handoutsHtml
  } = (0, _modelStore.useModel)('outline', courseId);
  if (!handoutsHtml) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
    className: "mb-4",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
      className: "h4",
      children: intl.formatMessage(_messages.default.handouts)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LmsHtmlFragment.default, {
      className: "small",
      html: handoutsHtml,
      title: intl.formatMessage(_messages.default.handouts)
    })]
  });
};
CourseHandouts.propTypes = {
  intl: _i18n.intlShape.isRequired
};
var _default = (0, _i18n.injectIntl)(CourseHandouts);
exports.default = _default;
//# sourceMappingURL=CourseHandouts.js.map