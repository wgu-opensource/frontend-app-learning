"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _icons = require("@edx/paragon/icons");
var _target = _interopRequireDefault(require("./assets/target.svg"));
var _messages = _interopRequireDefault(require("./messages"));
var _utils = require("./utils");
var _modelStore = require("../../../generic/model-store");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["courseId", "daysPerWeek", "intl", "isOpen", "onClose"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const WeeklyGoalCelebrationModal = _ref => {
  let {
      courseId,
      daysPerWeek,
      intl,
      isOpen,
      onClose
    } = _ref,
    rest = _objectWithoutProperties(_ref, _excluded);
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
  intl: _i18n.intlShape.isRequired,
  isOpen: _propTypes.default.bool.isRequired,
  onClose: _propTypes.default.func.isRequired
};
var _default = (0, _i18n.injectIntl)(WeeklyGoalCelebrationModal);
exports.default = _default;
//# sourceMappingURL=WeeklyGoalCelebrationModal.js.map