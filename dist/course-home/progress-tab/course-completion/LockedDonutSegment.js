"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _paragon = require("@edx/paragon");

var _i18n = require("@edx/frontend-platform/i18n");

var _messages = _interopRequireDefault(require("./messages"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function LockedDonutSegment(_ref) {
  let {
    intl,
    lockedPercentage
  } = _ref;
  const [showLockedPopover, setShowLockedPopover] = (0, _react.useState)(false);

  if (!lockedPercentage) {
    return null;
  }

  const iconDegree = lockedPercentage > 8 ? 3.6 * lockedPercentage / 8 : 3.6 * lockedPercentage / 5 * 2;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
    className: "donut-segment-group",
    onBlur: () => setShowLockedPopover(false),
    onFocus: () => setShowLockedPopover(true),
    tabIndex: "-1",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
      className: "donut-segment locked-stroke",
      cx: "21",
      cy: "21",
      r: "15.91549430918954",
      strokeDasharray: `${lockedPercentage} ${100 - lockedPercentage}`,
      strokeDashoffset: lockedPercentage - 75
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.OverlayTrigger, {
      show: showLockedPopover,
      placement: "top",
      overlay: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Popover, {
        "aria-hidden": "true",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Popover.Content, {
          children: intl.formatMessage(_messages.default.lockedContentTooltip)
        })
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
        width: "6",
        height: "21",
        viewBox: "0 0 21 6",
        style: {
          transformOrigin: 'center',
          transform: `rotate(-${iconDegree}deg)`
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
          d: "M20 8.00002H17V6.21002C17 3.60002 15.09 1.27002 12.49 1.02002C9.51 0.740018 7 3.08002 7 6.00002V8.00002H4V22H20V8.00002ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM9 8.00002V6.00002C9 4.34002 10.34 3.00002 12 3.00002C13.66 3.00002 15 4.34002 15 6.00002V8.00002H9Z",
          fill: lockedPercentage > 5 ? 'white' : 'transparent',
          style: {
            transform: `scale(0.18) translate(5.8em, .7em) rotate(${iconDegree}deg)`
          }
        })
      })
    })]
  });
}

LockedDonutSegment.propTypes = {
  intl: _i18n.intlShape.isRequired,
  lockedPercentage: _propTypes.default.number.isRequired
};

var _default = (0, _i18n.injectIntl)(LockedDonutSegment);

exports.default = _default;
//# sourceMappingURL=LockedDonutSegment.js.map