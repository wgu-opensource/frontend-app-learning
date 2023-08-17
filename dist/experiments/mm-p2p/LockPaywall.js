"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _PageLoading = _interopRequireDefault(require("../../generic/PageLoading"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const LockPaywallContent = /*#__PURE__*/_react.default.lazy(() => Promise.resolve().then(() => _interopRequireWildcard(require('./LockPaywallContent'))));

const LockPaywall = _ref => {
  let {
    options
  } = _ref;

  if (!(options.meta.gradedLock || options.meta.verifiedLock)) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Suspense, {
    fallback: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageLoading.default, {
      srMessage: "Loading locked content messaging..."
    }),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(LockPaywallContent, {
      options: options
    })
  });
};

LockPaywall.propTypes = {
  options: _propTypes.default.shape({
    access: _propTypes.default.shape({
      upgradeUrl: _propTypes.default.string.isRequired,
      price: _propTypes.default.string.isRequired
    }),
    meta: _propTypes.default.shape({
      gradedLock: _propTypes.default.bool.isRequired,
      verifiedLock: _propTypes.default.bool.isRequired
    })
  })
};
LockPaywall.defaultProps = {
  options: {
    access: {
      upgradeUrl: '',
      price: '$23'
    },
    meta: {
      gradedLock: false,
      verifiedLock: false
    }
  }
};
var _default = LockPaywall;
exports.default = _default;
//# sourceMappingURL=LockPaywall.js.map