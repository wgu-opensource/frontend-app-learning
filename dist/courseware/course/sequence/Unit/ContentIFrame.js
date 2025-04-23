"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testIDs = exports.default = exports.IFRAME_FEATURE_POLICY = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@edx/frontend-platform/react");
var _reactUnitTestUtils = require("@edx/react-unit-test-utils");
var _paragon = require("@openedx/paragon");
var _PageLoading = _interopRequireDefault(require("@src/generic/PageLoading"));
var hooks = _interopRequireWildcard(require("./hooks"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Feature policy for iframe, allowing access to certain courseware-related media.
 *
 * We must use the wildcard (*) origin for each feature, as courseware content
 * may be embedded in external iframes. Notably, xblock-lti-consumer is a popular
 * block that iframes external course content.

 * This policy was selected in conference with the edX Security Working Group.
 * Changes to it should be vetted by them (security@edx.org).
 */
const IFRAME_FEATURE_POLICY = exports.IFRAME_FEATURE_POLICY = 'microphone *; camera *; midi *; geolocation *; encrypted-media *, clipboard-write *';
const testIDs = exports.testIDs = (0, _reactUnitTestUtils.StrictDict)({
  contentIFrame: 'content-iframe-test-id',
  modalIFrame: 'modal-iframe-test-id'
});
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
  let modalContent;
  if (modalOptions.isOpen) {
    modalContent = modalOptions.body ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
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
    });
  }
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
    }), modalOptions.isOpen && (modalOptions.isFullscreen ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.ModalDialog, {
      dialogClassName: "modal-lti",
      onClose: handleModalClose,
      size: "fullscreen",
      isOpen: true,
      hasCloseButton: false,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.ModalDialog.Body, {
        className: modalOptions.modalBodyClassName,
        children: modalContent
      })
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Modal, {
      body: modalContent,
      dialogClassName: "modal-lti",
      onClose: handleModalClose,
      open: true
    }))]
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
var _default = exports.default = ContentIFrame;
//# sourceMappingURL=ContentIFrame.js.map