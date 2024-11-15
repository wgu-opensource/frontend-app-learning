"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _reactRouterDom = require("react-router-dom");
var _i18n = require("@edx/frontend-platform/i18n");
var _faCheckCircle = require("@fortawesome/free-solid-svg-icons/faCheckCircle");
var _faCheckCircle2 = require("@fortawesome/free-regular-svg-icons/faCheckCircle");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _effortEstimate = _interopRequireDefault(require("../../shared/effort-estimate"));
var _modelStore = require("../../generic/model-store");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const SequenceLink = _ref => {
  let {
    id,
    intl,
    courseId,
    first,
    sequence
  } = _ref;
  const {
    complete,
    description,
    due,
    showLink,
    title
  } = sequence;
  const {
    userTimezone
  } = (0, _modelStore.useModel)('outline', courseId);
  const timezoneFormatArgs = userTimezone ? {
    timeZone: userTimezone
  } : {};
  const coursewareUrl = /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Link, {
    to: `/course/${courseId}/${id}`,
    children: title
  });
  const displayTitle = showLink ? coursewareUrl : title;
  const dueDateMessage = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
    id: "learning.outline.sequence-due-date-set",
    defaultMessage: "{description} due {assignmentDue}",
    description: "Used below an assignment title",
    values: {
      assignmentDue: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedTime, _objectSpread({
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZoneName: "short",
        value: due
      }, timezoneFormatArgs), `${id}-due`),
      description: description || ''
    }
  });
  const noDueDateMessage = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
    id: "learning.outline.sequence-due-date-not-set",
    defaultMessage: "{description}",
    description: "Used below an assignment title",
    values: {
      assignmentDue: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedTime, _objectSpread({
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZoneName: "short",
        value: due
      }, timezoneFormatArgs), `${id}-due`),
      description: description || ''
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: (0, _classnames.default)('', {
        'mt-2 pt-2 border-top border-light': !first
      }),
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "row w-100 m-0",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "col-auto p-0",
          children: complete ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
            icon: _faCheckCircle.faCheckCircle,
            fixedWidth: true,
            className: "float-left text-success mt-1",
            "aria-hidden": "true",
            title: intl.formatMessage(_messages.default.completedAssignment)
          }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
            icon: _faCheckCircle2.faCheckCircle,
            fixedWidth: true,
            className: "float-left text-gray-400 mt-1",
            "aria-hidden": "true",
            title: intl.formatMessage(_messages.default.incompleteAssignment)
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "col-10 p-0 ml-3 text-break",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "align-middle",
            children: displayTitle
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
            className: "sr-only",
            children: [", ", intl.formatMessage(complete ? _messages.default.completedAssignment : _messages.default.incompleteAssignment)]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_effortEstimate.default, {
            className: "ml-3 align-middle",
            block: sequence
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "row w-100 m-0 ml-3 pl-3",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("small", {
          className: "text-body pl-2",
          children: due ? dueDateMessage : noDueDateMessage
        })
      })]
    })
  });
};
SequenceLink.propTypes = {
  id: _propTypes.default.string.isRequired,
  intl: _i18n.intlShape.isRequired,
  courseId: _propTypes.default.string.isRequired,
  first: _propTypes.default.bool.isRequired,
  sequence: _propTypes.default.shape().isRequired
};
var _default = (0, _i18n.injectIntl)(SequenceLink);
exports.default = _default;
//# sourceMappingURL=SequenceLink.js.map