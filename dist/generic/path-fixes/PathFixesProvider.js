"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactRouterDom = require("react-router-dom");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _analytics = require("@edx/frontend-platform/analytics");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /**
                                                                                                                                                                                                                                                                                                                                                                                           * We have seen evidence of learners hitting MFE pages with spaces instead of plus signs (which are used commonly
                                                                                                                                                                                                                                                                                                                                                                                           * in our course keys). It's possible something out there is un-escaping our paths before sending learners to them.
                                                                                                                                                                                                                                                                                                                                                                                           *
                                                                                                                                                                                                                                                                                                                                                                                           * So this provider fixes those paths up and logs it so that we can try to fix the source.
                                                                                                                                                                                                                                                                                                                                                                                           *
                                                                                                                                                                                                                                                                                                                                                                                           * This might be temporary, based on how much we can fix the sources of these urls-with-spaces.
                                                                                                                                                                                                                                                                                                                                                                                           */
const PathFixesProvider = _ref => {
  let {
    children
  } = _ref;
  const location = (0, _reactRouterDom.useLocation)();

  // We only check for spaces. That's not the only kind of character that is escaped in URLs, but it would always be
  // present for our cases, and I believe it's the only one we use normally.
  if (location.pathname.includes(' ') || location.pathname.includes('%20')) {
    const newLocation = _objectSpread(_objectSpread({}, location), {}, {
      pathname: location.pathname.replaceAll(' ', '+').replaceAll('%20', '+')
    });
    (0, _analytics.sendTrackEvent)('edx.ui.lms.path_fixed', {
      new_path: newLocation.pathname,
      old_path: location.pathname,
      referrer: document.referrer,
      search: location.search
    });
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Navigate, {
      to: newLocation,
      replace: true
    });
  }
  return children; // pass through
};

PathFixesProvider.propTypes = {
  children: _propTypes.default.node.isRequired
};
var _default = PathFixesProvider;
exports.default = _default;
//# sourceMappingURL=PathFixesProvider.js.map