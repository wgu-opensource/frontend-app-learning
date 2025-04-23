"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _frontendPluginFramework = require("@openedx/frontend-plugin-framework");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UnitTitleSlot = _ref => {
  let {
    courseId,
    unitId
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendPluginFramework.PluginSlot, {
    id: "unit_title_slot",
    pluginProps: {
      courseId,
      unitId
    }
  });
};
UnitTitleSlot.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  unitId: _propTypes.default.string.isRequired
};
var _default = exports.default = UnitTitleSlot;
//# sourceMappingURL=index.js.map