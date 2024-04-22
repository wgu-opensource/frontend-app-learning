"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _paragon = require("@edx/paragon");
var _i18n = require("@edx/frontend-platform/i18n");
var _UnitButton = _interopRequireDefault(require("./UnitButton"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SequenceNavigationDropdown = _ref => {
  let {
    unitId,
    onNavigate,
    showCompletion,
    unitIds
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Dropdown, {
    className: "sequence-navigation-dropdown",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Dropdown.Toggle, {
      variant: "link",
      className: "font-weight-normal w-100 border-right-0",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        defaultMessage: "{current} of {total}",
        description: "The title of the mobile menu for sequence navigation of units",
        id: "learn.course.sequence.navigation.mobile.menu",
        values: {
          current: unitIds.indexOf(unitId) + 1,
          total: unitIds.length
        }
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Dropdown.Menu, {
      className: "w-100",
      children: unitIds.map(buttonUnitId => /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Dropdown.Item, {
        as: _UnitButton.default,
        className: "w-100",
        isActive: unitId === buttonUnitId,
        onClick: onNavigate,
        showCompletion: showCompletion,
        showTitle: true,
        unitId: buttonUnitId
      }, buttonUnitId))
    })]
  });
};
SequenceNavigationDropdown.propTypes = {
  unitId: _propTypes.default.string.isRequired,
  onNavigate: _propTypes.default.func.isRequired,
  showCompletion: _propTypes.default.bool.isRequired,
  unitIds: _propTypes.default.arrayOf(_propTypes.default.string).isRequired
};
var _default = SequenceNavigationDropdown;
exports.default = _default;
//# sourceMappingURL=SequenceNavigationDropdown.js.map