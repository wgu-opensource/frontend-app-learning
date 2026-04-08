"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _analytics = require("@edx/frontend-platform/analytics");
var _auth = require("@edx/frontend-platform/auth");
var _i18n = require("@edx/frontend-platform/i18n");
var _icons = require("@openedx/paragon/icons");
var _paragon = require("@openedx/paragon");
var _hooks = require("../../../../data/hooks");
var _modelStore = require("../../../../generic/model-store");
var _utils = require("../../utils");
var _DetailedGradesTable = _interopRequireDefault(require("./DetailedGradesTable"));
var _messages = _interopRequireDefault(require("../messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DetailedGrades = () => {
  const intl = (0, _i18n.useIntl)();
  const {
    administrator
  } = (0, _auth.getAuthenticatedUser)();
  const courseId = (0, _hooks.useContextId)();
  const {
    org,
    tabs
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    gradesFeatureIsFullyLocked,
    gradesFeatureIsPartiallyLocked,
    sectionScores
  } = (0, _modelStore.useModel)('progress', courseId);
  const hasSectionScores = sectionScores.length > 0;
  const emptyTableMsg = (0, _utils.showUngradedAssignments)() ? _messages.default.detailedGradesEmpty : _messages.default.detailedGradesEmptyOnlyGraded;
  const logOutlineLinkClick = () => {
    (0, _analytics.sendTrackEvent)('edx.ui.lms.course_progress.detailed_grades.course_outline_link.clicked', {
      org_key: org,
      courserun_key: courseId,
      is_staff: administrator
    });
  };
  const overviewTab = tabs.find(tab => tab.slug === 'outline');
  const overviewTabUrl = overviewTab && overviewTab.url;
  const outlineLink = overviewTabUrl && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
    variant: "muted",
    isInline: true,
    destination: overviewTabUrl,
    onClick: logOutlineLinkClick,
    tabIndex: gradesFeatureIsFullyLocked ? '-1' : '0',
    children: intl.formatMessage(_messages.default.courseOutline)
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
    className: "text-dark-700",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
      className: "h4",
      children: intl.formatMessage(_messages.default.detailedGrades)
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("ul", {
      className: "micro mb-3 pl-3 text-gray-700",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("b", {
          children: [intl.formatMessage(_messages.default.practiceScoreLabel), " "]
        }), intl.formatMessage(_messages.default.practiceScoreInfoText)]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("b", {
          children: [intl.formatMessage(_messages.default.gradedScoreLabel), " "]
        }), intl.formatMessage(_messages.default.gradedScoreInfoText)]
      })]
    }), gradesFeatureIsPartiallyLocked && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "mb-3 small ml-0 d-inline",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
        className: "mr-1 mt-1 d-inline-flex",
        style: {
          height: '1rem',
          width: '1rem'
        },
        src: _icons.Locked,
        "data-testid": "locked-icon"
      }), intl.formatMessage(_messages.default.gradeSummaryLimitedAccessExplanation, {
        upgradeLink: ''
      })]
    }), hasSectionScores && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DetailedGradesTable.default, {}), !hasSectionScores && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "small",
      children: intl.formatMessage(emptyTableMsg)
    }), overviewTabUrl && !(0, _utils.showUngradedAssignments)() && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "x-small m-0",
      children: intl.formatMessage(_messages.default.ungradedAlert, {
        outlineLink
      })
    })]
  });
};
var _default = exports.default = DetailedGrades;
//# sourceMappingURL=DetailedGrades.js.map