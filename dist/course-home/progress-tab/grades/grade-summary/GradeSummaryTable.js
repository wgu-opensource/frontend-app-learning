"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _modelStore = require("../../../../generic/model-store");
var _AssignmentTypeCell = _interopRequireDefault(require("./AssignmentTypeCell"));
var _DroppableAssignmentFootnote = _interopRequireDefault(require("./DroppableAssignmentFootnote"));
var _GradeSummaryTableFooter = _interopRequireDefault(require("./GradeSummaryTableFooter"));
var _messages = _interopRequireDefault(require("../messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const GradeSummaryTable = _ref => {
  let {
    intl,
    setAllOfSomeAssignmentTypeIsLocked
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    gradingPolicy: {
      assignmentPolicies
    },
    gradesFeatureIsFullyLocked,
    sectionScores
  } = (0, _modelStore.useModel)('progress', courseId);
  const footnotes = [];
  const getFootnoteId = assignment => {
    const footnoteId = assignment.shortLabel ? assignment.shortLabel : assignment.type;
    return footnoteId.replace(/[^A-Za-z0-9.-_]+/g, '-');
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
  const gradeSummaryData = assignmentPolicies.map(assignment => {
    let footnoteId = '';
    let footnoteMarker;
    if (assignment.numDroppable > 0) {
      footnoteId = getFootnoteId(assignment);
      footnotes.push({
        id: footnoteId,
        numDroppable: assignment.numDroppable,
        assignmentType: assignment.type
      });
      footnoteMarker = footnotes.length;
    }
    const locked = !gradesFeatureIsFullyLocked && hasNoAccessToAssignmentsOfType(assignment.type);
    const isLocaleRtl = (0, _i18n.isRtl)((0, _i18n.getLocale)());
    return {
      type: {
        footnoteId,
        footnoteMarker,
        type: assignment.type,
        locked
      },
      weight: {
        weight: `${(assignment.weight * 100).toFixed(0)}${isLocaleRtl ? '\u200f' : ''}%`,
        locked
      },
      grade: {
        grade: `${(assignment.averageGrade * 100).toFixed(0)}${isLocaleRtl ? '\u200f' : ''}%`,
        locked
      },
      weightedGrade: {
        weightedGrade: `${(assignment.weightedGrade * 100).toFixed(0)}${isLocaleRtl ? '\u200f' : ''}%`,
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
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.DataTable, {
      data: gradeSummaryData,
      itemCount: gradeSummaryData.length,
      columns: [{
        Header: `${intl.formatMessage(_messages.default.assignmentType)}`,
        accessor: 'type',
        Cell: _ref2 => {
          let {
            value
          } = _ref2;
          return getAssignmentTypeCell(value);
        },
        headerClassName: 'h5 mb-0'
      }, {
        Header: `${intl.formatMessage(_messages.default.weight)}`,
        accessor: 'weight',
        headerClassName: 'justify-content-end h5 mb-0',
        Cell: _ref3 => {
          let {
            value
          } = _ref3;
          return getCell(value.locked, value.weight);
        },
        cellClassName: 'text-right small'
      }, {
        Header: `${intl.formatMessage(_messages.default.grade)}`,
        accessor: 'grade',
        headerClassName: 'justify-content-end h5 mb-0',
        Cell: _ref4 => {
          let {
            value
          } = _ref4;
          return getCell(value.locked, value.grade);
        },
        cellClassName: 'text-right small'
      }, {
        Header: `${intl.formatMessage(_messages.default.weightedGrade)}`,
        accessor: 'weightedGrade',
        headerClassName: 'justify-content-end h5 mb-0 text-right',
        Cell: _ref5 => {
          let {
            value
          } = _ref5;
          return getCell(value.locked, value.weightedGrade);
        },
        cellClassName: 'text-right font-weight-bold small'
      }],
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.DataTable.Table, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_GradeSummaryTableFooter.default, {})]
    }), footnotes && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DroppableAssignmentFootnote.default, {
      footnotes: footnotes
    })]
  });
};
GradeSummaryTable.propTypes = {
  intl: _i18n.intlShape.isRequired,
  setAllOfSomeAssignmentTypeIsLocked: _propTypes.default.func.isRequired
};
var _default = (0, _i18n.injectIntl)(GradeSummaryTable);
exports.default = _default;
//# sourceMappingURL=GradeSummaryTable.js.map