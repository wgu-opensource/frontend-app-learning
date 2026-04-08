"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactRouterDom = require("react-router-dom");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _classnames = _interopRequireDefault(require("classnames"));
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _UnitIcon = _interopRequireDefault(require("./UnitIcon"));
var _CompleteIcon = _interopRequireDefault(require("./CompleteIcon"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const UnitButton = ({
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
}) => {
  const {
    courseId,
    sequenceId
  } = (0, _reactRedux.useSelector)(state => state.courseware);
  const {
    pathname
  } = (0, _reactRouterDom.useLocation)();
  const basePath = `/course/${courseId}/${sequenceId}/${unitId}`;
  const unitPath = pathname.startsWith('/preview') ? `/preview${basePath}` : basePath;
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
    to: unitPath,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_UnitIcon.default, {
      type: contentType
    }), showTitle && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "unit-title",
      children: title
    }), showCompletion && complete ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CompleteIcon.default, {
      size: "sm",
      className: "text-success ml-2"
    }) : null, bookmarked ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
      "data-testid": "bookmark-icon",
      src: _icons.Bookmark,
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
var _default = exports.default = (0, _reactRedux.connect)(mapStateToProps)(UnitButton);
//# sourceMappingURL=UnitButton.js.map