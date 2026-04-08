"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _messages = _interopRequireDefault(require("@src/course-home/outline-tab/messages"));
var _hooks = require("../hooks");
var _CompletionIcon = _interopRequireDefault(require("./CompletionIcon"));
var _SidebarUnit = _interopRequireDefault(require("./SidebarUnit"));
var _UnitIcon = require("./UnitIcon");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SidebarSequence = ({
  courseId,
  defaultOpen,
  sequence,
  activeUnitId
}) => {
  const intl = (0, _i18n.useIntl)();
  const {
    id,
    complete,
    title,
    specialExamInfo,
    unitIds,
    type,
    completionStat
  } = sequence;
  const [open, setOpen] = (0, _react.useState)(defaultOpen);
  const {
    activeSequenceId,
    units,
    isEnabledCompletionTracking
  } = (0, _hooks.useCourseOutlineSidebar)();
  const isActiveSequence = id === activeSequenceId;
  const sectionTitle = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "col-auto p-0",
      style: {
        fontSize: '1.1rem'
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CompletionIcon.default, {
        completionStat: completionStat,
        enabled: isEnabledCompletionTracking
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "col-9 d-flex flex-column flex-grow-1 ml-3 mr-auto p-0 text-left",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "align-middle text-dark-500",
        children: title
      }), specialExamInfo && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "align-middle small text-muted",
        children: specialExamInfo
      }), isEnabledCompletionTracking && /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        className: "sr-only",
        children: [", ", intl.formatMessage(complete ? _messages.default.completedAssignment : _messages.default.incompleteAssignment)]
      })]
    })]
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Collapsible, {
      className: (0, _classnames.default)('mb-2', {
        'active-section': isActiveSequence,
        'bg-info-100': isActiveSequence && !open
      }),
      styling: "card-lg text-break",
      title: sectionTitle,
      open: open,
      onToggle: () => setOpen(!open),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("ol", {
        className: "list-unstyled",
        children: unitIds.map((unitId, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_SidebarUnit.default, {
          id: unitId,
          courseId: courseId,
          sequenceId: id,
          unit: units[unitId],
          isActive: activeUnitId === unitId,
          activeUnitId: activeUnitId,
          isFirst: index === 0,
          isLocked: type === _UnitIcon.UNIT_ICON_TYPES.lock,
          isCompletionTrackingEnabled: isEnabledCompletionTracking
        }, unitId))
      })
    })
  });
};
SidebarSequence.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  defaultOpen: _propTypes.default.bool.isRequired,
  sequence: _propTypes.default.shape({
    complete: _propTypes.default.bool,
    id: _propTypes.default.string,
    title: _propTypes.default.string,
    type: _propTypes.default.string,
    specialExamInfo: _propTypes.default.string,
    unitIds: _propTypes.default.arrayOf(_propTypes.default.string),
    completionStat: _propTypes.default.shape({
      completed: _propTypes.default.number,
      total: _propTypes.default.number
    })
  }).isRequired,
  activeUnitId: _propTypes.default.string.isRequired
};
var _default = exports.default = SidebarSequence;
//# sourceMappingURL=SidebarSequence.js.map