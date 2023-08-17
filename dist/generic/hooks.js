"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEventListener = useEventListener;
exports.useIFrameHeight = useIFrameHeight;
exports.useIFramePluginEvents = useIFramePluginEvents;

var _react = require("react");

/* eslint-disable import/prefer-default-export */
function useEventListener(type, handler) {
  // We use this ref so that we can hold a reference to the currently active event listener.
  const eventListenerRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    // If we currently have an event listener, remove it.
    if (eventListenerRef.current !== null) {
      global.removeEventListener(type, eventListenerRef.current);
      eventListenerRef.current = null;
    } // Now add our new handler as the event listener.


    global.addEventListener(type, handler); // And then save it to our ref for next time.

    eventListenerRef.current = handler; // When the component finally unmounts, use the ref to remove the correct handler.

    return () => global.removeEventListener(type, eventListenerRef.current);
  }, [type, handler]);
}
/**
 * Hooks up post messages to callbacks
 * @param {Object.<string, function>} events A mapping of message type to callback
 */


function useIFramePluginEvents(events) {
  const receiveMessage = (0, _react.useCallback)(_ref => {
    let {
      data
    } = _ref;
    const {
      type,
      payload
    } = data;

    if (events[type]) {
      events[type](payload);
    }
  }, [events]);
  useEventListener('message', receiveMessage);
}
/**
 * A hook to monitor message about changes in iframe content height
 * @param onIframeLoaded A callback for when the frame is loaded
 * @returns {[boolean, number]}
 */


function useIFrameHeight() {
  let onIframeLoaded = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  const [iframeHeight, setIframeHeight] = (0, _react.useState)(null);
  const [hasLoaded, setHasLoaded] = (0, _react.useState)(false);
  const receiveResizeMessage = (0, _react.useCallback)(_ref2 => {
    let {
      height
    } = _ref2;
    setIframeHeight(height);

    if (!hasLoaded && !iframeHeight && height > 0) {
      setHasLoaded(true);

      if (onIframeLoaded) {
        onIframeLoaded();
      }
    }
  }, [setIframeHeight, hasLoaded, iframeHeight, setHasLoaded, onIframeLoaded]);
  useIFramePluginEvents({
    'plugin.resize': receiveResizeMessage
  });
  return [hasLoaded, iframeHeight];
}
//# sourceMappingURL=hooks.js.map