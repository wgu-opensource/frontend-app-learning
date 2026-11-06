"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _frontendPluginFramework = require("@openedx/frontend-plugin-framework");
var _modelStore = require("../../../../generic/model-store");
var _PageLoading = _interopRequireDefault(require("../../../../generic/PageLoading"));
var _messages = _interopRequireDefault(require("../messages"));
var _honorCode = _interopRequireDefault(require("../honor-code"));
var _lockPaywall = _interopRequireDefault(require("../lock-paywall"));
var hooks = _interopRequireWildcard(require("./hooks"));
var _constants = require("./constants");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const UnitSuspense = _ref => {
  let {
    courseId,
    id
  } = _ref;
  const {
    formatMessage
  } = (0, _i18n.useIntl)();
  const shouldDisplayHonorCode = hooks.useShouldDisplayHonorCode({
    courseId,
    id
  });
  const unit = (0, _modelStore.useModel)(_constants.modelKeys.units, id);
  const meta = (0, _modelStore.useModel)(_constants.modelKeys.coursewareMeta, courseId);
  const shouldDisplayContentGating = meta.contentTypeGatingEnabled && unit.containsContentTypeGatedContent;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [shouldDisplayContentGating && /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Suspense, {
      fallback: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageLoading.default, {
        srMessage: formatMessage(_messages.default.loadingLockedContent)
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendPluginFramework.PluginSlot, {
        id: "gated_unit_content_message_slot",
        pluginProps: {
          courseId
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_lockPaywall.default, {
          courseId: courseId
        })
      })
    }), shouldDisplayHonorCode && /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Suspense, {
      fallback: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageLoading.default, {
        srMessage: formatMessage(_messages.default.loadingHonorCode)
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_honorCode.default, {
        courseId: courseId
      })
    })]
  });
};
UnitSuspense.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  id: _propTypes.default.string.isRequired
};
var _default = exports.default = UnitSuspense;
//# sourceMappingURL=UnitSuspense.js.map