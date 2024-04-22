"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _frontendPlatform = require("@edx/frontend-platform");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["className", "html", "title"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const LmsHtmlFragment = _ref => {
  let {
      className,
      html,
      title
    } = _ref,
    rest = _objectWithoutProperties(_ref, _excluded);
  const direction = document.documentElement?.getAttribute('dir') || 'ltr';
  const wholePage = `
    <html dir="${direction}">
      <head>
        <base href="${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}" target="_parent">
        <link rel="stylesheet" href="/static/${(0, _frontendPlatform.getConfig)().LEGACY_THEME_NAME ? `${(0, _frontendPlatform.getConfig)().LEGACY_THEME_NAME}/` : ''}css/bootstrap/lms-main.css">
        <link rel="stylesheet" type="text/css" href="${(0, _frontendPlatform.getConfig)().BASE_URL}/static/LmsHtmlFragment.css">
      </head>
      <body class="${className}">${html}</body>
      <script>
        const resizer = new ResizeObserver(() => {
          window.parent.postMessage({type: 'lmshtmlfragment.resize'}, '*');
        });
        resizer.observe(document.body);
      </script>
    </html>
  `;
  const iframe = (0, _react.useRef)(null);
  function resetIframeHeight() {
    if (iframe?.current?.contentWindow?.document?.body) {
      iframe.current.height = iframe.current.contentWindow.document.body.scrollHeight;
    }
  }
  (0, _react.useEffect)(() => {
    function receiveMessage(event) {
      const {
        type
      } = event.data;
      if (type === 'lmshtmlfragment.resize') {
        resetIframeHeight();
      }
    }
    global.addEventListener('message', receiveMessage);
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("iframe", _objectSpread({
    className: "w-100 border-0",
    onLoad: resetIframeHeight,
    ref: iframe,
    referrerPolicy: "origin",
    scrolling: "no",
    srcDoc: wholePage,
    title: title
  }, rest));
};
LmsHtmlFragment.defaultProps = {
  className: ''
};
LmsHtmlFragment.propTypes = {
  className: _propTypes.default.string,
  html: _propTypes.default.string.isRequired,
  title: _propTypes.default.string.isRequired
};
var _default = LmsHtmlFragment;
exports.default = _default;
//# sourceMappingURL=LmsHtmlFragment.js.map