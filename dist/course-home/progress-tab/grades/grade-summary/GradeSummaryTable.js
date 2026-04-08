"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _hooks = require("../../../../data/hooks");
var _modelStore = require("../../../../generic/model-store");
var _AssignmentTypeCell = _interopRequireDefault(require("./AssignmentTypeCell"));
var _DroppableAssignmentFootnote = _interopRequireDefault(require("./DroppableAssignmentFootnote"));
var _GradeSummaryTableFooter = _interopRequireDefault(require("./GradeSummaryTableFooter"));
var _messages = _interopRequireDefault(require("../messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const GradeSummaryTable = ({
  setAllOfSomeAssignmentTypeIsLocked
}) => {
  const intl = (0, _i18n.useIntl)();
  const courseId = (0, _hooks.useContextId)();
  const {
    assignmentTypeGradeSummary,
    gradesFeatureIsFullyLocked,
    sectionScores
  } = (0, _modelStore.useModel)('progress', courseId);
  const footnotes = [];
  const getFootnoteId = assignment => {
    const footnoteId = assignment.shortLabel ? assignment.shortLabel : assignment.type;
    return footnoteId.replace(/[^A-Za-z0-9.-_]+/g, '-');
  };
  const getGradePercent = grade => {
    if (Number.isInteger(grade * 100)) {
      return (grade * 100).toFixed(0);
    }
    return (grade * 100).toFixed(2);
  };
  const hasNoAccessToAssignmentsOfType = assignmentType => {
    const subsectionAssignmentsOfType = sectionScores.map(chapter => chapter.subsections.filter(subsection => subsection.assignmentType === assignmentType && subsection.hasGradedAssignment && (subsection.numPointsPossible > 0 || subsection.numPointsEarned > 0))).flat();
    if (subsectionAssignmentsOfType.length) {
      const noAccessToAssignmentsOfType = !subsectionAssignmentsOfType.some(subsection => subsection.learnerHasAccess === true);
      if (noAccessToAssignmentsOfType) {
        setAllOfSomeAssignmentTypeIsLocked(true);
        return true;
      }
    }
    return false;
  };
  const gradeSummaryData = assignmentTypeGradeSummary.map(assignment => {
    const {
      averageGrade,
      numDroppable,
      type: assignmentType,
      weight,
      weightedGrade
    } = assignment;
    let footnoteId = '';
    let footnoteMarker;
    if (numDroppable > 0) {
      footnoteId = getFootnoteId(assignment);
      footnotes.push({
        id: footnoteId,
        numDroppable,
        assignmentType
      });
      footnoteMarker = footnotes.length;
    }
    const locked = !gradesFeatureIsFullyLocked && hasNoAccessToAssignmentsOfType(assignmentType);
    const isLocaleRtl = (0, _i18n.isRtl)((0, _i18n.getLocale)());
    let weightedGradeDisplay = `${getGradePercent(weightedGrade)}${isLocaleRtl ? '\u200f' : ''}%`;
    let gradeDisplay = `${getGradePercent(averageGrade)}${isLocaleRtl ? '\u200f' : ''}%`;
    if (assignment.hasHiddenContribution === 'all') {
      gradeDisplay = /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.Lock, {
        "data-testid": "lock-icon"
      });
      weightedGradeDisplay = /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.Lock, {
        "data-testid": "lock-icon"
      });
    } else if (assignment.hasHiddenContribution === 'some') {
      gradeDisplay = `${getGradePercent(averageGrade)}${isLocaleRtl ? '\u200f' : ''}% + ${intl.formatMessage(_messages.default.hiddenScoreLabel)}`;
      weightedGradeDisplay = `${getGradePercent(weightedGrade)}${isLocaleRtl ? '\u200f' : ''}% + ${intl.formatMessage(_messages.default.hiddenScoreLabel)}`;
    }
    return {
      type: {
        footnoteId,
        footnoteMarker,
        type: assignmentType,
        locked
      },
      weight: {
        weight: `${(weight * 100).toFixed(0)}${isLocaleRtl ? '\u200f' : ''}%`,
        locked
      },
      grade: {
        grade: gradeDisplay,
        locked
      },
      weightedGrade: {
        weightedGrade: weightedGradeDisplay,
        locked
      }
    };
  });
  const getAssignmentTypeCell = value => /*#__PURE__*/(0, _jsxRuntime.jsx)(_AssignmentTypeCell.default, {
    assignmentType: value.type // eslint-disable-line react/prop-types
    ,
    footnoteId: value.footnoteId // eslint-disable-line react/prop-types
    ,
    footnoteMarker: value.footnoteMarker // eslint-disable-line react/prop-types
    ,
    locked: value.locked // eslint-disable-line react/prop-types
  });
  const getCell = (locked, value) => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: locked ? 'greyed-out' : '',
    children: value
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("ul", {
      className: "micro mb-3 pl-3 text-gray-700",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("b", {
          children: [intl.formatMessage(_messages.default.hiddenScoreLabel), ": "]
        }), intl.formatMessage(_messages.default.hiddenScoreInfoText)]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("b", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.Lock, {
            style: {
              height: '15px'
            }
          }), ": "]
        }), ` ${intl.formatMessage(_messages.default.hiddenScoreLockInfoText)}`]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.DataTable, {
      data: gradeSummaryData,
      itemCount: gradeSummaryData.length,
      columns: [{
        Header: `${intl.formatMessage(_messages.default.assignmentType)}`,
        accessor: 'type',
        Cell: ({
          value
        }) => getAssignmentTypeCell(value),
        headerClassName: 'h5 mb-0'
      }, {
        Header: `${intl.formatMessage(_messages.default.weight)}`,
        accessor: 'weight',
        headerClassName: 'justify-content-end h5 mb-0',
        Cell: ({
          value
        }) => getCell(value.locked, value.weight),
        cellClassName: 'text-right small'
      }, {
        Header: `${intl.formatMessage(_messages.default.grade)}`,
        accessor: 'grade',
        headerClassName: 'justify-content-end h5 mb-0',
        Cell: ({
          value
        }) => getCell(value.locked, value.grade),
        cellClassName: 'text-right small'
      }, {
        Header: `${intl.formatMessage(_messages.default.weightedGrade)}`,
        accessor: 'weightedGrade',
        headerClassName: 'justify-content-end h5 mb-0 text-right',
        Cell: ({
          value
        }) => getCell(value.locked, value.weightedGrade),
        cellClassName: 'text-right font-weight-bold small'
      }],
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.DataTable.Table, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_GradeSummaryTableFooter.default, {})]
    }), footnotes && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DroppableAssignmentFootnote.default, {
      footnotes: footnotes
    })]
  });
};
GradeSummaryTable.propTypes = {
  setAllOfSomeAssignmentTypeIsLocked: _propTypes.default.func.isRequired
};
var _default = exports.default = GradeSummaryTable;
//# sourceMappingURL=GradeSummaryTable.js.map