"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const LiveTab = () => {
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const liveModel = (0, _reactRedux.useSelector)(state => state.models.live);
  (0, _react.useEffect)(() => {
    const iframe = document.getElementById('lti-tab-embed');
    if (iframe) {
      iframe.className += ' vh-100 w-100 border-0';
    }
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    id: "live_tab"
    // eslint-disable-next-line react/no-danger
    ,
    dangerouslySetInnerHTML: {
      __html: liveModel[courseId]?.iframe
    }
  });
};
var _default = exports.default = LiveTab;
//# sourceMappingURL=LiveTab.js.map