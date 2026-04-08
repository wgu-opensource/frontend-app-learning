"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _frontendPlatform = require("@edx/frontend-platform");
var _auth = require("@edx/frontend-platform/auth");
var _i18n = require("@edx/frontend-platform/i18n");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _faPencilAlt = require("@fortawesome/free-solid-svg-icons/faPencilAlt");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function toggleNotes() {
  const iframe = document.getElementById('unit-iframe');
  iframe.contentWindow.postMessage('tools.toggleNotes', (0, _frontendPlatform.getConfig)().LMS_BASE_URL);
}
const NotesVisibility = ({
  course
}) => {
  const intl = (0, _i18n.useIntl)();
  const [visible, setVisible] = (0, _react.useState)(course.notes.visible);
  const visibilityUrl = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/courses/${course.id}/edxnotes/visibility/`;
  const handleClick = () => {
    const data = {
      visibility: !visible
    };
    (0, _auth.getAuthenticatedHttpClient)().put(visibilityUrl, data).then(() => {
      setVisible(!visible);
      toggleNotes();
    });
  };
  const message = visible ? 'notes.button.hide' : 'notes.button.show';
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
    className: `trigger btn ${visible ? 'text-secondary' : 'text-success'}  mx-2 `,
    role: "switch",
    type: "button",
    onClick: handleClick,
    onKeyDown: handleClick,
    tabIndex: "-1",
    "aria-checked": visible ? 'true' : 'false',
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
      icon: _faPencilAlt.faPencilAlt,
      "aria-hidden": "true",
      className: "mr-2"
    }), intl.formatMessage(_messages.default[message])]
  });
};
NotesVisibility.propTypes = {
  course: _propTypes.default.shape({
    id: _propTypes.default.string.isRequired,
    notes: _propTypes.default.shape({
      visible: _propTypes.default.bool
    }).isRequired
  }).isRequired
};
var _default = exports.default = NotesVisibility;
//# sourceMappingURL=NotesVisibility.js.map