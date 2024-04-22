"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.sendUrlHashToFrame = sendUrlHashToFrame;
var _frontendPlatform = require("@edx/frontend-platform");
var _i18n = require("@edx/frontend-platform/i18n");
var _react = require("@edx/frontend-platform/react");
var _paragon = require("@edx/paragon");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react2 = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _thunks = require("../../../course-home/data/thunks");
var _hooks = require("../../../generic/hooks");
var _modelStore = require("../../../generic/model-store");
var _PageLoading = _interopRequireDefault(require("../../../generic/PageLoading"));
var _data = require("../../data");
var _BookmarkButton = _interopRequireDefault(require("../bookmark/BookmarkButton"));
var _ShareButton = _interopRequireDefault(require("../share/ShareButton"));
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const HonorCode = /*#__PURE__*/_react2.default.lazy(() => Promise.resolve().then(() => _interopRequireWildcard(require('./honor-code'))));
const LockPaywall = /*#__PURE__*/_react2.default.lazy(() => Promise.resolve().then(() => _interopRequireWildcard(require('./lock-paywall'))));

/**
 * Feature policy for iframe, allowing access to certain courseware-related media.
 *
 * We must use the wildcard (*) origin for each feature, as courseware content
 * may be embedded in external iframes. Notably, xblock-lti-consumer is a popular
 * block that iframes external course content.

 * This policy was selected in conference with the edX Security Working Group.
 * Changes to it should be vetted by them (security@edx.org).
 */
const IFRAME_FEATURE_POLICY = 'microphone *; camera *; midi *; geolocation *; encrypted-media *';

/**
 * We discovered an error in Firefox where - upon iframe load - React would cease to call any
 * useEffect hooks until the user interacts with the page again.  This is particularly confusing
 * when navigating between sequences, as the UI partially updates leaving the user in a nebulous
 * state.
 *
 * We were able to solve this error by using a layout effect to update some component state, which
 * executes synchronously on render.  Somehow this forces React to continue it's lifecycle
 * immediately, rather than waiting for user interaction.  This layout effect could be anywhere in
 * the parent tree, as far as we can tell - we chose to add a conspicuously 'load bearing' (that's
 * a joke) one here so it wouldn't be accidentally removed elsewhere.
 *
 * If we remove this hook when one of these happens:
 * 1. React figures out that there's an issue here and fixes a bug.
 * 2. We cease to use an iframe for unit rendering.
 * 3. Firefox figures out that there's an issue in their iframe loading and fixes a bug.
 * 4. We stop supporting Firefox.
 * 5. An enterprising engineer decides to create a repo that reproduces the problem, submits it to
 *    Firefox/React for review, and they kindly help us figure out what in the world is happening
 *    so  we can fix it.
 *
 * This hook depends on the unit id just to make sure it re-evaluates whenever the ID changes.  If
 * we change whether or not the Unit component is re-mounted when the unit ID changes, this may
 * become important, as this hook will otherwise only evaluate the useLayoutEffect once.
 */
