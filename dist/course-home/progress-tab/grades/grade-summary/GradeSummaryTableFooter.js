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

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GradeSummaryTableFooter(_ref) {
  let {
    intl
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    courseGrade: {
      isPassing,
      percent
    }
  } = (0, _modelStore.useModel)('progress', courseId);
  const bgColor = isPassing ? 'bg-success-100' : 'bg-warning-100';
  const totalGrade = (percent * 100).toFixed(0);
  const isLocaleRtl = (0, _i18n.isRtl)((0, _i18n.getLocale)());
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.DataTable.TableFooter, {
    className: `border-top border-primary ${bgColor}`,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "row w-100 m-0",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        id: "weighted-grade-summary",
        className: "col-8 p-0 small",
        children: intl.formatMessage(_messages.default.weightedGradeSummary)
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        "data-testid": "gradeSummaryFooterTotalWeightedGrade",
        "aria-labelledby": "weighted-grade-summary",
        className: "col-4 p-0 text-right font-weight-bold small",
        children: [totalGrade, isLocaleRtl && '\u200f', "%"]
      })]
    })
  });
}

GradeSummaryTableFooter.propTypes = {
  intl: _i18n.intlShape.isRequired
};

var _default = (0, _i18n.injectIntl)(GradeSummaryTableFooter);

exports.default = _default;
//# sourceMappingURL=GradeSummaryTableFooter.js.map