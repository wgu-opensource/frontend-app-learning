"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAlert = useAlert;
var _react = require("react");
var _UserMessagesContext = _interopRequireDefault(require("./UserMessagesContext"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable import/prefer-default-export */

function useAlert(isVisible, _ref) {
  let {
    code,
    text,
    topic,
    type,
    payload,
    dismissible
  } = _ref;
  const {
    add,
    remove
  } = (0, _react.useContext)(_UserMessagesContext.default);

  // Please note:
  // The deps list [isVisible, code, ... etc.] in this `useEffect` call prevents the
  // effect from running if none of deps have changed. However, "changed" for objects is
  // defined in terms of identity; thus, if you provide a payload that is *seemingly* equal
  // to the previous one but *actually* a different object, then this effect will run.
  // If you are particularly unlucky, this will cause an infinite re-render loop.
  // This manifested itself in TNL-7400.
  // We hope to address the underlying issue in TNL-7418.
  // In the mean time, you may follow the pattern that `useAccessExpirationAlert`
  // establishes: memoize the payload so that the exact same object is used if the
  // payload has not changed. And don't put values based off of now() in your payload, as
  // that breaks memoization.
  (0, _react.useEffect)(() => {
    if (!isVisible) {
      return undefined;
    }
    const cleanupId = add({
      code,
      text,
      topic,
      type,
      payload,
      dismissible
    });
    return () => {
      remove(cleanupId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, code, text, topic, type, payload, dismissible]);
}
//# sourceMappingURL=hooks.js.map