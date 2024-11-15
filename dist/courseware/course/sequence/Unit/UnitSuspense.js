"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _modelStore = require("../../../../generic/model-store");
var _PageLoading = _interopRequireDefault(require("../../../../generic/PageLoading"));
var _messages = _interopRequireDefault(require("../messages"));
var _honorCode = _interopRequireDefault(require("../honor-code"));
var _lockPaywall = _interopRequireDefault(require("../lock-paywall"));
var hooks = _interopRequireWildcard(require("./hooks"));
var _constants = require("./constants");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
  const suspenseComponent = (message, Component) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Suspense, {
    fallback: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageLoading.default, {
      srMessage: formatMessage(message)
    }),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, {
      courseId: courseId
    })
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [shouldDisplayContentGating && suspenseComponent(_messages.default.loadingLockedContent, _lockPaywall.default), shouldDisplayHonorCode && suspenseComponent(_messages.default.loadingHonorCode, _honorCode.default)]
  });
};
UnitSuspense.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  id: _propTypes.default.string.isRequired
};
var _default = UnitSuspense;
exports.default = _default;
//# sourceMappingURL=UnitSuspense.js.map