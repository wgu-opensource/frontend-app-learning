"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SequenceNavigationTabs;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _UnitButton = _interopRequireDefault(require("./UnitButton"));

var _SequenceNavigationDropdown = _interopRequireDefault(require("./SequenceNavigationDropdown"));

var _useIndexOfLastVisibleChild = _interopRequireDefault(require("../../../../generic/tabs/useIndexOfLastVisibleChild"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SequenceNavigationTabs(_ref) {
  let {
    unitIds,
    unitId,
    showCompletion,
    onNavigate
  } = _ref;
  const [indexOfLastVisibleChild, containerRef, invisibleStyle] = (0, _useIndexOfLastVisibleChild.default)();
  const shouldDisplayDropdown = indexOfLastVisibleChild === -1;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      flexBasis: '100%',
      minWidth: 0
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "sequence-navigation-tabs-container",
      ref: containerRef,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "sequence-navigation-tabs d-flex flex-grow-1",
        style: shouldDisplayDropdown ? invisibleStyle : null,
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
}

SequenceNavigationTabs.propTypes = {
  unitId: _propTypes.default.string.isRequired,
  onNavigate: _propTypes.default.func.isRequired,
  showCompletion: _propTypes.default.bool.isRequired,
  unitIds: _propTypes.default.arrayOf(_propTypes.default.string).isRequired
};
//# sourceMappingURL=SequenceNavigationTabs.js.map