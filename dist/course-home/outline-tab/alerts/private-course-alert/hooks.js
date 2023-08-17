"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePrivateCourseAlert = usePrivateCourseAlert;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@edx/frontend-platform/react");

var _userMessages = require("../../../../generic/user-messages");

var _modelStore = require("../../../../generic/model-store");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const PrivateCourseAlert = /*#__PURE__*/_react.default.lazy(() => Promise.resolve().then(() => _interopRequireWildcard(require('./PrivateCourseAlert'))));

function usePrivateCourseAlert(courseId) {
  const {
    authenticatedUser
  } = (0, _react.useContext)(_react2.AppContext);
  const course = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const outline = (0, _modelStore.useModel)('outline', courseId);
  const enrolledUser = course && course.isEnrolled !== undefined && course.isEnrolled;
  const privateOutline = outline && outline.courseBlocks && !outline.courseBlocks.courses;
  /**
   * This alert should render if the user is not enrolled AND
   *    1. the user is anonymous AND the outline is private, OR
   *    2. the user is authenticated.
   * */

  const isVisible = !enrolledUser && (privateOutline || authenticatedUser !== null);
  const payload = {
    anonymousUser: authenticatedUser === null,
    canEnroll: outline && outline.enrollAlert ? outline.enrollAlert.canEnroll : false,
    courseId
  };
  (0, _userMessages.useAlert)(isVisible, {
    code: 'clientPrivateCourseAlert',
    dismissible: false,
    payload: (0, _react.useMemo)(() => payload, Object.values(payload).sort()),
    topic: 'outline-private-alerts',
    type: _userMessages.ALERT_TYPES.WELCOME
  });
  return {
    clientPrivateCourseAlert: PrivateCourseAlert
  };
}
//# sourceMappingURL=hooks.js.map