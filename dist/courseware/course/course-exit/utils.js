"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COURSE_EXIT_MODES = void 0;
exports.GetCourseExitNavigation = GetCourseExitNavigation;
exports.getCourseExitMode = getCourseExitMode;
exports.logVisit = exports.logClick = void 0;
var _analytics = require("@edx/frontend-platform/analytics");
var _auth = require("@edx/frontend-platform/auth");
var _messages = _interopRequireDefault(require("./messages"));
var _modelStore = require("../../../generic/model-store");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const COURSE_EXIT_MODES = {
  disabled: 0,
  celebration: 1,
  nonPassing: 2,
  inProgress: 3
};

// These are taken from the edx-platform `get_cert_data` function found in lms/courseware/views/views.py
exports.COURSE_EXIT_MODES = COURSE_EXIT_MODES;
const CELEBRATION_STATUSES = ['audit_passing', 'downloadable', 'earned_but_not_available', 'honor_passing', 'requesting', 'unverified'];
const NON_CERTIFICATE_STATUSES = [
// no certificate will be given, though a valid certificateData block is provided
'audit_passing', 'honor_passing' // provided when honor is configured to not give a certificate
];

function getCourseExitMode(certificateData, hasScheduledContent, isEnrolled, userHasPassingGrade) {
  let courseExitPageIsActive = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  let canImmediatelyViewCertificate = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  const authenticatedUser = (0, _auth.getAuthenticatedUser)();
  if (courseExitPageIsActive === false || !authenticatedUser || !isEnrolled) {
    return COURSE_EXIT_MODES.disabled;
  }

  // Set defaults for our status-calculated variables, used when no certificateData is provided.
  // This happens when `get_cert_data` in edx-platform returns None, which it does if we are
  // in a certificate-earning mode, but the certificate is not available (maybe they didn't pass
  // or course is not set up for certificates or something). Audit users will always have a
  // certificateData sent over.
  let isCelebratoryStatus = true;
  let isEligibleForCertificate = true;
  if (certificateData) {
    const {
      certStatus
    } = certificateData;
    isCelebratoryStatus = CELEBRATION_STATUSES.indexOf(certStatus) !== -1;
    isEligibleForCertificate = NON_CERTIFICATE_STATUSES.indexOf(certStatus) === -1;
  }
  if (hasScheduledContent && !userHasPassingGrade) {
    return COURSE_EXIT_MODES.inProgress;
  }
  if (isEligibleForCertificate && !userHasPassingGrade && canImmediatelyViewCertificate) {
    return COURSE_EXIT_MODES.nonPassing;
  }
  if (isCelebratoryStatus) {
    return COURSE_EXIT_MODES.celebration;
  }
  return COURSE_EXIT_MODES.disabled;
}

// Returns null in order to render the default navigation text
function GetCourseExitNavigation(courseId, intl) {
  const {
    certificateData,
    hasScheduledContent,
    isEnrolled,
    userHasPassingGrade,
    courseExitPageIsActive
  } = (0, _modelStore.useModel)('coursewareMeta', courseId);
  const {
    canViewCertificate
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const exitMode = getCourseExitMode(certificateData, hasScheduledContent, isEnrolled, userHasPassingGrade, courseExitPageIsActive, canViewCertificate);
  const exitActive = exitMode !== COURSE_EXIT_MODES.disabled;
  let exitText;
  switch (exitMode) {
    case COURSE_EXIT_MODES.celebration:
      exitText = intl.formatMessage(_messages.default.nextButtonComplete);
      break;
    case COURSE_EXIT_MODES.nonPassing:
      exitText = intl.formatMessage(_messages.default.nextButtonEnd);
      break;
    default:
      exitText = null;
  }
  return {
    exitActive,
    exitText
  };
}

// Meant to be used as part of a button's onClick handler.
// For convenience, you can pass a falsy event and it will be ignored.
const logClick = (org, courseId, administrator, event, extraProperties) => {
  if (!event) {
    return;
  }
  (0, _analytics.sendTrackEvent)(`edx.ui.lms.course_exit.${event}.clicked`, _objectSpread({
    org_key: org,
    courserun_key: courseId,
    is_staff: administrator
  }, extraProperties));
};

// Use like the following to call this only once on initial page load:
// useEffect(() => logVisit(org, courseId, administrator, variant), [org, courseId, administrator, variant]);
// For convenience, you can pass a falsy variant and it will be ignored.
exports.logClick = logClick;
const logVisit = (org, courseId, administrator, variant) => {
  if (!variant) {
    return;
  }
  (0, _analytics.sendTrackEvent)('edx.ui.lms.course_exit.visited', {
    org_key: org,
    courserun_key: courseId,
    is_staff: administrator,
    variant
  });
};
exports.logVisit = logVisit;
//# sourceMappingURL=utils.js.map