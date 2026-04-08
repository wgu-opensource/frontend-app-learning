"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _frontendPlatform = require("@edx/frontend-platform");
var _userMessages = require("../../../../generic/user-messages");
var _modelStore = require("../../../../generic/model-store");
var _CertificateStatusAlert = require("./CertificateStatusAlert");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const CertificateStatusAlert = /*#__PURE__*/_react.default.lazy(() => Promise.resolve().then(() => _interopRequireWildcard(require('./CertificateStatusAlert'))));
function verifyCertStatusType(status) {
  switch (status) {
    case _CertificateStatusAlert.CERT_STATUS_TYPE.DOWNLOADABLE:
    case _CertificateStatusAlert.CERT_STATUS_TYPE.EARNED_NOT_AVAILABLE:
    case _CertificateStatusAlert.CERT_STATUS_TYPE.REQUESTING:
    case _CertificateStatusAlert.CERT_STATUS_TYPE.UNVERIFIED:
      return true;
    default:
      return false;
  }
}
function useCertificateStatusAlert(courseId) {
  const VERIFIED_MODES = {
    PROFESSIONAL: 'professional',
    VERIFIED: 'verified',
    NO_ID_PROFESSIONAL_MODE: 'no-id-professional',
    CREDIT_MODE: 'credit',
    MASTERS: 'masters',
    EXECUTIVE_EDUCATION: 'executive-education'
  };
  const {
    isEnrolled,
    org,
    tabs
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    datesWidget: {
      courseDateBlocks
    },
    certData,
    hasEnded,
    userHasPassingGrade,
    userTimezone,
    enrollmentMode
  } = (0, _modelStore.useModel)('outline', courseId);
  const {
    certStatus,
    certWebViewUrl,
    certificateAvailableDate
  } = certData || {};
  const endBlock = courseDateBlocks.find(b => b.dateType === 'course-end-date');
  const isVerifiedEnrollmentMode = enrollmentMode !== null && enrollmentMode !== undefined && !!Object.values(VERIFIED_MODES).find(mode => mode === enrollmentMode);
  let certURL = '';
  if (certWebViewUrl) {
    certURL = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}${certWebViewUrl}`;
  }
  const hasAlertingCertStatus = verifyCertStatusType(certStatus);

  // Only show if:
  // - there is a known cert status that we want provide status on.
  // - Or the course has ended and the learner does not have a passing grade.
  const isVisible = isEnrolled && hasAlertingCertStatus;
  const notPassingCourseEnded = isEnrolled && isVerifiedEnrollmentMode && !hasAlertingCertStatus && hasEnded && !userHasPassingGrade;
  const payload = (0, _react.useMemo)(() => ({
    certificateAvailableDate,
    certURL,
    certStatus,
    courseId,
    courseEndDate: endBlock && endBlock.date,
    userTimezone,
    org,
    notPassingCourseEnded,
    tabs
  }), [certStatus, certURL, certificateAvailableDate, courseId, endBlock, notPassingCourseEnded, org, tabs, userTimezone]);
  (0, _userMessages.useAlert)(isVisible || notPassingCourseEnded, {
    code: 'clientCertificateStatusAlert',
    payload,
    topic: 'outline-course-alerts'
  });
  return {
    clientCertificateStatusAlert: CertificateStatusAlert
  };
}
var _default = exports.default = useCertificateStatusAlert;
//# sourceMappingURL=hooks.js.map