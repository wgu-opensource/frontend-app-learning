"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iframeParams = exports.getIFrameUrl = exports.default = void 0;
var _frontendPlatform = require("@edx/frontend-platform");
var _queryString = require("query-string");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const iframeParams = exports.iframeParams = {
  show_title: 0,
  show_bookmark: 0,
  recheck_access: 1
};
const getIFrameUrl = _ref => {
  let {
    id,
    view,
    format,
    examAccess
  } = _ref;
  const xblockUrl = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/xblock/${id}`;
  const params = (0, _queryString.stringify)(_objectSpread(_objectSpread(_objectSpread({}, iframeParams), {}, {
    view
  }, format && {
    format
  }), !examAccess.blockAccess && {
    exam_access: examAccess.accessToken
  }));
  return `${xblockUrl}?${params}`;
};
exports.getIFrameUrl = getIFrameUrl;
var _default = exports.default = {
  getIFrameUrl
};
//# sourceMappingURL=urls.js.map