"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stateKeys = exports.default = exports.DEFAULT_HEIGHT = void 0;
var _react = _interopRequireDefault(require("react"));
var _dist = require("@edx/react-unit-test-utils/dist");
var _hooks = require("@src/generic/hooks");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const stateKeys = exports.stateKeys = (0, _dist.StrictDict)({
  isOpen: 'isOpen',
  options: 'options'
});
const DEFAULT_HEIGHT = exports.DEFAULT_HEIGHT = '100%';
const useModalIFrameData = () => {
  const [isOpen, setIsOpen] = (0, _dist.useKeyedState)(stateKeys.isOpen, false);
  const [options, setOptions] = (0, _dist.useKeyedState)(stateKeys.options, {
    height: DEFAULT_HEIGHT
  });
  const handleModalClose = () => {
    const rootFrame = document.querySelector('iframe');
    setIsOpen(false);
    rootFrame.contentWindow.postMessage({
      type: 'plugin.modal-close'
    }, '*');
  };
  const receiveMessage = _react.default.useCallback(event => {
    const {
      type,
      payload
    } = event.data;
    if (!type) {
      return;
    }
    if (type === 'plugin.modal') {
      setOptions(current => _objectSpread(_objectSpread({}, current), payload));
      setIsOpen(true);
    }
    if (type === 'plugin.modal-close') {
      handleModalClose();
    }
  }, []);
  (0, _hooks.useEventListener)('message', receiveMessage);
  return {
    handleModalClose,
    modalOptions: _objectSpread({
      isOpen
    }, options)
  };
};
var _default = exports.default = useModalIFrameData;
//# sourceMappingURL=useModalIFrameData.js.map