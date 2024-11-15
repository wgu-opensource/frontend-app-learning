"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testIDs = exports.default = exports.IFRAME_FEATURE_POLICY = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@edx/frontend-platform/react");
var _reactUnitTestUtils = require("@edx/react-unit-test-utils");
var _paragon = require("@edx/paragon");
var _PageLoading = _interopRequireDefault(require("../../../../generic/PageLoading"));
var hooks = _interopRequireWildcard(require("./hooks"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /**
                                                                                                                                                                                                                                                                                                                                                                                           * Feature policy for iframe, allowing access to certain courseware-related media.
                                                                                                                                                                                                                                                                                                                                                                                           *
                                                                                                                                                                                                                                                                                                                                                                                           * We must use the wildcard (*) origin for each feature, as courseware content
                                                                                                                                                                                                                                                                                                                                                                                           * may be embedded in external iframes. Notably, xblock-lti-consumer is a popular
                                                                                                                                                                                                                                                                                                                                                                                           * block that iframes external course content.
                                                                                                                                                                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                                                                                                                                                           * This policy was selected in conference with the edX Security Working Group.
                                                                                                                                                                                                                                                                                                                                                                                           * Changes to it should be vetted by them (security@edx.org).
                                                                                                                                                                                                                                                                                                                                                                                           */
const IFRAME_FEATURE_POLICY = 'microphone *; camera *; midi *; geolocation *; encrypted-media *, clipboard-write *';
exports.IFRAME_FEATURE_POLICY = IFRAME_FEATURE_POLICY;
const testIDs = (0, _reactUnitTestUtils.StrictDict)({
  contentIFrame: 'content-iframe-test-id',
  modalIFrame: 'modal-iframe-test-id'
});
exports.testIDs = testIDs;
const ContentIFrame = _ref => {
  let {
    iframeUrl,
    shouldShowContent,
    loadingMessage,
    id,
    elementId,
    onLoaded,
    title
  } = _ref;
  const {
    handleIFrameLoad,
    hasLoaded,
    iframeHeight,
    showError
  } = hooks.useIFrameBehavior({
    elementId,
    id,
    iframeUrl,
    onLoaded
  });
  const {
    modalOptions,
    handleModalClose
  } = hooks.useModalIFrameData();
  const contentIFrameProps = {
    id: elementId,
    src: iframeUrl,
    allow: IFRAME_FEATURE_POLICY,
    allowFullScreen: true,
    height: iframeHeight,
    scrolling: 'no',
    referrerPolicy: 'origin',
    onLoad: handleIFrameLoad
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [shouldShowContent && !hasLoaded && (showError ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.ErrorPage, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageLoading.default, {
      srMessage: loadingMessage
    })), shouldShowContent && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "unit-iframe-wrapper",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("iframe", _objectSpread(_objectSpread({
        title: title
      }, contentIFrameProps), {}, {
        "data-testid": testIDs.contentIFrame
      }))
    }), modalOptions.isOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Modal, {
      body: modalOptions.body ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "unit-modal",
        children: modalOptions.body
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("iframe", {
        title: modalOptions.title,
        allow: IFRAME_FEATURE_POLICY,
        frameBorder: "0",
        src: modalOptions.url,
        style: {
          width: '100%',
          height: modalOptions.height
        }
      }),
      dialogClassName: "modal-lti",
      onClose: handleModalClose,
      open: true
    })]
  });
};
ContentIFrame.propTypes = {
  iframeUrl: _propTypes.default.string,
  id: _propTypes.default.string.isRequired,
  shouldShowContent: _propTypes.default.bool.isRequired,
  loadingMessage: _propTypes.default.node.isRequired,
  elementId: _propTypes.default.string.isRequired,
  onLoaded: _propTypes.default.func,
  title: _propTypes.default.node.isRequired
};
ContentIFrame.defaultProps = {
  iframeUrl: null,
  onLoaded: () => ({})
};
var _default = ContentIFrame;
exports.default = _default;
//# sourceMappingURL=ContentIFrame.js.map