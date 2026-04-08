"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UNIT_ICON_TYPES = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _icons = require("@openedx/paragon/icons");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["type", "isCompleted"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const UNIT_ICON_TYPES = exports.UNIT_ICON_TYPES = {
  video: 'video',
  problem: 'problem',
  vertical: 'vertical',
  lock: 'lock',
  other: 'other'
};
const UnitIcon = _ref => {
  let {
      type,
      isCompleted
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const iconMap = {
    [UNIT_ICON_TYPES.video]: {
      default: _icons.LmsVideocam,
      complete: _icons.LmsVideocamComplete
    },
    [UNIT_ICON_TYPES.problem]: {
      default: _icons.LmsEditSquare,
      complete: _icons.LmsEditSquareComplete
    },
    [UNIT_ICON_TYPES.vertical]: _icons.Article,
    [UNIT_ICON_TYPES.lock]: _icons.Locked,
    [UNIT_ICON_TYPES.other]: {
      default: _icons.LmsBook,
      complete: _icons.LmsBookComplete
    }
  };
  let Icon = iconMap[type || UNIT_ICON_TYPES.other];
  if (typeof Icon === 'object') {
    Icon = iconMap[type || UNIT_ICON_TYPES.other]?.[isCompleted ? 'complete' : 'default'];
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Icon, _objectSpread(_objectSpread({}, props), {}, {
    className: (0, _classnames.default)({
      'text-success': isCompleted,
      'text-gray-300': !isCompleted
    })
  }));
};
UnitIcon.propTypes = {
  type: _propTypes.default.oneOf(Object.keys(UNIT_ICON_TYPES)).isRequired,
  isCompleted: _propTypes.default.bool.isRequired
};
var _default = exports.default = UnitIcon;
//# sourceMappingURL=UnitIcon.js.map