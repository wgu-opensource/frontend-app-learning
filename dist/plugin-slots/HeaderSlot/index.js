"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _frontendPluginFramework = require("@openedx/frontend-plugin-framework");
var _frontendComponentHeader = require("@edx/frontend-component-header");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const HeaderSlot = ({
  courseOrg,
  courseNumber,
  courseTitle,
  showUserDropdown
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendPluginFramework.PluginSlot, {
  id: "org.openedx.frontend.layout.header_learning.v1",
  idAliases: ['header_slot'],
  slotOptions: {
    mergeProps: true
  },
  pluginProps: {
    courseOrg,
    courseNumber,
    courseTitle,
    showUserDropdown
  },
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendComponentHeader.LearningHeader, {
    courseOrg: courseOrg,
    courseNumber: courseNumber,
    courseTitle: courseTitle,
    showUserDropdown: showUserDropdown
  })
});
HeaderSlot.propTypes = {
  courseOrg: _propTypes.default.string,
  courseNumber: _propTypes.default.string,
  courseTitle: _propTypes.default.string,
  showUserDropdown: _propTypes.default.bool
};
HeaderSlot.defaultProps = {
  courseOrg: null,
  courseNumber: null,
  courseTitle: null,
  showUserDropdown: true
};
var _default = exports.default = HeaderSlot;
//# sourceMappingURL=index.js.map