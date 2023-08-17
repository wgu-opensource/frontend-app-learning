"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Tabs;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _paragon = require("@edx/paragon");

var _i18n = require("@edx/frontend-platform/i18n");

var _classnames = _interopRequireDefault(require("classnames"));

var _useIndexOfLastVisibleChild = _interopRequireDefault(require("./useIndexOfLastVisibleChild"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children", "className"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Tabs(_ref) {
  let {
    children,
    className
  } = _ref,
      attrs = _objectWithoutProperties(_ref, _excluded);

  const [indexOfLastVisibleChild, containerElementRef, invisibleStyle, overflowElementRef] = (0, _useIndexOfLastVisibleChild.default)();
  const tabChildren = (0, _react.useMemo)(() => {
    const childrenArray = _react.default.Children.toArray(children);

    const indexOfOverflowStart = indexOfLastVisibleChild + 1; // All tabs will be rendered. Those that would overflow are set to invisible.

    const wrappedChildren = childrenArray.map((child, index) => /*#__PURE__*/_react.default.cloneElement(child, {
      style: index > indexOfLastVisibleChild ? invisibleStyle : null
    })); // Build the list of items to put in the overflow menu

    const overflowChildren = childrenArray.slice(indexOfOverflowStart).map(overflowChild => /*#__PURE__*/_react.default.cloneElement(overflowChild, {
      className: 'dropdown-item'
    })); // Insert the overflow menu at the cut off index (even if it will be hidden
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
  }, [children, indexOfLastVisibleChild]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("nav", _objectSpread(_objectSpread({}, attrs), {}, {
    className: (0, _classnames.default)('nav flex-nowrap', className),
    ref: containerElementRef,
    children: tabChildren
  }));
}

Tabs.propTypes = {
  children: _propTypes.default.node,
  className: _propTypes.default.string
};
Tabs.defaultProps = {
  children: null,
  className: undefined
};
//# sourceMappingURL=Tabs.js.map