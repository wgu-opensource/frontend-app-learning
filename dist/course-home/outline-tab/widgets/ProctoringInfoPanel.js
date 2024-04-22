"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _lodash = _interopRequireDefault(require("lodash.camelcase"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _messages = _interopRequireDefault(require("../messages"));
var _api = require("../../data/api");
var _slice = require("../../data/slice");
var _modelStore = require("../../../generic/model-store");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ProctoringInfoPanel = _ref => {
  let {
    intl
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    username
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const dispatch = (0, _reactRedux.useDispatch)();
  const [link, setLink] = (0, _react.useState)('');
  const [onboardingPastDue, setOnboardingPastDue] = (0, _react.useState)(false);
  const [showInfoPanel, setShowInfoPanel] = (0, _react.useState)(false);
  const [status, setStatus] = (0, _react.useState)('');
  const [readableStatus, setReadableStatus] = (0, _react.useState)('');
  const [releaseDate, setReleaseDate] = (0, _react.useState)(null);
  const readableStatuses = {
    notStarted: 'notStarted',
    started: 'started',
    submitted: 'submitted',
    verified: 'verified',
    rejected: 'rejected',
    error: 'error',
    otherCourseApproved: 'otherCourseApproved',
    expiringSoon: 'expiringSoon',
    expired: 'expired'
  };
  function getReadableStatusClass(examStatus) {
    let readableClass = '';
    if (['created', 'download_software_clicked', 'ready_to_start'].includes(examStatus) || !examStatus) {
      readableClass = readableStatuses.notStarted;
    } else if (['started', 'ready_to_submit'].includes(examStatus)) {
      readableClass = readableStatuses.started;
    } else if (['second_review_required', 'submitted'].includes(examStatus)) {
      readableClass = readableStatuses.submitted;
    } else {
      const examStatusCamelCase = (0, _lodash.default)(examStatus);
      if (examStatusCamelCase in readableStatuses) {
        readableClass = readableStatuses[examStatusCamelCase];
      }
    }
    return readableClass;
  }
  function isCurrentlySubmitted(examStatus) {
    const SUBMITTED_STATES = ['submitted', 'second_review_required'];
    return SUBMITTED_STATES.includes(examStatus);
  }
  function isSubmissionRequired(examStatus) {
    const OK_STATES = [readableStatuses.submitted, readableStatuses.verified];
    return !OK_STATES.includes(examStatus);
  }
  function isNotYetReleased(examReleaseDate) {
    if (!examReleaseDate) {
      return false;
    }
    const now = new Date();
    return now < examReleaseDate;
  }
  function getBorderClass() {
    let borderClass = '';
    if ([readableStatuses.submitted, readableStatuses.expiringSoon].includes(readableStatus)) {
      borderClass = 'proctoring-onboarding-submitted';
    } else if ([readableStatuses.verified, readableStatuses.otherCourseApproved].includes(readableStatus)) {
      borderClass = 'proctoring-onboarding-success';
    }
    return borderClass;
  }
  function isExpired(dateString) {
    // Returns true if the expiration date has passed
    const today = new Date();
    const expirationDateObject = new Date(dateString);
    return today >= expirationDateObject.getTime();
  }
  function isExpiringSoon(dateString) {
    // Returns true if the expiration date is within 28 days
    const twentyeightDays = 28 * 24 * 60 * 60 * 1000;
    const today = new Date();
    const expirationDateObject = new Date(dateString);
    return today > expirationDateObject.getTime() - twentyeightDays;
  }
  (0, _react.useEffect)(() => {
    (0, _api.getProctoringInfoData)(courseId, username).then(response => {
      if (response) {
        if (Object.keys(response).length > 0) {
          setShowInfoPanel(true);
        }
        setStatus(response.onboarding_status);
        setLink(response.onboarding_link);
        const expirationDate = response.expiration_date;
        if (expirationDate && isExpired(expirationDate)) {
          setReadableStatus(getReadableStatusClass('expired'));
        } else if (expirationDate && isExpiringSoon(expirationDate)) {
          setReadableStatus(getReadableStatusClass('expiringSoon'));
        } else {
          setReadableStatus(getReadableStatusClass(response.onboarding_status));
        }
        setReleaseDate(new Date(response.onboarding_release_date));
        setOnboardingPastDue(response.onboarding_past_due);
      }
    }).catch(() => {
      /* Do nothing. API throws 404 when class does not have proctoring */
    }).finally(() => {
      dispatch((0, _slice.fetchProctoringInfoResolved)());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let onboardingExamButton = null;
  if (isNotYetReleased(releaseDate)) {
    onboardingExamButton = /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
      variant: "secondary",
      block: true,
      disabled: true,
      "aria-disabled": "true",
      children: intl.formatMessage(_messages.default.proctoringOnboardingButtonNotOpen, {
        releaseDate: intl.formatDate(releaseDate, {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      })
    });
  } else if (onboardingPastDue) {
    onboardingExamButton = /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
      variant: "secondary",
      block: true,
      disabled: true,
      "aria-disabled": "true",
      children: intl.formatMessage(_messages.default.proctoringOnboardingButtonPastDue)
    });
  } else if (!isNotYetReleased(releaseDate)) {
    if (readableStatus === readableStatuses.otherCourseApproved) {
      onboardingExamButton = /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
        variant: "primary",
        block: true,
        href: link,
        children: intl.formatMessage(_messages.default.proctoringOnboardingPracticeButton)
      });
    } else if (readableStatus !== readableStatuses.otherCourseApproved) {
      onboardingExamButton = /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
        variant: "primary",
        block: true,
        href: link,
        children: intl.formatMessage(_messages.default.proctoringOnboardingButton)
      });
    }
  }
  return (
    /*#__PURE__*/
    // eslint-disable-next-line react/jsx-no-useless-fragment
    (0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
      children: showInfoPanel && /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
        className: `mb-4 p-3 outline-sidebar-proctoring-panel ${getBorderClass()}`,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
          className: "h4",
          id: "outline-sidebar-upgrade-header",
          children: intl.formatMessage(_messages.default.proctoringInfoPanel)
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [readableStatus && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
              className: "h6",
              children: [intl.formatMessage(_messages.default.proctoringCurrentStatus), " ", intl.formatMessage(_messages.default[`${readableStatus}ProctoringStatus`])]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: intl.formatMessage(_messages.default[`${readableStatus}ProctoringMessage`])
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: readableStatus === readableStatuses.otherCourseApproved && intl.formatMessage(_messages.default[`${readableStatus}ProctoringDetail`])
            })]
          }), ![readableStatuses.verified, readableStatuses.otherCourseApproved].includes(readableStatus) && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
              children: [!isCurrentlySubmitted(status) && intl.formatMessage(_messages.default.proctoringPanelGeneralInfo), isCurrentlySubmitted(status) && intl.formatMessage(_messages.default.proctoringPanelGeneralInfoSubmitted)]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: intl.formatMessage(_messages.default.proctoringPanelGeneralTime)
            })]
          }), isSubmissionRequired(readableStatus) && onboardingExamButton, /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
            variant: "outline-primary",
            block: true,
            href: "https://support.edx.org/hc/en-us/sections/115004169247-Taking-Timed-and-Proctored-Exams",
            children: intl.formatMessage(_messages.default.proctoringReviewRequirementsButton)
          })]
        })]
      })
    })
  );
};
ProctoringInfoPanel.propTypes = {
  intl: _i18n.intlShape.isRequired
};
var _default = (0, _i18n.injectIntl)(ProctoringInfoPanel);
exports.default = _default;
//# sourceMappingURL=ProctoringInfoPanel.js.map