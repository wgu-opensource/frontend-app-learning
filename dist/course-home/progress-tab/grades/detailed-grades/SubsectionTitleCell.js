"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _analytics = require("@edx/frontend-platform/analytics");

var _auth = require("@edx/frontend-platform/auth");

var _i18n = require("@edx/frontend-platform/i18n");

var _paragon = require("@edx/paragon");

var _icons = require("@edx/paragon/icons");

var _messages = _interopRequireDefault(require("../messages"));

var _modelStore = require("../../../../generic/model-store");

var _ProblemScoreDrawer = _interopRequireDefault(require("./ProblemScoreDrawer"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SubsectionTitleCell(_ref) {
  let {
    intl,
    subsection
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    org
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    gradesFeatureIsFullyLocked
  } = (0, _modelStore.useModel)('progress', courseId);
  const {
    blockKey,
    displayName,
    problemScores,
    url
  } = subsection;
  const {
    administrator
  } = (0, _auth.getAuthenticatedUser)();

  const logSubsectionClicked = () => {
    (0, _analytics.sendTrackEvent)('edx.ui.lms.course_progress.detailed_grades_assignment.clicked', {
      org_key: org,
      courserun_key: courseId,
      is_staff: administrator,
      assignment_block_key: blockKey
    });
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Collapsible.Advanced, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Row, {
      className: "w-100 m-0",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Collapsible.Trigger, {
        className: "mr-1 position-absolute",
        "aria-label": intl.formatMessage(_messages.default.problemScoreToggleAltText, {
          subsectionTitle: displayName
        }),
        tabIndex: gradesFeatureIsFullyLocked ? '-1' : '0',
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Collapsible.Visible, {
          whenClosed: true,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
            src: _icons.ArrowDropDown
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Collapsible.Visible, {
          whenOpen: true,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
            src: _icons.ArrowDropUp
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        className: "small d-inline ml-4 pl-1",
        children: [gradesFeatureIsFullyLocked || subsection.learnerHasAccess ? '' : /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
          id: `detailedGradesBlockedIcon${subsection.blockKey}`,
          "aria-label": intl.formatMessage(_messages.default.noAccessToSubsection, {
            displayName
          }),
          className: "mr-1 mt-1 d-inline-flex",
          style: {
            height: '1rem',
            width: '1rem'
          },
          src: _icons.Blocked,
          "data-testid": "blocked-icon"
        }), url ? /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
          href: url,
          className: "muted-link small",
          onClick: logSubsectionClicked,
          tabIndex: gradesFeatureIsFullyLocked ? '-1' : '0',
          "aria-labelledby": `detailedGradesBlockedIcon${subsection.blockKey}`,
          children: displayName
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "greyed-out small",
          children: displayName
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Collapsible.Body, {
      className: "d-flex w-100",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "col",
        children: [subsection.override && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "row w-100 m-0 x-small ml-4 pt-2 pl-1 text-gray-700 flex-nowrap",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
              src: _icons.Info,
              className: "x-small mr-1 text-primary-500",
              style: {
                height: '1.3em',
                width: '1.3em'
              }
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            children: intl.formatMessage(_messages.default.sectionGradeOverridden)
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProblemScoreDrawer.default, {
          problemScores: problemScores,
          subsection: subsection
        })]
      })
    })]
  });
}

SubsectionTitleCell.propTypes = {
  intl: _i18n.intlShape.isRequired,
  subsection: _propTypes.default.shape({
    blockKey: _propTypes.default.string.isRequired,
    displayName: _propTypes.default.string.isRequired,
    learnerHasAccess: _propTypes.default.bool.isRequired,
    override: _propTypes.default.shape({
      system: _propTypes.default.string,
      reason: _propTypes.default.string
    }),
    problemScores: _propTypes.default.arrayOf(_propTypes.default.shape({
      earned: _propTypes.default.number.isRequired,
      possible: _propTypes.default.number.isRequired
    })).isRequired,
    url: _propTypes.default.string
  }).isRequired
};

var _default = (0, _i18n.injectIntl)(SubsectionTitleCell);

exports.default = _default;
//# sourceMappingURL=SubsectionTitleCell.js.map