"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _frontendPluginFramework = require("@openedx/frontend-plugin-framework");
var _RelatedLinks = _interopRequireDefault(require("../../course-home/progress-tab/related-links/RelatedLinks"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ProgressTabRelatedLinksSlot = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendPluginFramework.PluginSlot, {
  id: "org.openedx.frontend.learning.progress_tab_related_links.v1",
  idAliases: ['progress_tab_related_links_slot'],
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RelatedLinks.default, {})
});
ProgressTabRelatedLinksSlot.propTypes = {};
var _default = exports.default = ProgressTabRelatedLinksSlot;
//# sourceMappingURL=index.js.map