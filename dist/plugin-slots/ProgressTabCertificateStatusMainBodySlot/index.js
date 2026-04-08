"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _frontendPluginFramework = require("@openedx/frontend-plugin-framework");
var _paragon = require("@openedx/paragon");
var _CertificateStatus = _interopRequireDefault(require("../../course-home/progress-tab/certificate-status/CertificateStatus"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ProgressTabCertificateStatusMainBodySlot = () => {
  const windowWidth = (0, _paragon.useWindowSize)().width;
  const wideScreen = windowWidth >= _paragon.breakpoints.large.minWidth;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendPluginFramework.PluginSlot, {
    id: "org.openedx.frontend.learning.progress_tab_certificate_status_main_body.v1",
    idAliases: ['progress_tab_certificate_status_main_body_slot'],
    children: windowWidth && !wideScreen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CertificateStatus.default, {})
  });
};
ProgressTabCertificateStatusMainBodySlot.propTypes = {};
var _default = exports.default = ProgressTabCertificateStatusMainBodySlot;
//# sourceMappingURL=index.js.map