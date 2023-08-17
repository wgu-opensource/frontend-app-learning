"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _i18n = require("@edx/frontend-platform/i18n");

var _paragon = require("@edx/paragon");

var _modelStore = require("../../../../generic/model-store");

var _messages = _interopRequireDefault(require("../messages"));

var _SubsectionTitleCell = _interopRequireDefault(require("./SubsectionTitleCell"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DetailedGradesTable(_ref) {
  let {
    intl
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    sectionScores
  } = (0, _modelStore.useModel)('progress', courseId);
  const isLocaleRtl = (0, _i18n.isRtl)((0, _i18n.getLocale)());
  return sectionScores.map(chapter => {
    const subsectionScores = chapter.subsections.filter(subsection => !!(subsection.hasGradedAssignment && subsection.showGrades && (subsection.numPointsPossible > 0 || subsection.numPointsEarned > 0)));

    if (subsectionScores.length === 0) {
      return null;
    }

    const detailedGradesData = subsectionScores.map(subsection => ({
      subsectionTitle: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SubsectionTitleCell.default, {
        subsection: subsection
      }),
      score: /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        className: subsection.learnerHasAccess ? '' : 'greyed-out',
        children: [subsection.numPointsEarned, isLocaleRtl ? '\\' : '/', subsection.numPointsPossible]
      })
    }));
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "my-3",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.DataTable, {
        data: detailedGradesData,
        itemCount: detailedGradesData.length,
        columns: [{
          Header: chapter.displayName,
          accessor: 'subsectionTitle',
          headerClassName: 'h5 mb-0',
          cellClassName: 'mw-100'
        }, {
          Header: `${intl.formatMessage(_messages.default.score)}`,
          accessor: 'score',
          headerClassName: 'justify-content-end h5 mb-0',
          cellClassName: 'align-top text-right small'
        }],
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.DataTable.Table, {})
      })
    }, `${chapter.displayName}-grades-table`);
  });
}

DetailedGradesTable.propTypes = {
  intl: _i18n.intlShape.isRequired
};

var _default = (0, _i18n.injectIntl)(DetailedGradesTable);

exports.default = _default;
//# sourceMappingURL=DetailedGradesTable.js.map