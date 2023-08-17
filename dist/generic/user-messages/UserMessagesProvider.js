"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ALERT_TYPES = void 0;
exports.default = UserMessagesProvider;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _UserMessagesContext = _interopRequireDefault(require("./UserMessagesContext"));

var _localStorage = require("../../data/localStorage");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["code", "dismissible", "text", "type", "topic", "payload"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const ALERT_TYPES = {
  ERROR: 'error',
  DANGER: 'danger',
  SUCCESS: 'success',
  INFO: 'info',
  WELCOME: 'welcome'
};
exports.ALERT_TYPES = ALERT_TYPES;
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

function UserMessagesProvider(_ref) {
  let {
    children
  } = _ref;
  // Note: The callbacks (add, remove, clear) below interact with useState in very subtle ways.
  // When we call setMessages, we always do so with the function-based form of the handler, making
  // use of the "current" state and not relying on lexical scoping to access the state exposed
  // above with useState.  This is very important and allows us to call multiple "add", "remove",
  // or "clear" functions in a  single render.  Without it, each call to one of the callbacks
  // references back to the -original- value of messages instead of the most recent, causing them
  // all to override each other.  Last one in would win.
  const [messages, setMessages] = (0, _react.useState)([]);
  const [nextId, setNextId] = (0, _react.useState)(1); // Because the add, remove, and clear handlers also need to access nextId, we have to do
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

  function clear() {
    let topic = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    setMessages(currentMessages => topic === null ? [] : currentMessages.filter(message => message.topic !== topic));
  }

  (0, _react.useEffect)(() => {
    // We only allow flash messages to persist through one refresh, then we clear them out.
    // If we want persistent messages, then add a 'persist' key to the messages and handle that
    // as a separate local storage item.
    const flashMessages = popFlashMessages();
    flashMessages.forEach(flashMessage => add(flashMessage));
  }, []);
  const value = {
    add,
    addFlash,
    remove,
    clear,
    messages
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_UserMessagesContext.default.Provider, {
    value: value,
    children: children
  });
}

UserMessagesProvider.propTypes = {
  children: _propTypes.default.node
};
UserMessagesProvider.defaultProps = {
  children: null
};
//# sourceMappingURL=UserMessagesProvider.js.map