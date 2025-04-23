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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
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
var _default = exports.default = PathFixesProvider;
//# sourceMappingURL=PathFixesProvider.js.map