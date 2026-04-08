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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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