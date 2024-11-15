"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _classnames = _interopRequireDefault(require("classnames"));
var _paragon = require("@edx/paragon");
var _UnitIcon = _interopRequireDefault(require("./UnitIcon"));
var _CompleteIcon = _interopRequireDefault(require("./CompleteIcon"));
var _BookmarkFilledIcon = _interopRequireDefault(require("../../bookmark/BookmarkFilledIcon"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const UnitButton = _ref => {
  let {
    onClick,
    title,
    contentType,
    isActive,
    bookmarked,
    complete,
    showCompletion,
    unitId,
    className,
    showTitle
  } = _ref;
  const {
    courseId,
    sequenceId
  } = (0, _reactRedux.useSelector)(state => state.courseware);
  const handleClick = (0, _react.useCallback)(() => {
    onClick(unitId);
  }, [onClick, unitId]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Button, {
    className: (0, _classnames.default)({
      active: isActive,
      complete: showCompletion && complete
    }, className),
    variant: "link",
    onClick: handleClick,
    title: title,
    as: _reactRouterDom.Link,
    to: `/course/${courseId}/${sequenceId}/${unitId}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_UnitIcon.default, {
      type: contentType
    }), showTitle && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "unit-title",
      children: title
    }), showCompletion && complete ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CompleteIcon.default, {
      size: "sm",
      className: "text-success ml-2"
    }) : null, bookmarked ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_BookmarkFilledIcon.default, {
      className: "text-primary small position-absolute",
      style: {
        top: '-3px',
        right: '5px'
      }
    }) : null]
  });
};
UnitButton.propTypes = {
  bookmarked: _propTypes.default.bool,
  className: _propTypes.default.string,
  complete: _propTypes.default.bool,
  contentType: _propTypes.default.string.isRequired,
  isActive: _propTypes.default.bool,
  onClick: _propTypes.default.func.isRequired,
  showCompletion: _propTypes.default.bool,
  showTitle: _propTypes.default.bool,
  title: _propTypes.default.string.isRequired,
  unitId: _propTypes.default.string.isRequired
};
UnitButton.defaultProps = {
  className: undefined,
  isActive: false,
  bookmarked: false,
  complete: false,
  showTitle: false,
  showCompletion: true
};
const mapStateToProps = (state, props) => {
  if (props.unitId) {
    return _objectSpread({}, state.models.units[props.unitId]);
  }
  return {};
};
var _default = (0, _reactRedux.connect)(mapStateToProps)(UnitButton);
exports.default = _default;
//# sourceMappingURL=UnitButton.js.map