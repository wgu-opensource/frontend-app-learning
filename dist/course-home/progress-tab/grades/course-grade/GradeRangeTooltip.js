"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _icons = require("@edx/paragon/icons");
var _paragon = require("@edx/paragon");
var _modelStore = require("../../../../generic/model-store");
var _messages = _interopRequireDefault(require("../messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const GradeRangeTooltip = _ref => {
  let {
    intl,
    iconButtonClassName,
    passingGrade
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
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
  intl: _i18n.intlShape.isRequired,
  passingGrade: _propTypes.default.number.isRequired
};
var _default = (0, _i18n.injectIntl)(GradeRangeTooltip);
exports.default = _default;
//# sourceMappingURL=GradeRangeTooltip.js.map