"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Footnote(_ref) {
  let {
    icon,
    text
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "row w-100 mx-0 my-4 justify-content-center",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
      className: "text-gray-700",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
        icon: icon,
        style: {
          width: '20px'
        }
      }), "\xA0", text]
    })
  });
}

Footnote.propTypes = {
  icon: _propTypes.default.shape({}).isRequired,
  text: _propTypes.default.node.isRequired
};
var _default = Footnote;
exports.default = _default;
//# sourceMappingURL=Footnote.js.map