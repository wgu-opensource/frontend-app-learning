"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _PageLoading = _interopRequireDefault(require("../../../generic/PageLoading"));
var _modelStore = require("../../../generic/model-store");
var _messages = _interopRequireDefault(require("./messages"));
var _Unit = _interopRequireDefault(require("./Unit"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ContentLock = /*#__PURE__*/_react.default.lazy(() => Promise.resolve().then(() => _interopRequireWildcard(require('./content-lock'))));
const SequenceContent = ({
  gated,
  courseId,
  sequenceId,
  unitId,
  unitLoadedHandler,
  isOriginalUserStaff,
  renderUnitNavigation
}) => {
  const intl = (0, _i18n.useIntl)();
  const sequence = (0, _modelStore.useModel)('sequences', sequenceId);

  // Go back to the top of the page whenever the unit or sequence changes.
  (0, _react.useEffect)(() => {
    global.scrollTo(0, 0);
  }, [sequenceId, unitId]);
  if (gated) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Suspense, {
      fallback: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageLoading.default, {
        srMessage: intl.formatMessage(_messages.default.loadingLockedContent)
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(ContentLock, {
        courseId: courseId,
        sequenceTitle: sequence.title,
        prereqSectionName: sequence.gatedContent.prereqSectionName,
        prereqId: sequence.gatedContent.prereqId
      })
    });
  }
  const unit = (0, _modelStore.useModel)('units', unitId);
  if (!unitId || !unit) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: intl.formatMessage(_messages.default.noContent)
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Unit.default, {
    courseId: courseId,
    format: sequence.format,
    id: unitId,
    onLoaded: unitLoadedHandler,
    isOriginalUserStaff: isOriginalUserStaff,
    renderUnitNavigation: renderUnitNavigation
  }, unitId);
};
SequenceContent.propTypes = {
  gated: _propTypes.default.bool.isRequired,
  courseId: _propTypes.default.string.isRequired,
  sequenceId: _propTypes.default.string.isRequired,
  unitId: _propTypes.default.string,
  unitLoadedHandler: _propTypes.default.func.isRequired,
  isOriginalUserStaff: _propTypes.default.bool.isRequired,
  renderUnitNavigation: _propTypes.default.func.isRequired
};
SequenceContent.defaultProps = {
  unitId: null
};
var _default = exports.default = SequenceContent;
//# sourceMappingURL=SequenceContent.js.map