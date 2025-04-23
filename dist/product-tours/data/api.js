"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTourData = getTourData;
exports.patchTourData = patchTourData;
var _frontendPlatform = require("@edx/frontend-platform");
var _auth = require("@edx/frontend-platform/auth");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
async function getTourData(username) {
  const url = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/user_tours/v1/${username}`;
  try {
    const {
      data
    } = await (0, _auth.getAuthenticatedHttpClient)().get(url);
    return _objectSpread({
      toursEnabled: true
    }, (0, _frontendPlatform.camelCaseObject)(data));
  } catch (error) {
    const {
      httpErrorStatus
    } = error && error.customAttributes;
    /** The API will return a
     *    401 if the user is not authenticated
     *    403 if the tour waffle flag is inactive
     *    404 if no User Tour objects exist for the given username
     */
    if (httpErrorStatus === 401 || httpErrorStatus === 403 || httpErrorStatus === 404) {
      return {
        toursEnabled: false
      };
    }
    throw error;
  }
}
async function patchTourData(username, tourData) {
  const url = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/user_tours/v1/${username}`;
  return (0, _auth.getAuthenticatedHttpClient)().patch(url, tourData);
}
//# sourceMappingURL=api.js.map