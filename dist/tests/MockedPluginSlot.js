"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MockedPluginSlot = ({
  children,
  id
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
  "data-testid": id,
  children: ["PluginSlot_", id, children && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: children
  })]
});
MockedPluginSlot.displayName = 'PluginSlot';
MockedPluginSlot.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]),
  id: _propTypes.default.string
};
MockedPluginSlot.defaultProps = {
  children: undefined,
  id: undefined
};
var _default = exports.default = MockedPluginSlot;
//# sourceMappingURL=MockedPluginSlot.js.map