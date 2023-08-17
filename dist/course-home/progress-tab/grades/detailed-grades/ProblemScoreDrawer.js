"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("@edx/frontend-platform/i18n");

var _messages = _interopRequireDefault(require("../messages"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ProblemScoreDrawer(_ref) {
  let {
    intl,
    problemScores,
    subsection
  } = _ref;
  const isLocaleRtl = (0, _i18n.isRtl)((0, _i18n.getLocale)());
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
    className: "row w-100 m-0 x-small ml-4 pt-2 pl-1 text-gray-700 flex-nowrap",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      id: "problem-score-label",
      className: "col-auto p-0",
      children: intl.formatMessage(_messages.default.problemScoreLabel)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: (0, _classnames.default)('col', 'p-0', {
        'greyed-out': !subsection.learnerHasAccess
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
        className: "list-unstyled row w-100 m-0",
        "aria-labelledby": "problem-score-label",
        children: problemScores.map(problemScore => /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
          className: "ml-3",
          children: [problemScore.earned, isLocaleRtl ? '\\' : '/', problemScore.possible]
        }))
      })
    })]
  });
}

ProblemScoreDrawer.propTypes = {
  intl: _i18n.intlShape.isRequired,
  problemScores: _propTypes.default.arrayOf(_propTypes.default.shape({
    earned: _propTypes.default.number.isRequired,
    possible: _propTypes.default.number.isRequired
  })).isRequired,
  subsection: _propTypes.default.shape({
    learnerHasAccess: _propTypes.default.bool
  }).isRequired
};

var _default = (0, _i18n.injectIntl)(ProblemScoreDrawer);

exports.default = _default;
//# sourceMappingURL=ProblemScoreDrawer.js.map