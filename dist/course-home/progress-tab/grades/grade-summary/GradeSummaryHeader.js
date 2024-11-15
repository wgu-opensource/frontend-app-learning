"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _icons = require("@edx/paragon/icons");
var _messages = _interopRequireDefault(require("../messages"));
var _modelStore = require("../../../../generic/model-store");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const GradeSummaryHeader = _ref => {
  let {
    intl,
    allOfSomeAssignmentTypeIsLocked
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    gradesFeatureIsFullyLocked
  } = (0, _modelStore.useModel)('progress', courseId);
  const [showTooltip, setShowTooltip] = (0, _react.useState)(false);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "row w-100 m-0 align-items-center",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
      className: "h4 mb-3 mr-1",
      children: intl.formatMessage(_messages.default.gradeSummary)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.OverlayTrigger, {
      trigger: "click",
      placement: "top",
      show: showTooltip,
      overlay: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Popover, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Popover.Content, {
          className: "small text-dark-700",
          children: intl.formatMessage(_messages.default.gradeSummaryTooltipBody)
        })
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.IconButton, {
        onClick: () => {
          setShowTooltip(!showTooltip);
        },
        onBlur: () => {
          setShowTooltip(false);
        },
        alt: intl.formatMessage(_messages.default.gradeSummaryTooltipAlt),
        src: _icons.InfoOutline,
        iconAs: _paragon.Icon,
        className: "mb-3",
        size: "sm",
        disabled: gradesFeatureIsFullyLocked
      })
    }), !gradesFeatureIsFullyLocked && allOfSomeAssignmentTypeIsLocked && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "mb-3 small ml-0 d-inline",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
        className: "mr-1 mt-1 d-inline-flex",
        style: {
          height: '1rem',
          width: '1rem'
        },
        src: _icons.Blocked,
        "data-testid": "blocked-icon"
      }), intl.formatMessage(_messages.default.gradeSummaryLimitedAccessExplanation)]
    })]
  });
};
GradeSummaryHeader.propTypes = {
  intl: _i18n.intlShape.isRequired,
  allOfSomeAssignmentTypeIsLocked: _propTypes.default.bool.isRequired
};
var _default = (0, _i18n.injectIntl)(GradeSummaryHeader);
exports.default = _default;
//# sourceMappingURL=GradeSummaryHeader.js.map