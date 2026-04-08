"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCourseEndAlert = useCourseEndAlert;
var _react = _interopRequireWildcard(require("react"));
var _userMessages = require("../../../../generic/user-messages");
var _modelStore = require("../../../../generic/model-store");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); } /* eslint-disable import/prefer-default-export */
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