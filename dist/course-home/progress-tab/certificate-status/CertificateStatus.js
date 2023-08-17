"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _analytics = require("@edx/frontend-platform/analytics");

var _auth = require("@edx/frontend-platform/auth");

var _i18n = require("@edx/frontend-platform/i18n");

var _paragon = require("@edx/paragon");

var _frontendPlatform = require("@edx/frontend-platform");

var _modelStore = require("../../../generic/model-store");

var _utils = require("../../../courseware/course/course-exit/utils");

var _links = require("../../../shared/links");

var _thunks = require("../../data/thunks");

var _messages = _interopRequireDefault(require("./messages"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function CertificateStatus(_ref) {
  let {
    intl
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    isEnrolled,
    org,
    canViewCertificate,
    userTimezone
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    certificateData,
    end,
    enrollmentMode,
    gradingPolicy: {
      gradeRange
    },
    hasScheduledContent,
    userHasPassingGrade,
    verificationData,
    verifiedMode
  } = (0, _modelStore.useModel)('progress', courseId);
  const {
    certificateAvailableDate
  } = certificateData || {};
  const mode = (0, _utils.getCourseExitMode)(certificateData, hasScheduledContent, isEnrolled, userHasPassingGrade, null, // CourseExitPageIsActive
  canViewCertificate);
  const eventProperties = {
    org_key: org,
    courserun_key: courseId
  };
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    administrator
  } = (0, _auth.getAuthenticatedUser)();
  let certStatus;
  let certWebViewUrl;
  const timezoneFormatArgs = userTimezone ? {
    timeZone: userTimezone
  } : {};

  if (certificateData) {
    certStatus = certificateData.certStatus;
    certWebViewUrl = certificateData.certWebViewUrl;
  }

  let certCase;
  let certEventName = certStatus;
  let body;
  let buttonAction;
  let buttonLocation;
  let buttonText;
  let endDate;
  let certAvailabilityDate;
  let gradeEventName = 'not_passing';

  if (userHasPassingGrade) {
    gradeEventName = Object.entries(gradeRange).length > 1 ? 'passing_grades' : 'passing';
  }

  const dashboardLink = /*#__PURE__*/(0, _jsxRuntime.jsx)(_links.DashboardLink, {});
  const idVerificationSupportLink = /*#__PURE__*/(0, _jsxRuntime.jsx)(_links.IdVerificationSupportLink, {});
  const profileLink = /*#__PURE__*/(0, _jsxRuntime.jsx)(_links.ProfileLink, {}); // Some learners have a valid ("downloadable") certificate without being in a passing
  // state (e.g. learners who have been added to a course's allowlist), so we need to
  // skip grade validation for these learners

  const certIsDownloadable = certStatus === 'downloadable';

  if (mode === _utils.COURSE_EXIT_MODES.disabled) {
    certEventName = 'certificate_status_disabled';
  } else if (mode === _utils.COURSE_EXIT_MODES.nonPassing && !certIsDownloadable) {
    certCase = 'notPassing';
    certEventName = 'not_passing';
    body = intl.formatMessage(_messages.default[`${certCase}Body`]);
  } else if (mode === _utils.COURSE_EXIT_MODES.inProgress && !certIsDownloadable) {
    certCase = 'inProgress';
    certEventName = 'has_scheduled_content';
    body = intl.formatMessage(_messages.default[`${certCase}Body`]);
  } else if (mode === _utils.COURSE_EXIT_MODES.celebration || certIsDownloadable) {
    switch (certStatus) {
      case 'requesting':
        certCase = 'requestable';

        buttonAction = () => {
          dispatch((0, _thunks.requestCert)(courseId));
        };

        body = intl.formatMessage(_messages.default[`${certCase}Body`]);
        buttonText = intl.formatMessage(_messages.default[`${certCase}Button`]);
        break;

      case 'unverified':
        certCase = 'unverified';

        if (verificationData.status === 'pending') {
          body = /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            children: intl.formatMessage(_messages.default.unverifiedPendingBody)
          });
        } else {
          body = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "progress.certificateStatus.unverifiedBody",
            defaultMessage: "In order to generate a certificate, you must complete ID verification. {idVerificationSupportLink}.",
            description: "Its shown when learner are not verified thus it recommends going over the verification process",
            values: {
              idVerificationSupportLink
            }
          });
          buttonLocation = verificationData.link;
          buttonText = intl.formatMessage(_messages.default[`${certCase}Button`]);
        }

        break;

      case 'downloadable':
        // Certificate available, download/viewable
        certCase = 'downloadable';
        body = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
          id: "progress.certificateStatus.downloadableBody",
          defaultMessage: " Showcase your accomplishment on LinkedIn or your resum\xE9 today. You can download your certificate now and access it any time from your {dashboardLink} and {profileLink}.",
          description: "Recommending an action for learner when course certificate is available",
          values: {
            dashboardLink,
            profileLink
          }
        });

        if (certWebViewUrl) {
          certEventName = 'earned_viewable';
          buttonLocation = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}${certWebViewUrl}`;
          buttonText = intl.formatMessage(_messages.default.viewableButton);
        }

        break;

      case 'earned_but_not_available':
        certCase = 'notAvailable';
        endDate = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedDate, {
          value: end,
          day: "numeric",
          month: "long",
          year: "numeric"
        });
        certAvailabilityDate = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedDate, {
          value: certificateAvailableDate,
          day: "numeric",
          month: "long",
          year: "numeric"
        });
        body = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
          id: "courseCelebration.certificateBody.notAvailable.endDate",
          defaultMessage: "This course ends on {endDate}. Final grades and any earned certificates are scheduled to be available after {certAvailabilityDate}.",
          description: "This shown for leaner when they are eligible for certifcate but it't not available yet, it could because leaners just finished the course quickly!",
          values: {
            endDate,
            certAvailabilityDate
          }
        });
        break;

      case 'audit_passing':
      case 'honor_passing':
        if (verifiedMode) {
          certCase = 'upgrade';
          body = intl.formatMessage(_messages.default[`${certCase}Body`]);
          buttonLocation = verifiedMode.upgradeUrl;
          buttonText = intl.formatMessage(_messages.default[`${certCase}Button`]);
        } else {
          certCase = null; // Do not render the certificate component if the upgrade deadline has passed

          certEventName = 'audit_passing_missed_upgrade_deadline';
        }

        break;

      default:
        // if user completes a course before certificates are available, treat it as notAvailable
        // regardless of passing or nonpassing status
        if (!canViewCertificate) {
          certCase = 'notAvailable';
          endDate = intl.formatDate(end, _objectSpread({
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }, timezoneFormatArgs));
          body = intl.formatMessage(_messages.default.notAvailableEndDateBody, {
            endDate
          });
        } else {
          certCase = null;
          certEventName = 'no_certificate_status';
        }

        break;
    }
  } // Log visit to progress tab


  (0, _react.useEffect)(() => {
    (0, _analytics.sendTrackEvent)('edx.ui.lms.course_progress.visited', {
      org_key: org,
      courserun_key: courseId,
      is_staff: administrator,
      track_variant: enrollmentMode,
      grade_variant: gradeEventName,
      certificate_status_variant: certEventName
    });
  }, []);

  if (!certCase) {
    return null;
  }

  const header = intl.formatMessage(_messages.default[`${certCase}Header`]);

  const logCertificateStatusButtonClicked = () => {
    (0, _analytics.sendTrackEvent)('edx.ui.lms.course_progress.certificate_status.clicked', {
      org_key: org,
      courserun_key: courseId,
      is_staff: administrator,
      certificate_status_variant: certEventName
    });

    if (certCase === 'upgrade') {
      (0, _analytics.sendTrackEvent)('edx.bi.ecommerce.upsell_links_clicked', _objectSpread(_objectSpread({}, eventProperties), {}, {
        linkCategory: '(none)',
        linkName: 'progress_certificate',
        linkType: 'button',
        pageName: 'progress'
      }));
    }
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
    "data-testid": "certificate-status-component",
    className: "text-dark-700 mb-4",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Card, {
      className: "bg-light-200 raised-card",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Card.Header, {
        title: header
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Card.Section, {
        className: "small text-gray-700",
        children: body
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Card.Footer, {
        children: buttonText && (buttonLocation || buttonAction) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
          variant: "outline-brand",
          onClick: () => {
            logCertificateStatusButtonClicked(certStatus);

            if (buttonAction) {
              buttonAction();
            }
          },
          href: buttonLocation,
          block: true,
          children: buttonText
        })
      })]
    })
  });
}

CertificateStatus.propTypes = {
  intl: _i18n.intlShape.isRequired
};

var _default = (0, _i18n.injectIntl)(CertificateStatus);

exports.default = _default;
//# sourceMappingURL=CertificateStatus.js.map