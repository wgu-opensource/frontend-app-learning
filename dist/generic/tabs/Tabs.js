"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _paragon = require("@openedx/paragon");
var _i18n = require("@edx/frontend-platform/i18n");
var _classnames = _interopRequireDefault(require("classnames"));
var _useIndexOfLastVisibleChild = _interopRequireDefault(require("./useIndexOfLastVisibleChild"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["children", "className"];
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
const Tabs = _ref => {
  let {
      children,
      className
    } = _ref,
    attrs = _objectWithoutProperties(_ref, _excluded);
  const [indexOfLastVisibleChild, containerElementRef, invisibleStyle, overflowElementRef] = (0, _useIndexOfLastVisibleChild.default)();
  const tabChildren = (0, _react.useMemo)(() => {
    const childrenArray = _react.default.Children.toArray(children);
    const indexOfOverflowStart = indexOfLastVisibleChild + 1;

    // All tabs will be rendered. Those that would overflow are set to invisible.
    const wrappedChildren = childrenArray.map((child, index) => /*#__PURE__*/_react.default.cloneElement(child, {
      style: index > indexOfLastVisibleChild ? invisibleStyle : null
    }));

    // Build the list of items to put in the overflow menu
    const overflowChildren = childrenArray.slice(indexOfOverflowStart).map(overflowChild => /*#__PURE__*/_react.default.cloneElement(overflowChild, {
      className: 'dropdown-item'
    }));

    // Insert the overflow menu at the cut off index (even if it will be hidden
    // it so it can be part of measurements)
    wrappedChildren.splice(indexOfOverflowStart, 0, /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "nav-item flex-shrink-0",
      style: indexOfOverflowStart >= _react.default.Children.count(children) ? invisibleStyle : null,
      ref: overflowElementRef,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Dropdown, {
        className: "h-100",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Dropdown.Toggle, {
          variant: "link",
          className: "nav-link h-100",
          id: "learn.course.tabs.navigation.overflow.menu",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "learn.course.tabs.navigation.overflow.menu",
            description: "The title of the overflow menu for course tabs",
            defaultMessage: "More..."
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Dropdown.Menu, {
          className: "dropdown-menu-right",
          children: overflowChildren
        })]
      })
    }, "overflow"));
    return wrappedChildren;
  }, [children, indexOfLastVisibleChild, invisibleStyle, overflowElementRef]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("nav", _objectSpread(_objectSpread({}, attrs), {}, {
    className: (0, _classnames.default)('nav flex-nowrap', className),
    ref: containerElementRef,
    children: tabChildren
  }));
};
Tabs.propTypes = {
  children: _propTypes.default.node,
  className: _propTypes.default.string
};
Tabs.defaultProps = {
  children: null,
  className: undefined
};
var _default = exports.default = Tabs;
//# sourceMappingURL=Tabs.js.map