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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function toggleNotes() {
  const iframe = document.getElementById('unit-iframe');
  iframe.contentWindow.postMessage('tools.toggleNotes', (0, _frontendPlatform.getConfig)().LMS_BASE_URL);
}
class NotesVisibility extends _react.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "handleClick", () => {
      const data = {
        visibility: this.state.visible
      };
      (0, _auth.getAuthenticatedHttpClient)().put(this.visibilityUrl, data).then(() => {
        this.setState(state => ({
          visible: !state.visible
        }));
        toggleNotes();
      });
    });
    this.state = {
      visible: props.course.notes.visible
    };
    this.visibilityUrl = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/courses/${props.course.id}/edxnotes/visibility/`;
  }
  render() {
    const message = this.state.visible ? 'notes.button.hide' : 'notes.button.show';
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
      className: `trigger btn ${this.state.visible ? 'text-secondary' : 'text-success'}  mx-2 `,
      role: "switch",
      type: "button",
      onClick: this.handleClick,
      onKeyDown: this.handleClick,
      tabIndex: "-1",
      "aria-checked": this.state.visible ? 'true' : 'false',
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
        icon: _faPencilAlt.faPencilAlt,
        "aria-hidden": "true",
        className: "mr-2"
      }), this.props.intl.formatMessage(_messages.default[message])]
    });
  }
}
NotesVisibility.propTypes = {
  intl: _i18n.intlShape.isRequired,
  course: _propTypes.default.shape({
    id: _propTypes.default.string.isRequired,
    notes: _propTypes.default.shape({
      visible: _propTypes.default.bool
    }).isRequired
  }).isRequired
};
var _default = (0, _i18n.injectIntl)(NotesVisibility);
exports.default = _default;
//# sourceMappingURL=NotesVisibility.js.map