function useLoadBearingHook(id) {
  const setValue = (0, _react2.useState)(0)[1];
  (0, _react2.useLayoutEffect)(() => {
    setValue(currentValue => currentValue + 1);
  }, [id]);
}
function sendUrlHashToFrame(frame) {
  const {
    hash
  } = window.location;
  if (hash) {
    // The url hash will be sent to LMS-served iframe in order to find the location of the
    // hash within the iframe.
    frame.contentWindow.postMessage({
      hashName: hash
    }, `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}`);
  }
}
const Unit = _ref => {
  let {
    courseId,
    format,
    onLoaded,
    id,
    intl
  } = _ref;
  const {
    authenticatedUser
  } = (0, _react2.useContext)(_react.AppContext);
  const view = authenticatedUser ? 'student_view' : 'public_view';
  let iframeUrl = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/xblock/${id}?show_title=0&show_bookmark_button=0&recheck_access=1&view=${view}`;
  if (format) {
    iframeUrl += `&format=${format}`;
  }
  const [iframeHeight, setIframeHeight] = (0, _react2.useState)(0);
  const [hasLoaded, setHasLoaded] = (0, _react2.useState)(false);
  const [showError, setShowError] = (0, _react2.useState)(false);
  const [modalOptions, setModalOptions] = (0, _react2.useState)({
    open: false
  });
  const [shouldDisplayHonorCode, setShouldDisplayHonorCode] = (0, _react2.useState)(false);
  const [windowTopOffset, setWindowTopOffset] = (0, _react2.useState)(null);
  const unit = (0, _modelStore.useModel)('units', id);
  const course = (0, _modelStore.useModel)('coursewareMeta', courseId);
  const {
    contentTypeGatingEnabled,
    userNeedsIntegritySignature
  } = course;
  const dispatch = (0, _reactRedux.useDispatch)();
  // Do not remove this hook.  See function description.
  useLoadBearingHook(id);
  (0, _react2.useEffect)(() => {
    if (userNeedsIntegritySignature && unit.graded) {
      setShouldDisplayHonorCode(true);
    } else {
      setShouldDisplayHonorCode(false);
    }
  }, [userNeedsIntegritySignature]);
  const receiveMessage = (0, _react2.useCallback)(_ref2 => {
    let {
      data
    } = _ref2;
    const {
      type,
      payload
    } = data;
    if (type === 'plugin.resize') {
      setIframeHeight(payload.height);

      // We observe exit from the video xblock full screen mode
      // and do page scroll to the previously saved scroll position
      if (windowTopOffset !== null) {
        window.scrollTo(0, Number(windowTopOffset));
      }
      if (!hasLoaded && iframeHeight === 0 && payload.height > 0) {
        setHasLoaded(true);
        if (onLoaded) {
          onLoaded();
        }
      }
    } else if (type === 'plugin.modal') {
      payload.open = true;
      setModalOptions(payload);
    } else if (type === 'plugin.videoFullScreen') {
      // We listen for this message from LMS to know when we need to
      // save or reset scroll position on toggle video xblock full screen mode.
      setWindowTopOffset(payload.open ? window.scrollY : null);
    } else if (data.offset) {
      // We listen for this message from LMS to know when the page needs to
      // be scrolled to another location on the page.
      window.scrollTo(0, data.offset + document.getElementById('unit-iframe').offsetTop);
    }
  }, [id, setIframeHeight, hasLoaded, iframeHeight, setHasLoaded, onLoaded, setWindowTopOffset, windowTopOffset]);
  (0, _hooks.useEventListener)('message', receiveMessage);
  (0, _react2.useEffect)(() => {
    sendUrlHashToFrame(document.getElementById('unit-iframe'));
  }, [id, setIframeHeight, hasLoaded, iframeHeight, setHasLoaded, onLoaded]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "unit",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
      className: "mb-0 h3",
      children: unit.title
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
      className: "sr-only",
      children: intl.formatMessage(_messages.default.headerPlaceholder)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BookmarkButton.default, {
      unitId: unit.id,
      isBookmarked: unit.bookmarked,
      isProcessing: unit.bookmarkedUpdateState === 'loading'
    }), window.expSocialShareAboutUrls && window.expSocialShareAboutUrls[unit.id] !== undefined && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShareButton.default, {
      url: window.expSocialShareAboutUrls[unit.id]
    }), contentTypeGatingEnabled && unit.containsContentTypeGatedContent && /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.Suspense, {
      fallback: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageLoading.default, {
        srMessage: intl.formatMessage(_messages.default.loadingLockedContent)
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(LockPaywall, {
        courseId: courseId
      })
    }), shouldDisplayHonorCode && /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.Suspense, {
      fallback: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageLoading.default, {
        srMessage: intl.formatMessage(_messages.default.loadingHonorCode)
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(HonorCode, {
        courseId: courseId
      })
    }), !shouldDisplayHonorCode && !hasLoaded && !showError && /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageLoading.default, {
      srMessage: intl.formatMessage(_messages.default.loadingSequence)
    }), !shouldDisplayHonorCode && !hasLoaded && showError && /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.ErrorPage, {}), modalOptions.open && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Modal, {
      body: /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
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
            height: '100vh'
          }
        })
      }),
      onClose: () => {
        setModalOptions({
          open: false
        });
      },
      open: true,
      dialogClassName: "modal-lti"
    }), !shouldDisplayHonorCode && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "unit-iframe-wrapper",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("iframe", {
        id: "unit-iframe",
        title: unit.title,
        src: iframeUrl,
        allow: IFRAME_FEATURE_POLICY,
        allowFullScreen: true,
        height: iframeHeight,
        scrolling: "no",
        referrerPolicy: "origin",
        onLoad: () => {
          // onLoad *should* only fire after everything in the iframe has finished its own load events.
          // Which means that the plugin.resize message (which calls setHasLoaded above) will have fired already
          // for a successful load. If it *has not fired*, we are in an error state. For example, the backend
          // could have given us a 4xx or 5xx response.
          if (!hasLoaded) {
            setShowError(true);
          }
          window.onmessage = e => {
            if (e.data.event_name) {
              dispatch((0, _thunks.processEvent)(e.data, _data.fetchCourse));
            }
          };
        }
      })
    })]
  });
};
Unit.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  format: _propTypes.default.string,
  id: _propTypes.default.string.isRequired,
  intl: _i18n.intlShape.isRequired,
  onLoaded: _propTypes.default.func
};
Unit.defaultProps = {
  format: null,
  onLoaded: undefined
};
var _default = (0, _i18n.injectIntl)(Unit);
exports.default = _default;
//# sourceMappingURL=Unit.js.map