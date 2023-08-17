"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMobile = exports.getUser = exports.StrictDict = void 0;

var _react = require("react");

var _react2 = require("@edx/frontend-platform/react");

var _util = _interopRequireDefault(require("util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const isMobile = () => {
  const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
  return Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
};

exports.isMobile = isMobile;

const getUser = () => (0, _react.useContext)(_react2.AppContext).authenticatedUser;

exports.getUser = getUser;
const staticReturnOptions = ['dict', 'inspect', Symbol.toStringTag, _util.default.inspect.custom, Symbol.for('nodejs.util.inspect.custom')];

const strictGet = (target, name) => {
  if (name === Symbol.toStringTag) {
    return target;
  }

  if (name === 'length') {
    return target.length;
  }

  if (staticReturnOptions.indexOf(name) >= 0) {
    return target;
  }

  if (name === Symbol.iterator) {
    return _objectSpread({}, target);
  }

  if (name in target || name === '_reactFragment') {
    return target[name];
  }

  console.log(name.toString());
  console.error({
    target,
    name
  });
  const e = Error(`invalid property "${name.toString()}"`);
  console.error(e.stack);
  return undefined;
};

const StrictDict = dict => new Proxy(dict, {
  get: strictGet
});

exports.StrictDict = StrictDict;
//# sourceMappingURL=utils.js.map