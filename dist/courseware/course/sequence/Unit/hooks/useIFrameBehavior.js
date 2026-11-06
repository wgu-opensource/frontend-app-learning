"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stateKeys = exports.default = void 0;
var _frontendPlatform = require("@edx/frontend-platform");
var _analytics = require("@edx/frontend-platform/analytics");
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _lodash = require("lodash");
var _reactUnitTestUtils = require("@edx/react-unit-test-utils");
var _logging = require("@edx/frontend-platform/logging");
var _data = require("../../../../data");
var _thunks = require("../../../../../course-home/data/thunks");
var _hooks = require("../../../../../generic/hooks");
var _constants = require("../constants");
var _useLoadBearingHook = _interopRequireDefault(require("./useLoadBearingHook"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const stateKeys = exports.stateKeys = (0, _reactUnitTestUtils.StrictDict)({
  iframeHeight: 'iframeHeight',
  hasLoaded: 'hasLoaded',
  showError: 'showError',
  windowTopOffset: 'windowTopOffset'
});
const useIFrameBehavior = _ref => {
  let {
    elementId,
    id,
    iframeUrl,
    onLoaded
  } = _ref;
  // Do not remove this hook.  See function description.
  (0, _useLoadBearingHook.default)(id);
  const dispatch = (0, _reactRedux.useDispatch)();
  const [iframeHeight, setIframeHeight] = (0, _reactUnitTestUtils.useKeyedState)(stateKeys.iframeHeight, 0);
  const [hasLoaded, setHasLoaded] = (0, _reactUnitTestUtils.useKeyedState)(stateKeys.hasLoaded, false);
  const [showError, setShowError] = (0, _reactUnitTestUtils.useKeyedState)(stateKeys.showError, false);
  const [windowTopOffset, setWindowTopOffset] = (0, _reactUnitTestUtils.useKeyedState)(stateKeys.windowTopOffset, null);
  _react.default.useEffect(() => {
    const frame = document.getElementById(elementId);
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
  }, [id, onLoaded, iframeHeight, hasLoaded]);
  const receiveMessage = _react.default.useCallback(_ref2 => {
    let {
      data
    } = _ref2;
    const {
      type,
      payload
    } = data;
    if (type === _constants.messageTypes.resize) {
      setIframeHeight(payload.height);
      if (!hasLoaded && iframeHeight === 0 && payload.height > 0) {
        setHasLoaded(true);
        if (onLoaded) {
          onLoaded();
        }
      }
    } else if (type === _constants.messageTypes.videoFullScreen) {
      // We observe exit from the video xblock fullscreen mode
      // and scroll to the previously saved scroll position
      if (!payload.open && windowTopOffset !== null) {
        window.scrollTo(0, Number(windowTopOffset));
      }

      // We listen for this message from LMS to know when we need to
      // save or reset scroll position on toggle video xblock fullscreen mode
      setWindowTopOffset(payload.open ? window.scrollY : null);
    } else if (data.offset) {
      // We listen for this message from LMS to know when the page needs to
      // be scrolled to another location on the page.
      window.scrollTo(0, data.offset + document.getElementById('unit-iframe').offsetTop);
    }
  }, [id, onLoaded, hasLoaded, setHasLoaded, iframeHeight, setIframeHeight, windowTopOffset, setWindowTopOffset]);
  (0, _hooks.useEventListener)('message', receiveMessage);

  // Send visibility status to the iframe. It's used to mark XBlocks as viewed.
  _react.default.useEffect(() => {
    if (!hasLoaded) {
      return undefined;
    }
    const iframeElement = document.getElementById(elementId);
    if (!iframeElement || !iframeElement.contentWindow) {
      return undefined;
    }
    const updateIframeVisibility = () => {
      const rect = iframeElement.getBoundingClientRect();
      const visibleInfo = {
        type: 'unit.visibilityStatus',
        data: {
          topPosition: rect.top,
          viewportHeight: window.innerHeight
        }
      };
      iframeElement.contentWindow.postMessage(visibleInfo, `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}`);
    };

    // Throttle the update function to prevent it from sending too many messages to the iframe.
    const throttledUpdateVisibility = (0, _lodash.throttle)(updateIframeVisibility, 100);

    // Update the visibility of the iframe in case the element is already visible.
    updateIframeVisibility();

    // Add event listeners to update the visibility of the iframe when the window is scrolled or resized.
    window.addEventListener('scroll', throttledUpdateVisibility);
    window.addEventListener('resize', throttledUpdateVisibility);

    // Clean up event listeners on unmount.
    return () => {
      window.removeEventListener('scroll', throttledUpdateVisibility);
      window.removeEventListener('resize', throttledUpdateVisibility);
    };
  }, [hasLoaded, elementId]);

  /**
  * onLoad *should* only fire after everything in the iframe has finished its own load events.
  * Which means that the plugin.resize message (which calls setHasLoaded above) will have fired already
  * for a successful load. If it *has not fired*, we are in an error state. For example, the backend
  * could have given us a 4xx or 5xx response.
  */

  const handleIFrameLoad = () => {
    if (!hasLoaded) {
      setShowError(true);
      (0, _analytics.sendTrackEvent)('edx.bi.error.learning.iframe_load_failed', {
        iframeUrl,
        unitId: id
      });
      (0, _logging.logError)('Unit iframe failed to load. Server possibly returned 4xx or 5xx response.', {
        iframeUrl
      });
    }
    window.onmessage = e => {
      if (e.data.event_name) {
        dispatch((0, _thunks.processEvent)(e.data, _data.fetchCourse));
      }
    };
  };
  _react.default.useEffect(() => {
    setIframeHeight(0);
    setHasLoaded(false);
  }, [iframeUrl]);
  return {
    iframeHeight,
    handleIFrameLoad,
    showError,
    hasLoaded
  };
};
var _default = exports.default = useIFrameBehavior;
//# sourceMappingURL=useIFrameBehavior.js.map