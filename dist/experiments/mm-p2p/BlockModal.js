"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BlockModal = void 0;

var _react = _interopRequireWildcard(require("react"));

var _paragon = require("@edx/paragon");

var _PageLoading = _interopRequireDefault(require("../../generic/PageLoading"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const BlockModalContent = /*#__PURE__*/_react.default.lazy(() => Promise.resolve().then(() => _interopRequireWildcard(require('./BlockModalContent'))));

const BlockModal = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.ModalLayer, {
  isOpen: true,
  onClose: () => {},
  isBlocking: true,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Suspense, {
    fallback: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageLoading.default, {
      srMessage: "Loading blocked content modal"
    }),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(BlockModalContent, {})
  })
});

exports.BlockModal = BlockModal;
var _default = BlockModal;
exports.default = _default;
//# sourceMappingURL=BlockModal.js.map