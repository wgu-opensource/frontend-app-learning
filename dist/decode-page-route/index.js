"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.decodeUrl = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = require("@edx/frontend-platform/react");
var _react2 = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _constants = require("../constants");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ROUTES = [].concat(...Object.values(_constants.DECODE_ROUTES).map(value => Array.isArray(value) ? value : [value]));
const decodeUrl = encodedUrl => {
  const decodedUrl = decodeURIComponent(encodedUrl);
  if (encodedUrl === decodedUrl) {
    return encodedUrl;
  }
  return decodeUrl(decodedUrl);
};
exports.decodeUrl = decodeUrl;
const DecodePageRoute = _ref => {
  let {
    children
  } = _ref;
  let computedMatch = null;
  ROUTES.forEach(route => {
    const matchedRoute = (0, _reactRouterDom.useMatch)(route);
    if (matchedRoute) {
      computedMatch = matchedRoute;
    }
  });
  if (computedMatch) {
    const {
      pathname,
      pattern,
      params
    } = computedMatch;
    Object.keys(params).forEach(param => {
      // only decode params not the entire url.
      // it is just to be safe and less prone to errors
      params[param] = decodeUrl(params[param]);
    });
    const newUrl = (0, _reactRouterDom.generatePath)(pattern.path, params);

    // if the url get decoded, reroute to the decoded url
    if (newUrl !== pathname) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Navigate, {
        to: newUrl,
        replace: true
      });
    }
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.PageWrap, {
    children: [" ", children, " "]
  });
};
DecodePageRoute.propTypes = {
  children: _propTypes.default.node.isRequired
};
var _default = DecodePageRoute;
exports.default = _default;
//# sourceMappingURL=index.js.map