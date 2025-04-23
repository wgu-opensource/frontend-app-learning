"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _frontendPlatform = require("@edx/frontend-platform");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _api = require("./api");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * This component uses the platform-plugin-notices plugin to function.
 * If the user has an unacknowledged notice, they will be rerouted off
 * course home and onto a full-screen notice page. If the plugin is not
 * installed, or there are no notices, we just passthrough this component.
 */const NoticesProvider = _ref => {
  let {
    children
  } = _ref;
  const [isRedirected, setIsRedirected] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    async function getData() {
      if ((0, _frontendPlatform.getConfig)().ENABLE_NOTICES) {
        const data = await (0, _api.getNotices)();
        if (data && data.results && data.results.length > 0) {
          const {
            results
          } = data;
          setIsRedirected(true);
          window.location.replace(`${results[0]}?next=${window.location.href}`);
        }
      }
    }
    getData();
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: isRedirected === true ? null : children
  });
};
NoticesProvider.propTypes = {
  children: _propTypes.default.node.isRequired
};
var _default = exports.default = NoticesProvider;
//# sourceMappingURL=NoticesProvider.js.map