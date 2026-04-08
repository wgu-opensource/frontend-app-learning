"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ALERT_TYPES = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _UserMessagesContext = _interopRequireDefault(require("./UserMessagesContext"));
var _localStorage = require("../../data/localStorage");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["code", "dismissible", "text", "type", "topic", "payload"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const ALERT_TYPES = exports.ALERT_TYPES = {
  ERROR: 'error',
  DANGER: 'danger',
  SUCCESS: 'success',
  INFO: 'info',
  WELCOME: 'welcome'
};
const FLASH_MESSAGES_LOCAL_STORAGE_KEY = 'UserMessagesProvider.flashMessages';
function addFlashMessage(message) {
  let flashMessages = (0, _localStorage.getLocalStorage)(FLASH_MESSAGES_LOCAL_STORAGE_KEY);
  if (!flashMessages || !Array.isArray(flashMessages)) {
    flashMessages = [];
  }
  flashMessages.push(message);
  (0, _localStorage.setLocalStorage)(FLASH_MESSAGES_LOCAL_STORAGE_KEY, flashMessages);
}
function popFlashMessages() {
  return (0, _localStorage.popLocalStorage)(FLASH_MESSAGES_LOCAL_STORAGE_KEY) || [];
}
const UserMessagesProvider = ({
  children
}) => {
  // Note: The callbacks (add, remove, clear) below interact with useState in very subtle ways.
  // When we call setMessages, we always do so with the function-based form of the handler, making
  // use of the "current" state and not relying on lexical scoping to access the state exposed
  // above with useState.  This is very important and allows us to call multiple "add", "remove",
  // or "clear" functions in a  single render.  Without it, each call to one of the callbacks
  // references back to the -original- value of messages instead of the most recent, causing them
  // all to override each other.  Last one in would win.
  const [messages, setMessages] = (0, _react.useState)([]);
  const [nextId, setNextId] = (0, _react.useState)(1);

  // Because the add, remove, and clear handlers also need to access nextId, we have to do
  // something a bit different.  There's no way to wait for the "currentNextId" in a setMessages
  // handler.  The alternative is to update a ref, which will always point to the current value by
  // its very nature.
  const refId = (0, _react.useRef)(nextId);

  /**
   * Flash messages are a special kind of message that appears once on page refresh.
   */
  function addFlash(message) {
    addFlashMessage(message);
  }
  function add(message) {
    const {
        code,
        dismissible,
        text,
        type,
        topic,
        payload
      } = message,
      others = _objectWithoutProperties(message, _excluded);
    const id = refId.current;
    setMessages(currentMessages => [...currentMessages, _objectSpread(_objectSpread({
      code,
      dismissible,
      text,
      type,
      topic,
      payload
    }, others), {}, {
      id
    })]);
    refId.current += 1;
    setNextId(refId.current);
    return id;
  }
  function remove(id) {
    setMessages(currentMessages => currentMessages.filter(message => message.id !== id));
  }
  function clear(topic = null) {
    setMessages(currentMessages => topic === null ? [] : currentMessages.filter(message => message.topic !== topic));
  }
  (0, _react.useEffect)(() => {
    // We only allow flash messages to persist through one refresh, then we clear them out.
    // If we want persistent messages, then add a 'persist' key to the messages and handle that
    // as a separate local storage item.
    const flashMessages = popFlashMessages();
    flashMessages.forEach(flashMessage => add(flashMessage));
  }, []);
  const value = (0, _react.useMemo)(() => ({
    add,
    addFlash,
    remove,
    clear,
    messages
  }), [messages]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_UserMessagesContext.default.Provider, {
    value: value,
    children: children
  });
};
UserMessagesProvider.propTypes = {
  children: _propTypes.default.node
};
UserMessagesProvider.defaultProps = {
  children: null
};
var _default = exports.default = UserMessagesProvider;
//# sourceMappingURL=UserMessagesProvider.js.map