"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _icons = require("@edx/paragon/icons");
var _paragon = require("@edx/paragon");
var _modelStore = require("../../../../generic/model-store");
var _GradeRangeTooltip = _interopRequireDefault(require("./GradeRangeTooltip"));
var _messages = _interopRequireDefault(require("../messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CourseGradeFooter = _ref => {
  let {
    intl,
    passingGrade
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    courseGrade: {
      isPassing,
      letterGrade
    },
    gradingPolicy: {
      gradeRange
    }
  } = (0, _modelStore.useModel)('progress', courseId);
  const wideScreen = (0, _paragon.useWindowSize)().width >= _paragon.breakpoints.medium.minWidth;
  const hasLetterGrades = Object.keys(gradeRange).length > 1; // A pass/fail course will only have one key
  let footerText = intl.formatMessage(_messages.default.courseGradeFooterNonPassing, {
    passingGrade
  });
  if (isPassing) {
    if (hasLetterGrades) {
      const minGradeRangeCutoff = gradeRange[letterGrade] * 100;
      const possibleMaxGradeRangeValues = [...Object.values(gradeRange).filter(grade => grade * 100 > minGradeRangeCutoff)];
      const maxGradeRangeCutoff = possibleMaxGradeRangeValues.length ? Math.min(...possibleMaxGradeRangeValues) * 100 : 100;
      footerText = intl.formatMessage(_messages.default.courseGradeFooterPassingWithGrade, {
        letterGrade,
        minGrade: minGradeRangeCutoff.toFixed(0),
        maxGrade: maxGradeRangeCutoff.toFixed(0)
      });
    } else {
      footerText = intl.formatMessage(_messages.default.courseGradeFooterGenericPassing);
    }
  }
  const icon = isPassing ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
    src: _icons.CheckCircle,
    className: "text-success-300 d-inline-flex align-bottom"
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
    src: _icons.WarningFilled,
    className: "d-inline-flex align-bottom"
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `row w-100 m-0 px-4 py-3 py-md-4 rounded-bottom ${isPassing ? 'bg-success-100' : 'bg-warning-100'}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "col-auto p-0",
      children: icon
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "col-11 pl-2 px-0",
      children: [!wideScreen && /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        className: "h5 align-bottom",
        children: [footerText, hasLetterGrades && /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          style: {
            whiteSpace: 'nowrap'
          },
          children: ["\xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)(_GradeRangeTooltip.default, {
            iconButtonClassName: "h4",
            passingGrade: passingGrade
          })]
        })]
      }), wideScreen && /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        className: "h4 m-0 align-bottom",
        children: [footerText, hasLetterGrades && /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          style: {
            whiteSpace: 'nowrap'
          },
          children: ["\xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)(_GradeRangeTooltip.default, {
            iconButtonClassName: "h3",
            passingGrade: passingGrade
          })]
        })]
      })]
    })]
  });
};
CourseGradeFooter.propTypes = {
  intl: _i18n.intlShape.isRequired,
  passingGrade: _propTypes.default.number.isRequired
};
var _default = (0, _i18n.injectIntl)(CourseGradeFooter);
exports.default = _default;
//# sourceMappingURL=CourseGradeFooter.js.map