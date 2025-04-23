"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const WelcomeMessage = _ref => {
  let {
    courseId,
    intl
  } = _ref;
  const {
    welcomeMessageHtml
  } = (0, _modelStore.useModel)('outline', courseId);
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
        html: cleanedWelcomeMessageHtml,
        title: intl.formatMessage(_messages.default.welcomeMessage)
      }, "full-html")
    })
  });
};
WelcomeMessage.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  intl: _i18n.intlShape.isRequired
};
var _default = exports.default = (0, _i18n.injectIntl)(WelcomeMessage);
//# sourceMappingURL=WelcomeMessage.js.map