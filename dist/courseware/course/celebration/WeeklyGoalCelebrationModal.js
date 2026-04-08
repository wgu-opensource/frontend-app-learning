"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _target = _interopRequireDefault(require("./assets/target.svg"));
var _messages = _interopRequireDefault(require("./messages"));
var _utils = require("./utils");
var _modelStore = require("../../../generic/model-store");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["courseId", "daysPerWeek", "isOpen", "onClose"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const WeeklyGoalCelebrationModal = _ref => {
  let {
      courseId,
      daysPerWeek,
      isOpen,
      onClose
    } = _ref,
    rest = _objectWithoutProperties(_ref, _excluded);
  const intl = (0, _i18n.useIntl)();
  const {
    org
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  (0, _react.useEffect)(() => {
    if (isOpen) {
      (0, _utils.recordWeeklyGoalCelebration)(org, courseId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.StandardModal, _objectSpread(_objectSpread({
    footerNode: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.ActionRow, {
      isStacked: true,
      className: "pb-2",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
        onClick: onClose,
        children: intl.formatMessage(_messages.default.keepItUp)
      })
    }),
    hasCloseButton: false,
    isOpen: isOpen,
    onClose: onClose,
    title: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "h2 text-center mr-n5 pt-4",
      children: intl.formatMessage(_messages.default.goalMet)
    })
  }, rest), {}, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "text-center px-3",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
          id: "learning.celebration.goalCongrats",
          defaultMessage: "Congratulations, you met your learning goal of {nTimes} a week.",
          description: "Greeting for learners for their weekly goal, it as well indicate their gaol, i.e. (1,3 or 5 time(s) a week)",
          values: {
            nTimes: /*#__PURE__*/(0, _jsxRuntime.jsxs)("strong", {
              children: [daysPerWeek, " ", daysPerWeek === 1 ? 'time' : 'times']
            })
          }
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "d-flex justify-content-center py-4.5",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
          src: _target.default,
          alt: ""
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "py-3 pl-3 bg-light-300 small d-inline-flex",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
          src: _icons.Lightbulb,
          className: "mr-2",
          style: {
            height: '21px',
            width: '22px'
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "learning.celebration.setGoal",
            defaultMessage: "Setting a goal can help you {strongText} in your course.",
            description: "It explain the advantages of setting goal",
            values: {
              strongText: /*#__PURE__*/(0, _jsxRuntime.jsx)("strong", {
                children: "achieve higher performance"
              })
            }
          })
        })]
      })]
    })
  }));
};
WeeklyGoalCelebrationModal.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  daysPerWeek: _propTypes.default.number.isRequired,
  isOpen: _propTypes.default.bool.isRequired,
  onClose: _propTypes.default.func.isRequired
};
var _default = exports.default = WeeklyGoalCelebrationModal;
//# sourceMappingURL=WeeklyGoalCelebrationModal.js.map