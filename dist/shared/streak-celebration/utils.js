"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateVoucherDiscountPercentage = calculateVoucherDiscountPercentage;
exports.getDiscountCodePercentage = getDiscountCodePercentage;
exports.recordModalClosing = recordModalClosing;
exports.recordStreakCelebration = recordStreakCelebration;
var _analytics = require("@edx/frontend-platform/analytics");
var _frontendPlatform = require("@edx/frontend-platform");
var _auth = require("@edx/frontend-platform/auth");
var _modelStore = require("../../generic/model-store");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function recordStreakCelebration(org, courseId) {
  // Tell our analytics
  const {
    administrator
  } = (0, _auth.getAuthenticatedUser)();
  (0, _analytics.sendTrackEvent)('edx.ui.lms.celebration.streak.opened', {
    org_key: org,
    courserun_key: courseId,
    is_staff: administrator
  });
}
function recordModalClosing(celebrations, org, courseId, dispatch) {
  // Ensure we only celebrate each streak once
  dispatch((0, _modelStore.updateModel)({
    modelType: 'courseHomeMeta',
    model: {
      id: courseId,
      celebrations: _objectSpread(_objectSpread({}, celebrations), {}, {
        streakLengthToCelebrate: null
      })
    }
  }));
}
async function calculateVoucherDiscountPercentage(voucher, sku, username) {
  const urlBase = `${(0, _frontendPlatform.getConfig)().ECOMMERCE_BASE_URL}/api/v2/baskets/calculate`;
  const url = `${urlBase}/?code=${voucher}&sku=${sku}&username=${username}`;
  const result = await (0, _auth.getAuthenticatedHttpClient)().get(url);
  const {
    totalInclTax,
    totalInclTaxExclDiscounts
  } = (0, _frontendPlatform.camelCaseObject)(result).data;
  if (totalInclTaxExclDiscounts && totalInclTax !== totalInclTaxExclDiscounts) {
    // Just store the percent (rather than using these values directly), because ecommerce doesn't give us
    // the currency symbol to use, so we want to use the symbol that LMS gives us. And I don't want to assume
    // ecommerce's currency is the same as the LMS. So we'll keep using the values in verifiedMode, just
    // multiplied by the calculated percentage.
    return 1 - totalInclTax / totalInclTaxExclDiscounts;
  }
  return 0;
}
async function getDiscountCodePercentage(code, courseId) {
  const params = new URLSearchParams();
  params.append('code', code);
  params.append('course_run_key', courseId);
  const url = `${(0, _frontendPlatform.getConfig)().DISCOUNT_CODE_INFO_URL}?${params.toString()}`;
  const result = await (0, _auth.getAuthenticatedHttpClient)().get(url);
  const {
    isApplicable,
    discountPercentage
  } = (0, _frontendPlatform.camelCaseObject)(result).data;
  return isApplicable ? +discountPercentage : 0;
}
//# sourceMappingURL=utils.js.map