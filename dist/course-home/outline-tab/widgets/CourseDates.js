"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _i18n = require("@edx/frontend-platform/i18n");
var _DateSummary = _interopRequireDefault(require("../DateSummary"));
var _messages = _interopRequireDefault(require("../messages"));
var _modelStore = require("../../../generic/model-store");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CourseDates = () => {
  const intl = (0, _i18n.useIntl)();
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    userTimezone
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    datesWidget: {
      courseDateBlocks,
      datesTabLink
    }
  } = (0, _modelStore.useModel)('outline', courseId);
  if (courseDateBlocks.length === 0) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
    className: "mb-4",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      id: "courseHome-dates",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
        className: "h4",
        children: intl.formatMessage(_messages.default.dates)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("ol", {
        className: "list-unstyled",
        children: courseDateBlocks.map(courseDateBlock => /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateSummary.default, {
          dateBlock: courseDateBlock,
          userTimezone: userTimezone
        }, courseDateBlock.title + courseDateBlock.date))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
        id: "dates-tab-link",
        className: "font-weight-bold ml-4 pl-1 small",
        href: datesTabLink,
        children: intl.formatMessage(_messages.default.allDates)
      })]
    })
  });
};
var _default = exports.default = CourseDates;
//# sourceMappingURL=CourseDates.js.map