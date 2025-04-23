"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _frontendPlatform = require("@edx/frontend-platform");
var _i18n = require("@edx/frontend-platform/i18n");
var _classnames = _interopRequireDefault(require("classnames"));
var _SidebarContext = _interopRequireDefault(require("../../../SidebarContext"));
var _messages = _interopRequireDefault(require("../../../messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
(0, _frontendPlatform.ensureConfig)(['DISCUSSIONS_MFE_BASE_URL']);
const DiscussionsWidget = () => {
  const intl = (0, _i18n.useIntl)();
  const {
    unitId,
    courseId,
    hideDiscussionbar,
    isDiscussionbarAvailable,
    shouldDisplayFullScreen
  } = (0, _react.useContext)(_SidebarContext.default);
  const discussionsUrl = `${(0, _frontendPlatform.getConfig)().DISCUSSIONS_MFE_BASE_URL}/${courseId}/category/${unitId}`;
  if (hideDiscussionbar || !isDiscussionbarAvailable) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("iframe", {
    src: `${discussionsUrl}?inContextSidebar`,
    className: (0, _classnames.default)('d-flex w-100 flex-fill border border-light-400 rounded-sm', {
      'vh-100': !shouldDisplayFullScreen
    }),
    title: intl.formatMessage(_messages.default.discussionsTitle),
    allow: "clipboard-write",
    loading: "lazy"
  });
};
var _default = exports.default = DiscussionsWidget;
//# sourceMappingURL=DiscussionsWidget.js.map