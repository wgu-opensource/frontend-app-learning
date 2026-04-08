"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _hooks = require("../../../../data/hooks");
var _messages = _interopRequireDefault(require("../messages"));
var _modelStore = require("../../../../generic/model-store");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const GradeSummaryHeader = ({
  allOfSomeAssignmentTypeIsLocked
}) => {
  const intl = (0, _i18n.useIntl)();
  const courseId = (0, _hooks.useContextId)();
  const {
    verifiedMode,
    gradesFeatureIsFullyLocked
  } = (0, _modelStore.useModel)('progress', courseId);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Stack, {
    gap: 2,
    className: "mb-3",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Stack, {
      direction: "horizontal",
      gap: 2,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
        className: "h4 m-0",
        children: intl.formatMessage(_messages.default.gradeSummary)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.OverlayTrigger, {
        trigger: "hover",
        placement: "top",
        overlay: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Tooltip, {
          children: intl.formatMessage(_messages.default.gradeSummaryTooltipBody)
        }),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
          alt: intl.formatMessage(_messages.default.gradeSummaryTooltipAlt),
          src: _icons.InfoOutline,
          size: "sm"
        })
      })]
    }), !gradesFeatureIsFullyLocked && allOfSomeAssignmentTypeIsLocked && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Stack, {
      direction: "horizontal",
      className: "small",
      gap: 2,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
        size: "sm",
        src: _icons.Locked,
        "data-testid": "locked-icon"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: intl.formatMessage(_messages.default.gradeSummaryLimitedAccessExplanation, {
          upgradeLink: verifiedMode && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Hyperlink, {
            destination: verifiedMode.upgradeUrl,
            children: [intl.formatMessage(_messages.default.courseGradePreviewUpgradeButton), "."]
          })
        })
      })]
    })]
  });
};
GradeSummaryHeader.propTypes = {
  allOfSomeAssignmentTypeIsLocked: _propTypes.default.bool.isRequired
};
var _default = exports.default = GradeSummaryHeader;
//# sourceMappingURL=GradeSummaryHeader.js.map