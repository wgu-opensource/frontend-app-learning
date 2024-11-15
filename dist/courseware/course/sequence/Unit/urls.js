"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iframeParams = exports.getIFrameUrl = exports.default = void 0;
var _frontendPlatform = require("@edx/frontend-platform");
var _queryString = require("query-string");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const iframeParams = {
  show_title: 0,
  show_bookmark: 0,
  recheck_access: 1
};
exports.iframeParams = iframeParams;
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
var _default = {
  getIFrameUrl
};
exports.default = _default;
//# sourceMappingURL=urls.js.map