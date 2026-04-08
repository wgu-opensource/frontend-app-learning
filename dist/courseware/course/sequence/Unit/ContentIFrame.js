"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testIDs = exports.default = exports.IFRAME_FEATURE_POLICY = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _paragon = require("@openedx/paragon");
var _ContentIFrameLoaderSlot = require("../../../../plugin-slots/ContentIFrameLoaderSlot");
var _ContentIFrameErrorSlot = require("../../../../plugin-slots/ContentIFrameErrorSlot");
var hooks = _interopRequireWildcard(require("./hooks"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
const IFRAME_FEATURE_POLICY = exports.IFRAME_FEATURE_POLICY = 'microphone *; camera *; midi *; geolocation *; encrypted-media *; clipboard-write *; autoplay *';
const testIDs = exports.testIDs = {
  contentIFrame: 'content-iframe-test-id',
  modalIFrame: 'modal-iframe-test-id'
};
const ContentIFrame = ({
  iframeUrl,
  shouldShowContent,
  loadingMessage,
  id,
  elementId,
  onLoaded,
  title,
  courseId
}) => {
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
    children: [shouldShowContent && !hasLoaded && (showError ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ContentIFrameErrorSlot.ContentIFrameErrorSlot, {
      courseId: courseId
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_ContentIFrameLoaderSlot.ContentIFrameLoaderSlot, {
      courseId: courseId,
      loadingMessage: loadingMessage
    })), shouldShowContent && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "unit-iframe-wrapper",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("iframe", _objectSpread(_objectSpread({
        title: title
      }, contentIFrameProps), {}, {
        "data-testid": testIDs.contentIFrame
      }))
    }), modalOptions.isOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.ModalDialog, {
      dialogClassName: "modal-lti",
      onClose: handleModalClose,
      size: modalOptions.isFullscreen ? 'fullscreen' : 'md',
      isOpen: true,
      hasCloseButton: false,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.ModalDialog.Body, {
        className: modalOptions.modalBodyClassName,
        children: modalOptions.body ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
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
        })
      })
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
  title: _propTypes.default.node.isRequired,
  courseId: _propTypes.default.string
};
ContentIFrame.defaultProps = {
  iframeUrl: null,
  onLoaded: () => ({}),
  courseId: ''
};
var _default = exports.default = ContentIFrame;
//# sourceMappingURL=ContentIFrame.js.map