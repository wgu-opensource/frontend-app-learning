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
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
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