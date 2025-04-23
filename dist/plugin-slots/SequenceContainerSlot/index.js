"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _frontendPluginFramework = require("@openedx/frontend-plugin-framework");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SequenceContainerSlot = _ref => {
  let {
    courseId,
    unitId
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendPluginFramework.PluginSlot, {
    id: "sequence_container_slot",
    pluginProps: {
      courseId,
      unitId
    }
  });
};
SequenceContainerSlot.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  unitId: _propTypes.default.string
};
SequenceContainerSlot.defaultProps = {
  unitId: null
};
var _default = exports.default = SequenceContainerSlot;
//# sourceMappingURL=index.js.map