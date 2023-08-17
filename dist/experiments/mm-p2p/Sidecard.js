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

const SidecardContent = /*#__PURE__*/_react.default.lazy(() => Promise.resolve().then(() => _interopRequireWildcard(require('./SidecardContent'))));

const Sidecard = _ref => {
  let {
    options
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Suspense, {
    fallback: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageLoading.default, {
      srMessage: "Loading upgrade messaging..."
    }),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(SidecardContent, {
      options: options
    })
  });
};

Sidecard.propTypes = {
  options: _propTypes.default.shape({
    state: _propTypes.default.shape({
      upgradeDeadline: _propTypes.default.string.isRequired
    }),
    access: _propTypes.default.shape({
      accessExpirationDate: _propTypes.default.string.isRequired,
      price: _propTypes.default.string.isRequired,
      upgradeUrl: _propTypes.default.string.isRequired
    })
  })
};
Sidecard.defaultProps = {
  options: {
    state: {
      upgradeDeadline: 'Mar 29, 2021 11:59 PM EST'
    },
    access: {
      accessDeadline: 'Mar 21, 2022 11:59 PM EST',
      price: '$23',
      upgradeUrl: ''
    }
  }
};
var _default = Sidecard;
exports.default = _default;
//# sourceMappingURL=Sidecard.js.map