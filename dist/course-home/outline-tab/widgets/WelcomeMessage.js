"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _truncateHtml = _interopRequireDefault(require("truncate-html"));
var _reactRedux = require("react-redux");
var _LmsHtmlFragment = _interopRequireDefault(require("../LmsHtmlFragment"));
var _messages = _interopRequireDefault(require("../messages"));
var _modelStore = require("../../../generic/model-store");
var _thunks = require("../../data/thunks");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const WelcomeMessage = ({
  courseId,
  nextElementRef
}) => {
  const intl = (0, _i18n.useIntl)();
  const {
    welcomeMessageHtml
  } = (0, _modelStore.useModel)('outline', courseId);
  const messageBodyRef = (0, _react.useRef)();
  const [display, setDisplay] = (0, _react.useState)(true);

  // welcomeMessageHtml can contain comments or malformatted HTML which can impact the length that determines
  // messageCanBeShortened. We clean it by calling truncate with a length of welcomeMessageHtml.length which
  // will not result in a truncation but a formatting into 'truncate-html' canonical format.
  const cleanedWelcomeMessageHtml = (0, _react.useMemo)(() => (0, _truncateHtml.default)(welcomeMessageHtml, welcomeMessageHtml.length, {
    keepWhitespaces: true
  }), [welcomeMessageHtml]);
  const shortWelcomeMessageHtml = (0, _react.useMemo)(() => (0, _truncateHtml.default)(cleanedWelcomeMessageHtml, 100, {
    byWords: true,
    keepWhitespaces: true
  }), [cleanedWelcomeMessageHtml]);
  const messageCanBeShortened = (0, _react.useMemo)(() => shortWelcomeMessageHtml.length < cleanedWelcomeMessageHtml.length, [cleanedWelcomeMessageHtml, shortWelcomeMessageHtml]);
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
      nextElementRef.current?.focus();
      setDisplay(false);
      dispatch((0, _thunks.dismissWelcomeMessage)(courseId));
    },
    className: "raised-card",
    actions: messageCanBeShortened ? [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
      onClick: () => {
        if (showShortMessage) {
          messageBodyRef.current?.focus();
        }
        setShowShortMessage(!showShortMessage);
      },
      variant: "outline-primary",
      children: showShortMessage ? intl.formatMessage(_messages.default.welcomeMessageShowMoreButton) : intl.formatMessage(_messages.default.welcomeMessageShowLessButton)
    })] : [],
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      ref: messageBodyRef,
      tabIndex: "-1",
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
          html: cleanedWelcomeMessageHtml,
          title: intl.formatMessage(_messages.default.welcomeMessage)
        }, "full-html")
      })
    })
  });
};
WelcomeMessage.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  nextElementRef: _propTypes.default.shape({
    current: _propTypes.default.instanceOf(HTMLInputElement)
  })
};
var _default = exports.default = WelcomeMessage;
//# sourceMappingURL=WelcomeMessage.js.map