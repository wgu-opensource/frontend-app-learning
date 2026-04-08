"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _i18n = require("@edx/frontend-platform/i18n");
var _messages = _interopRequireDefault(require("../messages"));
var _UnitIcon = _interopRequireWildcard(require("./UnitIcon"));
var _UnitLinkWrapper = _interopRequireDefault(require("./UnitLinkWrapper"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SidebarUnit = ({
  id,
  courseId,
  sequenceId,
  isFirst,
  unit,
  isActive,
  isLocked,
  activeUnitId,
  isCompletionTrackingEnabled
}) => {
  const intl = (0, _i18n.useIntl)();
  const {
    complete,
    title,
    icon = _UnitIcon.UNIT_ICON_TYPES.other
  } = unit;
  const iconType = isLocked ? _UnitIcon.UNIT_ICON_TYPES.lock : icon;
  const completeAndEnabled = complete && isCompletionTrackingEnabled;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
    className: (0, _classnames.default)({
      'bg-info-100': isActive,
      'border-top border-light': !isFirst
    }),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_UnitLinkWrapper.default, {
      sequenceId,
      activeUnitId,
      id,
      courseId,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "col-auto p-0",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_UnitIcon.default, {
          type: iconType,
          isCompleted: completeAndEnabled
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "col-10 p-0 ml-3 text-break",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "align-middle",
          children: title
        }), isCompletionTrackingEnabled && /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          className: "sr-only",
          children: [", ", intl.formatMessage(complete ? _messages.default.completedUnit : _messages.default.incompleteUnit)]
        })]
      })]
    })
  });
};
SidebarUnit.propTypes = {
  id: _propTypes.default.string.isRequired,
  isFirst: _propTypes.default.bool.isRequired,
  unit: _propTypes.default.shape({
    complete: _propTypes.default.bool,
    icon: _propTypes.default.string,
    id: _propTypes.default.string,
    title: _propTypes.default.string,
    type: _propTypes.default.string
  }).isRequired,
  isActive: _propTypes.default.bool.isRequired,
  isLocked: _propTypes.default.bool.isRequired,
  courseId: _propTypes.default.string.isRequired,
  sequenceId: _propTypes.default.string.isRequired,
  activeUnitId: _propTypes.default.string.isRequired,
  isCompletionTrackingEnabled: _propTypes.default.bool.isRequired
};
var _default = exports.default = SidebarUnit;
//# sourceMappingURL=SidebarUnit.js.map