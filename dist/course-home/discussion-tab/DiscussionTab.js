"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _frontendPlatform = require("@edx/frontend-platform");
var _i18n = require("@edx/frontend-platform/i18n");
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _hooks = require("../../generic/hooks");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const DiscussionTab = () => {
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    path
  } = (0, _reactRouterDom.useParams)();
  const [originalPath] = (0, _react.useState)(path);
  const navigate = (0, _reactRouterDom.useNavigate)();
  const [, iFrameHeight] = (0, _hooks.useIFrameHeight)();
  (0, _hooks.useIFramePluginEvents)({
    'discussions.navigate': payload => {
      const basePath = (0, _reactRouterDom.generatePath)('/course/:courseId/discussion', {
        courseId
      });
      navigate(`${basePath}/${payload.path}`);
    }
  });
  const discussionsUrl = `${(0, _frontendPlatform.getConfig)().DISCUSSIONS_MFE_BASE_URL}/${courseId}/${originalPath}`;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("iframe", {
    src: discussionsUrl,
    className: "d-flex w-100 border-0",
    height: iFrameHeight,
    style: {
      minHeight: '60rem'
    },
    title: "discussion"
  });
};
DiscussionTab.propTypes = {};
var _default = exports.default = (0, _i18n.injectIntl)(DiscussionTab);
//# sourceMappingURL=DiscussionTab.js.map