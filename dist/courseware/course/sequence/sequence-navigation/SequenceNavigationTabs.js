"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _UnitButton = _interopRequireDefault(require("./UnitButton"));
var _SequenceNavigationDropdown = _interopRequireDefault(require("./SequenceNavigationDropdown"));
var _useIndexOfLastVisibleChild = _interopRequireDefault(require("../../../../generic/tabs/useIndexOfLastVisibleChild"));
var _hooks = require("./hooks");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SequenceNavigationTabs = ({
  unitIds,
  unitId,
  showCompletion,
  onNavigate
}) => {
  const isSidebarOpen = (0, _hooks.useIsSidebarOpen)(unitId);
  const [indexOfLastVisibleChild, containerRef, invisibleStyle] = (0, _useIndexOfLastVisibleChild.default)(isSidebarOpen);
  const isOnXLDesktop = (0, _hooks.useIsOnXLDesktop)();
  const isOnLargeDesktop = (0, _hooks.useIsOnLargeDesktop)();
  const isOnMediumDesktop = (0, _hooks.useIsOnMediumDesktop)();
  const shouldDisplayDropdown = indexOfLastVisibleChild === -1 || indexOfLastVisibleChild < unitIds.length - 1;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      flexBasis: '100%',
      minWidth: 0
    },
    className: (0, _classnames.default)({
      'navigation-tab-width-xl': isOnXLDesktop && isSidebarOpen,
      'navigation-tab-width-large': isOnLargeDesktop && isSidebarOpen,
      'navigation-tab-width-medium': isOnMediumDesktop && isSidebarOpen
    }),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "sequence-navigation-tabs-container",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "sequence-navigation-tabs d-flex flex-grow-1",
        style: shouldDisplayDropdown ? invisibleStyle : null,
        ref: containerRef,
        children: unitIds.map(buttonUnitId => /*#__PURE__*/(0, _jsxRuntime.jsx)(_UnitButton.default, {
          unitId: buttonUnitId,
          isActive: unitId === buttonUnitId,
          showCompletion: showCompletion,
          onClick: onNavigate
        }, buttonUnitId))
      })
    }), shouldDisplayDropdown && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SequenceNavigationDropdown.default, {
      unitId: unitId,
      onNavigate: onNavigate,
      showCompletion: showCompletion,
      unitIds: unitIds
    })]
  });
};
SequenceNavigationTabs.propTypes = {
  unitId: _propTypes.default.string.isRequired,
  onNavigate: _propTypes.default.func.isRequired,
  showCompletion: _propTypes.default.bool.isRequired,
  unitIds: _propTypes.default.arrayOf(_propTypes.default.string).isRequired
};
var _default = exports.default = SequenceNavigationTabs;
//# sourceMappingURL=SequenceNavigationTabs.js.map