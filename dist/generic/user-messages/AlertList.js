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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const AlertList = _ref => {
  let {
    topic,
    className,
    customAlerts,
    customProps
  } = _ref;
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
var _default = AlertList;
exports.default = _default;
//# sourceMappingURL=AlertList.js.map