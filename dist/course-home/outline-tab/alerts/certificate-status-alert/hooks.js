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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

  const hasAlertingCertStatus = verifyCertStatusType(certStatus); // Only show if:
  // - there is a known cert status that we want provide status on.
  // - Or the course has ended and the learner does not have a passing grade.

  const isVisible = isEnrolled && hasAlertingCertStatus;
  const notPassingCourseEnded = isEnrolled && isVerifiedEnrollmentMode && !hasAlertingCertStatus && hasEnded && !userHasPassingGrade;
  const payload = {
    certificateAvailableDate,
    certURL,
    certStatus,
    courseId,
    courseEndDate: endBlock && endBlock.date,
    userTimezone,
    org,
    notPassingCourseEnded,
    tabs
  };
  (0, _userMessages.useAlert)(isVisible || notPassingCourseEnded, {
    code: 'clientCertificateStatusAlert',
    payload: (0, _react.useMemo)(() => payload, Object.values(payload).sort()),
    topic: 'outline-course-alerts'
  });
  return {
    clientCertificateStatusAlert: CertificateStatusAlert
  };
}

var _default = useCertificateStatusAlert;
exports.default = _default;
//# sourceMappingURL=hooks.js.map