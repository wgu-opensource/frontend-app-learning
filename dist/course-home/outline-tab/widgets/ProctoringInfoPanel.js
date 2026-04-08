"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _lodash = _interopRequireDefault(require("lodash.camelcase"));
var _i18n = require("@edx/frontend-platform/i18n");
var _frontendPlatform = require("@edx/frontend-platform");
var _paragon = require("@openedx/paragon");
var _messages = _interopRequireDefault(require("../messages"));
var _api = require("../../data/api");
var _slice = require("../../data/slice");
var _modelStore = require("../../../generic/model-store");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ProctoringInfoPanel = () => {
  const intl = (0, _i18n.useIntl)();
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
            href: (0, _frontendPlatform.getExternalLinkUrl)('https://support.edx.org/hc/en-us/sections/115004169247-Taking-Timed-and-Proctored-Exams'),
            children: intl.formatMessage(_messages.default.proctoringReviewRequirementsButton)
          })]
        })]
      })
    })
  );
};
var _default = exports.default = ProctoringInfoPanel;
//# sourceMappingURL=ProctoringInfoPanel.js.map