"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.decodeUrl = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = require("@edx/frontend-platform/react");
var _react2 = _interopRequireDefault(require("react"));
var _reactRouter = require("react-router");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const decodeUrl = encodedUrl => {
  const decodedUrl = decodeURIComponent(encodedUrl);
  if (encodedUrl === decodedUrl) {
    return encodedUrl;
  }
  return decodeUrl(decodedUrl);
};
exports.decodeUrl = decodeUrl;
const DecodePageRoute = props => {
  const history = (0, _reactRouter.useHistory)();
  if (props.computedMatch) {
    const {
      url,
      path,
      params
    } = props.computedMatch;
    Object.keys(params).forEach(param => {
      // only decode params not the entire url.
      // it is just to be safe and less prone to errors
      params[param] = decodeUrl(params[param]);
    });
    const newUrl = (0, _reactRouter.generatePath)(path, params);

    // if the url get decoded, reroute to the decoded url
    if (newUrl !== url) {
      history.replace(newUrl);
    }
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.PageRoute, _objectSpread({}, props));
};
DecodePageRoute.propTypes = {
  computedMatch: _propTypes.default.shape({
    url: _propTypes.default.string.isRequired,
    path: _propTypes.default.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    params: _propTypes.default.any
  })
};
DecodePageRoute.defaultProps = {
  computedMatch: null
};
var _default = DecodePageRoute;
exports.default = _default;
//# sourceMappingURL=index.js.map