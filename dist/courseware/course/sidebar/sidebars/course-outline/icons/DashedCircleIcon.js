"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const DashedCircleIcon = props => /*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", _objectSpread(_objectSpread({
  width: 24,
  height: 24,
  viewBox: "0 0 40 40",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, props), {}, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: "20",
    cy: "20",
    r: "15",
    stroke: "#ccc",
    strokeWidth: "3",
    strokeDasharray: "2.6 2.3",
    fill: "transparent",
    strokeDashoffset: "27"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: "20",
    cy: "20",
    r: "15",
    fill: "transparent",
    stroke: "#0d7d4d",
    strokeWidth: "3",
    strokeDasharray: `${props.percentage} ${props.remainder}`,
    strokeDashoffset: "29"
  })]
}));
DashedCircleIcon.propTypes = {
  percentage: _propTypes.default.number.isRequired,
  remainder: _propTypes.default.number.isRequired
};
var _default = exports.default = DashedCircleIcon;
//# sourceMappingURL=DashedCircleIcon.js.map