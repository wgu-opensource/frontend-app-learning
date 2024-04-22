"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTourData = getTourData;
exports.patchTourData = patchTourData;
var _frontendPlatform = require("@edx/frontend-platform");
var _auth = require("@edx/frontend-platform/auth");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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