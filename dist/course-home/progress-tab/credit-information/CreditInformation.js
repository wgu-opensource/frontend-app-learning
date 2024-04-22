"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _frontendPlatform = require("@edx/frontend-platform");
var _i18n = require("@edx/frontend-platform/i18n");
var _icons = require("@edx/paragon/icons");
var _paragon = require("@edx/paragon");
var _modelStore = require("../../../generic/model-store");
var _links = require("../../../shared/links");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CreditInformation = _ref => {
  let {
    intl
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    creditCourseRequirements
  } = (0, _modelStore.useModel)('progress', courseId);
  if (!creditCourseRequirements) {
    return null;
  }
  let eligibilityStatus;
  let requirementStatus;
  const requirements = [];
  const dashboardLink = /*#__PURE__*/(0, _jsxRuntime.jsx)(_links.DashboardLink, {});
  const creditLink = /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
    variant: "muted",
    isInline: true,
    destination: (0, _frontendPlatform.getConfig)().CREDIT_HELP_LINK_URL,
    children: intl.formatMessage(_messages.default.courseCredit)
  });
  switch (creditCourseRequirements.eligibilityStatus) {
    case 'not_eligible':
      eligibilityStatus = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "progress.creditInformation.creditNotEligible",
        defaultMessage: "You are no longer eligible for credit in this course. Learn more about {creditLink}.",
        description: "Message to learner who are not eligible for course credit, it can because the a requirement deadline have passed",
        values: {
          creditLink
        }
      });
      break;
    case 'eligible':
      eligibilityStatus = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "progress.creditInformation.creditEligible",
        defaultMessage: " You have met the requirements for credit in this course. Go to your {dashboardLink} to purchase course credit. Or learn more about {creditLink}.",
        description: "After the credit requirements are met, leaners can then do the last step which purchasing the credit. Note that is only doable for leaners after they met all the requirements",
        values: {
          dashboardLink,
          creditLink
        }
      });
      break;
    case 'partial_eligible':
      eligibilityStatus = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "progress.creditInformation.creditPartialEligible",
        defaultMessage: "You have not yet met the requirements for credit. Learn more about {creditLink}.",
        description: "This means that one or more requirements is not satisfied yet",
        values: {
          creditLink
        }
      });
      break;
    default:
      break;
  }
  creditCourseRequirements.requirements.forEach(requirement => {
    switch (requirement.status) {
      case 'submitted':
        requirementStatus = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [intl.formatMessage(_messages.default.verificationSubmitted), " ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
            src: _icons.CheckCircle,
            className: "text-success-500 d-inline-flex align-bottom"
          })]
        });
        break;
      case 'failed':
      case 'declined':
        requirementStatus = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [intl.formatMessage(_messages.default.verificationFailed), " ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
            src: _icons.WarningFilled,
            className: "d-inline-flex align-bottom"
          })]
        });
        break;
      case 'satisfied':
        requirementStatus = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [intl.formatMessage(_messages.default.completed), " ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
            src: _icons.CheckCircle,
            className: "text-success-500 d-inline-flex align-bottom"
          })]
        });
        break;
      default:
        requirementStatus = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [intl.formatMessage(_messages.default.upcoming), " ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
            src: _icons.WatchFilled,
            className: "text-gray-500 d-inline-flex align-bottom"
          })]
        });
    }
    requirements.push( /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "row w-100 m-0 small",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        className: "font-weight-bold",
        children: requirement.namespace === 'grade' ? `${intl.formatMessage(_messages.default.minimumGrade, {
          minGrade: Number(requirement.criteria.minGrade) * 100
        })}:` : `${requirement.displayName}:`
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ml-1",
        children: requirementStatus
      })]
    }, `requirement-${requirement.order}`));
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
      className: "h4 col-12 p-0",
      children: intl.formatMessage(_messages.default.requirementsHeader)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "small",
      children: eligibilityStatus
    }), requirements]
  });
};
CreditInformation.propTypes = {
  intl: _i18n.intlShape.isRequired
};
var _default = (0, _i18n.injectIntl)(CreditInformation);
exports.default = _default;
//# sourceMappingURL=CreditInformation.js.map