"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _faVideo = require("@fortawesome/free-solid-svg-icons/faVideo");
var _faBook = require("@fortawesome/free-solid-svg-icons/faBook");
var _faEdit = require("@fortawesome/free-solid-svg-icons/faEdit");
var _faTasks = require("@fortawesome/free-solid-svg-icons/faTasks");
var _faLock = require("@fortawesome/free-solid-svg-icons/faLock");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const UnitIcon = ({
  type
}) => {
  let icon = null;
  switch (type) {
    case 'video':
      icon = _faVideo.faVideo;
      break;
    case 'other':
      icon = _faBook.faBook;
      break;
    case 'vertical':
      icon = _faTasks.faTasks;
      break;
    case 'problem':
      icon = _faEdit.faEdit;
      break;
    case 'lock':
      icon = _faLock.faLock;
      break;
    default:
      icon = _faBook.faBook;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
    className: "unit-icon",
    icon: icon
  });
};
UnitIcon.propTypes = {
  type: _propTypes.default.oneOf(['video', 'other', 'vertical', 'problem', 'lock']).isRequired
};
var _default = exports.default = UnitIcon;
//# sourceMappingURL=UnitIcon.js.map