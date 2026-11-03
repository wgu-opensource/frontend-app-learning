"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _userMessages = require("../../../../generic/user-messages");
var _modelStore = require("../../../../generic/model-store");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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