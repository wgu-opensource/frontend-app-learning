"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Timeline;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _modelStore = require("../../../generic/model-store");

var _Day = _interopRequireDefault(require("./Day"));

var _utils = require("../utils");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** [MM-P2P] Experiment (argument) */
function Timeline(_ref) {
  let {
    mmp2p
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    courseDateBlocks
  } = (0, _modelStore.useModel)('dates', courseId); // Group date items by day (assuming they are sorted in first place) and add some metadata

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
    children: groupedDates.map(groupedDate => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Day.default, _objectSpread(_objectSpread({}, groupedDate), {}, {
      mmp2p: mmp2p
    }), groupedDate.date))
  });
}
/** [MM-P2P] Experiment */


Timeline.propTypes = {
  mmp2p: _propTypes.default.shape({})
};
Timeline.defaultProps = {
  mmp2p: {}
};
//# sourceMappingURL=Timeline.js.map