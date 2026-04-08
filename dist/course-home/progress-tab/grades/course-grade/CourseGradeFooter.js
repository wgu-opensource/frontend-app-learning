"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _icons = require("@openedx/paragon/icons");
var _paragon = require("@openedx/paragon");
var _hooks = require("../../../../data/hooks");
var _modelStore = require("../../../../generic/model-store");
var _GradeRangeTooltip = _interopRequireDefault(require("./GradeRangeTooltip"));
var _messages = _interopRequireDefault(require("../messages"));
var _utils = require("../../utils");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ResponsiveText = ({
  wideScreen,
  children,
  hasLetterGrades,
  passingGrade
}) => {
  const className = wideScreen ? 'h4 m-0 align-bottom' : 'h5 align-bottom';
  const iconSize = wideScreen ? 'h3' : 'h4';
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
    className: className,
    children: [children, hasLetterGrades && /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      style: {
        whiteSpace: 'nowrap'
      },
      children: ["\xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)(_GradeRangeTooltip.default, {
        iconButtonClassName: iconSize,
        passingGrade: passingGrade
      })]
    })]
  });
};
const NoticeRow = ({
  wideScreen,
  icon,
  bgClass,
  message
}) => {
  const textClass = wideScreen ? 'h4 m-0 align-bottom' : 'h5 align-bottom';
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `row w-100 m-0 px-4 py-3 py-md-4 rounded-bottom ${bgClass}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "col-auto p-0",
      children: icon
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "col-11 pl-2 px-0",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: textClass,
        children: message
      })
    })]
  });
};
const CourseGradeFooter = ({
  passingGrade
}) => {
  const intl = (0, _i18n.useIntl)();
  const courseId = (0, _hooks.useContextId)();
  const {
    assignmentTypeGradeSummary,
    courseGrade: {
      isPassing,
      letterGrade
    },
    gradingPolicy: {
      gradeRange
    }
  } = (0, _modelStore.useModel)('progress', courseId);
  const latestDueDate = (0, _utils.getLatestDueDateInFuture)(assignmentTypeGradeSummary);
  const wideScreen = (0, _paragon.useWindowSize)().width >= _paragon.breakpoints.medium.minWidth;
  const hasLetterGrades = Object.keys(gradeRange).length > 1;

  // build footer text
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
  const passingIcon = isPassing ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
    src: _icons.CheckCircle,
    className: "text-success-300 d-inline-flex align-bottom"
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
    src: _icons.WarningFilled,
    className: "d-inline-flex align-bottom"
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(NoticeRow, {
      wideScreen: wideScreen,
      icon: passingIcon,
      bgClass: isPassing ? 'bg-success-100' : 'bg-warning-100',
      message: /*#__PURE__*/(0, _jsxRuntime.jsx)(ResponsiveText, {
        wideScreen: wideScreen,
        hasLetterGrades: hasLetterGrades,
        passingGrade: passingGrade,
        children: footerText
      })
    }), latestDueDate && /*#__PURE__*/(0, _jsxRuntime.jsx)(NoticeRow, {
      wideScreen: wideScreen,
      icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
        src: _icons.WarningFilled,
        className: "d-inline-flex align-bottom"
      }),
      bgClass: "bg-warning-100",
      message: intl.formatMessage(_messages.default.courseGradeFooterDueDateNotice, {
        dueDate: intl.formatDate(latestDueDate, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          timeZoneName: 'short'
        })
      })
    })]
  });
};
ResponsiveText.propTypes = {
  wideScreen: _propTypes.default.bool.isRequired,
  children: _propTypes.default.node.isRequired,
  hasLetterGrades: _propTypes.default.bool.isRequired,
  passingGrade: _propTypes.default.number.isRequired
};
NoticeRow.propTypes = {
  wideScreen: _propTypes.default.bool.isRequired,
  icon: _propTypes.default.element.isRequired,
  bgClass: _propTypes.default.string.isRequired,
  message: _propTypes.default.string.isRequired
};
CourseGradeFooter.propTypes = {
  passingGrade: _propTypes.default.number.isRequired
};
var _default = exports.default = CourseGradeFooter;
//# sourceMappingURL=CourseGradeFooter.js.map