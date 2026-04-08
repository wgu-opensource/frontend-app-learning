"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _modelStore = require("@src/generic/model-store");
var _PageLoading = _interopRequireDefault(require("@src/generic/PageLoading"));
var _GatedUnitContentMessageSlot = require("../../../../plugin-slots/GatedUnitContentMessageSlot");
var _messages = _interopRequireDefault(require("../messages"));
var _honorCode = _interopRequireDefault(require("../honor-code"));
var hooks = _interopRequireWildcard(require("./hooks"));
var _constants = require("./constants");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const UnitSuspense = ({
  courseId,
  id
}) => {
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
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GatedUnitContentMessageSlot.GatedUnitContentMessageSlot, {
        courseId: courseId
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