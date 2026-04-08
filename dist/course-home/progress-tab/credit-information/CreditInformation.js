"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _frontendPlatform = require("@edx/frontend-platform");
var _i18n = require("@edx/frontend-platform/i18n");
var _icons = require("@openedx/paragon/icons");
var _paragon = require("@openedx/paragon");
var _hooks = require("../../../data/hooks");
var _modelStore = require("../../../generic/model-store");
var _links = require("../../../shared/links");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CreditInformation = () => {
  const intl = (0, _i18n.useIntl)();
  const courseId = (0, _hooks.useContextId)();
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
      eligibilityStatus = intl.formatMessage(_messages.default.creditNotEligibleStatus, {
        creditLink
      });
      break;
    case 'eligible':
      eligibilityStatus = intl.formatMessage(_messages.default.creditEligibleStatus, {
        dashboardLink,
        creditLink
      });
      break;
    case 'partial_eligible':
      eligibilityStatus = intl.formatMessage(_messages.default.creditPartialEligibleStatus, {
        creditLink
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
    requirements.push(/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
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
var _default = exports.default = CreditInformation;
//# sourceMappingURL=CreditInformation.js.map