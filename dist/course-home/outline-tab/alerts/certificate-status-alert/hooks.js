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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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