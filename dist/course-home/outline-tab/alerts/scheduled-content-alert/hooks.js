"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _userMessages = require("../../../../generic/user-messages");
var _modelStore = require("../../../../generic/model-store");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ScheduledContentAlert = /*#__PURE__*/_react.default.lazy(() => Promise.resolve().then(() => _interopRequireWildcard(require('./ScheduledCotentAlert'))));
const useScheduledContentAlert = courseId => {
  const {
    courseBlocks: {
      courses
    },
    datesWidget: {
      datesTabLink
    }
  } = (0, _modelStore.useModel)('outline', courseId);
  const hasScheduledContent = !!courses && !!Object.values(courses).find(course => course.hasScheduledContent === true);
  const {
    isEnrolled
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const payload = (0, _react.useMemo)(() => ({
    datesTabLink
  }), [datesTabLink]);
  (0, _userMessages.useAlert)(hasScheduledContent && isEnrolled, {
    code: 'ScheduledContentAlert',
    payload,
    topic: 'outline-course-alerts'
  });
  return {
    ScheduledContentAlert
  };
};
var _default = useScheduledContentAlert;
exports.default = _default;
//# sourceMappingURL=hooks.js.map