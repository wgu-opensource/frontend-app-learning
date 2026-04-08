"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _modelStore = require("../../../generic/model-store");
var _Day = _interopRequireDefault(require("./Day"));
var _utils = require("../utils");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const Timeline = () => {
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    courseDateBlocks
  } = (0, _modelStore.useModel)('dates', courseId);

  // Group date items by day (assuming they are sorted in first place) and add some metadata
  const groupedDates = [];
  const now = new Date();
  let foundNextDue = false;
  let foundToday = false;
  courseDateBlocks.forEach(courseDateBlock => {
    const dateInfo = _objectSpread({}, courseDateBlock);
    const parsedDate = new Date(dateInfo.date);
    if (!foundNextDue && parsedDate >= now && (0, _utils.isLearnerAssignment)(dateInfo) && !dateInfo.complete) {
      foundNextDue = true;
      dateInfo.dueNext = true;
    }
    if (!foundToday) {
      const compared = (0, _utils.daycmp)(parsedDate, now);
      if (compared === 0) {
        foundToday = true;
      } else if (compared > 0) {
        foundToday = true;
        groupedDates.push({
          date: now,
          items: []
        });
      }
    }
    if (groupedDates.length === 0 || (0, _utils.daycmp)(groupedDates[groupedDates.length - 1].date, parsedDate) !== 0) {
      // Add new grouped date
      groupedDates.push({
        date: parsedDate,
        items: [dateInfo],
        first: groupedDates.length === 0
      });
    } else {
      groupedDates[groupedDates.length - 1].items.push(dateInfo);
    }
  });
  if (!foundToday) {
    groupedDates.push({
      date: now,
      items: []
    });
  }
  if (groupedDates.length) {
    groupedDates[groupedDates.length - 1].last = true;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
    className: "list-unstyled m-0 mt-4 pt-2",
    children: groupedDates.map(groupedDate => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Day.default, _objectSpread({}, groupedDate), groupedDate.date))
  });
};
var _default = exports.default = Timeline;
//# sourceMappingURL=Timeline.js.map