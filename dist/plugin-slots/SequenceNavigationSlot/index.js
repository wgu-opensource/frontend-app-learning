"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _frontendPluginFramework = require("@openedx/frontend-plugin-framework");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SequenceNavigationSlot = ({
  sequenceId,
  unitId,
  nextHandler,
  onNavigate,
  previousHandler
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendPluginFramework.PluginSlot, {
  id: "org.openedx.frontend.learning.sequence_navigation.v1",
  slotOptions: {
    mergeProps: true
  },
  pluginProps: {
    sequenceId,
    unitId,
    nextHandler,
    onNavigate,
    previousHandler
  }
});
SequenceNavigationSlot.propTypes = {
  sequenceId: _propTypes.default.string.isRequired,
  unitId: _propTypes.default.string.isRequired,
  nextHandler: _propTypes.default.func.isRequired,
  onNavigate: _propTypes.default.func.isRequired,
  previousHandler: _propTypes.default.func.isRequired
};
var _default = exports.default = SequenceNavigationSlot;
//# sourceMappingURL=index.js.map