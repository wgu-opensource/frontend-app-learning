"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _UserMessagesContext = _interopRequireDefault(require("./UserMessagesContext"));
var _Alert = _interopRequireDefault(require("./Alert"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const AlertList = ({
  topic,
  className,
  customAlerts,
  customProps
}) => {
  const {
    remove,
    messages
  } = (0, _react.useContext)(_UserMessagesContext.default);
  const getAlertComponent = (0, _react.useCallback)(code => customAlerts[code] !== undefined ? customAlerts[code] : _Alert.default, [customAlerts]);
  const topicMessages = messages.filter(message => !topic || message.topic === topic);
  if (topicMessages.length === 0) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: topicMessages.map(message => {
      const AlertComponent = getAlertComponent(message.code);
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Suspense, {
        fallback: null,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(AlertComponent, _objectSpread(_objectSpread({
          type: message.type,
          dismissible: message.dismissible,
          onDismiss: () => remove(message.id),
          payload: message.payload
        }, customProps), {}, {
          children: message.text
        }))
      }, message.id);
    })
  });
};
AlertList.propTypes = {
  className: _propTypes.default.string,
  topic: _propTypes.default.string,
  customAlerts: _propTypes.default.objectOf(_propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func, _propTypes.default.node])),
  // eslint-disable-next-line react/forbid-prop-types
  customProps: _propTypes.default.object
};
AlertList.defaultProps = {
  topic: null,
  className: null,
  customAlerts: {},
  customProps: {}
};
var _default = exports.default = AlertList;
//# sourceMappingURL=AlertList.js.map