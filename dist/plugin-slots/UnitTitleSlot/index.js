"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _frontendPluginFramework = require("@openedx/frontend-plugin-framework");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const UnitTitleSlot = _ref => {
  let {
    courseId,
    unitId,
    unitTitle
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendPluginFramework.PluginSlot, {
    id: "unit_title_slot",
    pluginProps: {
      courseId,
      unitId,
      unitTitle
    }
  });
};
UnitTitleSlot.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  unitId: _propTypes.default.string.isRequired,
  unitTitle: _propTypes.default.string.isRequired
};
var _default = exports.default = UnitTitleSlot;
//# sourceMappingURL=index.js.map