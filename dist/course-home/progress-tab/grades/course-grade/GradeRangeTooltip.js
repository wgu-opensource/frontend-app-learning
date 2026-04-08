"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _icons = require("@openedx/paragon/icons");
var _paragon = require("@openedx/paragon");
var _hooks = require("../../../../data/hooks");
var _modelStore = require("../../../../generic/model-store");
var _messages = _interopRequireDefault(require("../messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const GradeRangeTooltip = ({
  iconButtonClassName,
  passingGrade
}) => {
  const intl = (0, _i18n.useIntl)();
  const courseId = (0, _hooks.useContextId)();
  const {
    gradesFeatureIsFullyLocked,
    gradingPolicy: {
      gradeRange
    }
  } = (0, _modelStore.useModel)('progress', courseId);
  const [showTooltip, setShowTooltip] = (0, _react.useState)(false);
  const orderedGradeRange = Object.entries(gradeRange).sort((a, b) => gradeRange[b[0]] - gradeRange[a[0]]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.OverlayTrigger, {
    placement: "top",
    trigger: "click",
    show: showTooltip,
    overlay: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Popover, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Popover.Content, {
        className: "px-3",
        children: [intl.formatMessage(_messages.default.courseGradeRangeTooltip), /*#__PURE__*/(0, _jsxRuntime.jsxs)("ul", {
          className: "list-unstyled m-0",
          children: [orderedGradeRange.map((range, index) => {
            if (index === 0) {
              return /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
                children: [range[0], ": ", (range[1] * 100).toFixed(0), "%-100%"]
              }, range[0]);
            }
            const previousGrade = orderedGradeRange[index - 1];
            return /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
              children: [range[0], ": ", (range[1] * 100).toFixed(0), "%-", (previousGrade[1] * 100).toFixed(0), "%"]
            }, range[0]);
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
            children: ["F: ", '<', passingGrade, "%"]
          })]
        })]
      })
    }),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.IconButton, {
      onClick: () => setShowTooltip(!showTooltip),
      onBlur: () => setShowTooltip(false),
      alt: intl.formatMessage(_messages.default.gradeRangeTooltipAlt),
      className: `mb-0 mt-n1 ${iconButtonClassName}`,
      src: _icons.InfoOutline,
      iconAs: _paragon.Icon,
      size: "inline",
      disabled: gradesFeatureIsFullyLocked
    })
  });
};
GradeRangeTooltip.defaultProps = {
  iconButtonClassName: ''
};
GradeRangeTooltip.propTypes = {
  iconButtonClassName: _propTypes.default.string,
  passingGrade: _propTypes.default.number.isRequired
};
var _default = exports.default = GradeRangeTooltip;
//# sourceMappingURL=GradeRangeTooltip.js.map