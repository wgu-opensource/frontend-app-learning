"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _reactRedux = require("react-redux");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _faInfoCircle = require("@fortawesome/free-solid-svg-icons/faInfoCircle");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _modelStore = require("../../../generic/model-store");
var _badgelist = require("./badgelist");
var _utils = require("../utils");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const Day = _ref => {
  let {
    date,
    first,
    intl,
    items,
    last
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    userTimezone
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const timezoneFormatArgs = userTimezone ? {
    timeZone: userTimezone
  } : {};
  const {
    color,
    badges
  } = (0, _badgelist.getBadgeListAndColor)(date, intl, null, items);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
    className: "dates-day pb-4",
    "data-testid": "dates-day",
    children: [!first && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "dates-line-top border-1 border-left border-gray-900 bg-gray-900"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: (0, _classnames.default)(color, 'dates-dot border border-gray-900')
    }), !last && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "dates-line-bottom border-1 border-left border-gray-900 bg-gray-900"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "d-inline-block ml-3 pl-2",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "row w-100 m-0 mb-1 align-items-center text-primary-700",
        "data-testid": "dates-header",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedDate, _objectSpread({
          value: date,
          day: "numeric",
          month: "short",
          weekday: "short",
          year: "numeric"
        }, timezoneFormatArgs)), badges]
      }), items.map(item => {
        const {
          badges: itemBadges
        } = (0, _badgelist.getBadgeListAndColor)(date, intl, item, items);
        const showDueDateTime = item.dateType === 'assignment-due-date';
        const showLink = item.link && (0, _utils.isLearnerAssignment)(item);
        const title = showLink ? /*#__PURE__*/(0, _jsxRuntime.jsx)("u", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
            href: item.link,
            className: "text-reset",
            children: item.title
          })
        }) : item.title;
        const available = item.learnerHasAccess && (item.link || !(0, _utils.isLearnerAssignment)(item));
        const textColor = available ? 'text-primary-700' : 'text-gray-500';
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: (0, _classnames.default)(textColor, 'small pb-1'),
          "data-testid": "dates-item",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
              className: "small",
              children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
                className: "font-weight-bold",
                children: [item.assignmentType && `${item.assignmentType}: `, title]
              }), showDueDateTime && /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                  className: "mx-1",
                  children: "due"
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedTime, _objectSpread({
                  value: date,
                  timeZoneName: "short"
                }, timezoneFormatArgs))]
              })]
            }), itemBadges, item.extraInfo && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.OverlayTrigger, {
              placement: "bottom",
              overlay: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Tooltip, {
                children: item.extraInfo
              }),
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
                icon: _faInfoCircle.faInfoCircle,
                className: "fa-xs ml-1 text-gray-700",
                "data-testid": "dates-extra-info"
              })
            })]
          }), item.description && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "small mb-2",
            children: item.description
          })]
        }, item.title + item.date);
      })]
    })]
  });
};
Day.propTypes = {
  date: _propTypes.default.objectOf(Date).isRequired,
  first: _propTypes.default.bool,
  intl: _i18n.intlShape.isRequired,
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    date: _propTypes.default.string,
    dateType: _propTypes.default.string,
    description: _propTypes.default.string,
    dueNext: _propTypes.default.bool,
    learnerHasAccess: _propTypes.default.bool,
    link: _propTypes.default.string,
    title: _propTypes.default.string
  })).isRequired,
  last: _propTypes.default.bool
};
Day.defaultProps = {
  first: false,
  last: false
};
var _default = (0, _i18n.injectIntl)(Day);
exports.default = _default;
//# sourceMappingURL=Day.js.map