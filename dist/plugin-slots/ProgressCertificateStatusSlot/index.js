"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _frontendPluginFramework = require("@openedx/frontend-plugin-framework");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ProgressCertificateStatusSlot = ({
  courseId,
  children
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendPluginFramework.PluginSlot, {
  id: "org.openedx.frontend.learning.progress_certificate_status.v1",
  idAliases: ['progress_certificate_status_slot'],
  pluginProps: {
    courseId
  },
  children: children
});
ProgressCertificateStatusSlot.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  children: _propTypes.default.node.isRequired
};
var _default = exports.default = ProgressCertificateStatusSlot;
//# sourceMappingURL=index.js.map