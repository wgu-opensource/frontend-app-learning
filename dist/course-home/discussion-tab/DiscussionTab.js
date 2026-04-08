"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _frontendPlatform = require("@edx/frontend-platform");
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _hooks = require("../../generic/hooks");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
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
var _default = exports.default = DiscussionTab;
//# sourceMappingURL=DiscussionTab.js.map