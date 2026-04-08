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
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
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