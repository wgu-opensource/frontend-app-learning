"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _icons = require("@edx/paragon/icons");
var _modelStore = require("../../../../generic/model-store");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const HiddenAfterDue = _ref => {
  let {
    courseId,
    intl
  } = _ref;
  const {
    tabs
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const progressTab = tabs.find(tab => tab.slug === 'progress');
  const progressLink = progressTab && progressTab.url && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
    style: {
      textDecoration: 'underline'
    },
    destination: progressTab.url,
    className: "text-reset",
    children: intl.formatMessage(_messages.default.progressPage)
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Alert, {
    variant: "info",
    icon: _icons.Info,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
      children: intl.formatMessage(_messages.default.header)
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
      children: [intl.formatMessage(_messages.default.description), progressLink && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("br", {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
          id: "learn.hiddenAfterDue.gradeAvailable",
          defaultMessage: "If you have completed this assignment, your grade is available on the {progressPage}.",
          values: {
            progressPage: progressLink
          }
        })]
      })]
    })]
  });
};
HiddenAfterDue.propTypes = {
  intl: _i18n.intlShape.isRequired,
  courseId: _propTypes.default.string.isRequired
};
var _default = (0, _i18n.injectIntl)(HiddenAfterDue);
exports.default = _default;
//# sourceMappingURL=HiddenAfterDue.js.map