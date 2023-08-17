"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _analytics = require("@edx/frontend-platform/analytics");

var _auth = require("@edx/frontend-platform/auth");

var _i18n = require("@edx/frontend-platform/i18n");

var _icons = require("@edx/paragon/icons");

var _paragon = require("@edx/paragon");

var _modelStore = require("../../../../generic/model-store");

var _DetailedGradesTable = _interopRequireDefault(require("./DetailedGradesTable"));

var _messages = _interopRequireDefault(require("../messages"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DetailedGrades(_ref) {
  let {
    intl
  } = _ref;
  const {
    administrator
  } = (0, _auth.getAuthenticatedUser)();
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
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
      className: "h4 mb-3",
      children: intl.formatMessage(_messages.default.detailedGrades)
    }), gradesFeatureIsPartiallyLocked && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "mb-3 small ml-0 d-inline",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
        className: "mr-1 mt-1 d-inline-flex",
        style: {
          height: '1rem',
          width: '1rem'
        },
        src: _icons.Blocked,
        "data-testid": "blocked-icon"
      }), intl.formatMessage(_messages.default.gradeSummaryLimitedAccessExplanation)]
    }), hasSectionScores && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DetailedGradesTable.default, {}), !hasSectionScores && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "small",
      children: intl.formatMessage(_messages.default.detailedGradesEmpty)
    }), overviewTabUrl && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "x-small m-0",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "progress.ungradedAlert",
        defaultMessage: "For progress on ungraded aspects of the course, view your {outlineLink}.",
        description: "Text that precede link that redirect to course outline page",
        values: {
          outlineLink
        }
      })
    })]
  });
}

DetailedGrades.propTypes = {
  intl: _i18n.intlShape.isRequired
};

var _default = (0, _i18n.injectIntl)(DetailedGrades);

exports.default = _default;
//# sourceMappingURL=DetailedGrades.js.map