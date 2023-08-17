"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _analytics = require("@edx/frontend-platform/analytics");

var _userMessages = require("../../generic/user-messages");

var _api = require("./data/api");

// Separated into its own file to avoid a circular dependency inside this directory
function useEnrollClickHandler(courseId, orgId, successText) {
  const [loading, setLoading] = (0, _react.useState)(false);
  const {
    addFlash
  } = (0, _react.useContext)(_userMessages.UserMessagesContext);
  const enrollClickHandler = (0, _react.useCallback)(() => {
    setLoading(true);
    (0, _api.postCourseEnrollment)(courseId).then(() => {
      addFlash({
        dismissible: true,
        flash: true,
        text: successText,
        type: _userMessages.ALERT_TYPES.SUCCESS,
        topic: 'course'
      });
      setLoading(false);
      (0, _analytics.sendTrackEvent)('edx.bi.user.course-home.enrollment', {
        org_key: orgId,
        courserun_key: courseId
      });
      global.location.reload();
    });
  }, [courseId]);
  return {
    enrollClickHandler,
    loading
  };
}

var _default = useEnrollClickHandler;
exports.default = _default;
//# sourceMappingURL=clickHook.js.map