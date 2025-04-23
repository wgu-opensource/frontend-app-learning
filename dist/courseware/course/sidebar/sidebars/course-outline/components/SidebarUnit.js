"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _reactRouterDom = require("react-router-dom");
var _reactRedux = require("react-redux");
var _i18n = require("@edx/frontend-platform/i18n");
var _analytics = require("@edx/frontend-platform/analytics");
var _data = require("@src/courseware/data");
var _selectors = require("@src/courseware/data/selectors");
var _messages = _interopRequireDefault(require("../messages"));
var _UnitIcon = _interopRequireWildcard(require("./UnitIcon"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SidebarUnit = _ref => {
  let {
    id,
    intl,
    courseId,
    sequenceId,
    isFirst,
    unit,
    isActive,
    isLocked,
    activeUnitId
  } = _ref;
  const {
    complete,
    title,
    icon = _UnitIcon.UNIT_ICON_TYPES.other
  } = unit;
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    sequences = {}
  } = (0, _reactRedux.useSelector)(_selectors.getCourseOutline);
  const logEvent = (eventName, widgetPlacement) => {
    const findSequenceByUnitId = unitId => Object.values(sequences).find(seq => seq.unitIds.includes(unitId));
    const activeSequence = findSequenceByUnitId(activeUnitId);
    const targetSequence = findSequenceByUnitId(id);
    const payload = {
      id: activeUnitId,
      current_tab: activeSequence.unitIds.indexOf(activeUnitId) + 1,
      tab_count: activeSequence.unitIds.length,
      target_id: id,
      target_tab: targetSequence.unitIds.indexOf(id) + 1,
      widget_placement: widgetPlacement
    };
    if (activeSequence.id !== targetSequence.id) {
      payload.target_tab_count = targetSequence.unitIds.length;
    }
    (0, _analytics.sendTrackEvent)(eventName, payload);
    (0, _analytics.sendTrackingLogEvent)(eventName, payload);
  };
  const handleClick = () => {
    logEvent('edx.ui.lms.sequence.tab_selected', 'left');
    dispatch((0, _data.checkBlockCompletion)(courseId, sequenceId, activeUnitId));
  };
  const iconType = isLocked ? _UnitIcon.UNIT_ICON_TYPES.lock : icon;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
    className: (0, _classnames.default)({
      'bg-info-100': isActive,
      'border-top border-light': !isFirst
    }),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouterDom.Link, {
      to: `/course/${courseId}/${sequenceId}/${id}`,
      className: "row w-100 m-0 d-flex align-items-center text-gray-700",
      onClick: handleClick,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "col-auto p-0",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_UnitIcon.default, {
          type: iconType,
          isCompleted: complete
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "col-10 p-0 ml-3 text-break",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "align-middle",
          children: title
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          className: "sr-only",
          children: [", ", intl.formatMessage(complete ? _messages.default.completedUnit : _messages.default.incompleteUnit)]
        })]
      })]
    })
  });
};
SidebarUnit.propTypes = {
  intl: _i18n.intlShape.isRequired,
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
  activeUnitId: _propTypes.default.string.isRequired
};
var _default = exports.default = (0, _i18n.injectIntl)(SidebarUnit);
//# sourceMappingURL=SidebarUnit.js.map