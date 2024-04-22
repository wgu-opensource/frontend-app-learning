"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _truncateHtml = _interopRequireDefault(require("truncate-html"));
var _reactRedux = require("react-redux");
var _LmsHtmlFragment = _interopRequireDefault(require("../LmsHtmlFragment"));
var _messages = _interopRequireDefault(require("../messages"));
var _modelStore = require("../../../generic/model-store");
var _thunks = require("../../data/thunks");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const WelcomeMessage = _ref => {
  let {
    courseId,
    intl
  } = _ref;
  const {
    welcomeMessageHtml
  } = (0, _modelStore.useModel)('outline', courseId);
  const [display, setDisplay] = (0, _react.useState)(true);
  const shortWelcomeMessageHtml = (0, _truncateHtml.default)(welcomeMessageHtml, 100, {
    byWords: true,
    keepWhitespaces: true
  });
  const messageCanBeShortened = shortWelcomeMessageHtml.length < welcomeMessageHtml.length;
  const [showShortMessage, setShowShortMessage] = (0, _react.useState)(messageCanBeShortened);
  const dispatch = (0, _reactRedux.useDispatch)();
  if (!welcomeMessageHtml) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert, {
    "data-testid": "alert-container-welcome",
    variant: "light",
    stacked: true,
    dismissible: true,
    show: display,
    onClose: () => {
      setDisplay(false);
      dispatch((0, _thunks.dismissWelcomeMessage)(courseId));
    },
    className: "raised-card",
    actions: messageCanBeShortened ? [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
      onClick: () => setShowShortMessage(!showShortMessage),
      variant: "outline-primary",
      children: showShortMessage ? intl.formatMessage(_messages.default.welcomeMessageShowMoreButton) : intl.formatMessage(_messages.default.welcomeMessageShowLessButton)
    })] : [],
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.TransitionReplace, {
      className: "mb-3",
      enterDuration: 400,
      exitDuration: 200,
      children: showShortMessage ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_LmsHtmlFragment.default, {
        className: "inline-link",
        "data-testid": "short-welcome-message-iframe",
        html: shortWelcomeMessageHtml,
        title: intl.formatMessage(_messages.default.welcomeMessage)
      }, "short-html") : /*#__PURE__*/(0, _jsxRuntime.jsx)(_LmsHtmlFragment.default, {
        className: "inline-link",
        "data-testid": "long-welcome-message-iframe",
        html: welcomeMessageHtml,
        title: intl.formatMessage(_messages.default.welcomeMessage)
      }, "full-html")
    })
  });
};
WelcomeMessage.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  intl: _i18n.intlShape.isRequired
};
var _default = (0, _i18n.injectIntl)(WelcomeMessage);
exports.default = _default;
//# sourceMappingURL=WelcomeMessage.js.map