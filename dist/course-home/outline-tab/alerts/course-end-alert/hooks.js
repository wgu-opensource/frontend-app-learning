"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCourseEndAlert = useCourseEndAlert;
var _react = _interopRequireWildcard(require("react"));
var _userMessages = require("../../../../generic/user-messages");
var _modelStore = require("../../../../generic/model-store");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; } /* eslint-disable import/prefer-default-export */
const CourseEndAlert = /*#__PURE__*/_react.default.lazy(() => Promise.resolve().then(() => _interopRequireWildcard(require('./CourseEndAlert'))));

// period of time (in ms) before end of course during which we alert
const WARNING_PERIOD_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

function useCourseEndAlert(courseId) {
  const {
    isEnrolled
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    datesWidget: {
      courseDateBlocks
    },
    userTimezone
  } = (0, _modelStore.useModel)('outline', courseId);
  const endBlock = courseDateBlocks.find(b => b.dateType === 'course-end-date');
  const endDate = endBlock ? new Date(endBlock.date) : null;
  const delta = endBlock ? endDate - new Date() : 0;
  const isVisible = isEnrolled && endBlock && delta > 0 && delta < WARNING_PERIOD_MS;
  const payload = (0, _react.useMemo)(() => ({
    description: endBlock && endBlock.description,
    endDate: endBlock && endBlock.date,
    userTimezone
  }), [endBlock, userTimezone]);
  (0, _userMessages.useAlert)(isVisible, {
    code: 'clientCourseEndAlert',
    payload,
    topic: 'outline-course-alerts'
  });
  return {
    clientCourseEndAlert: CourseEndAlert
  };
}
//# sourceMappingURL=hooks.js.map