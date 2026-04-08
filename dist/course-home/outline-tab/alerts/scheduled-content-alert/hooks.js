"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _userMessages = require("../../../../generic/user-messages");
var _modelStore = require("../../../../generic/model-store");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
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
var _default = exports.default = useScheduledContentAlert;
//# sourceMappingURL=hooks.js.map