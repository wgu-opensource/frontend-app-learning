"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _reactRedux = require("react-redux");
var _claps_280x = _interopRequireDefault(require("./assets/claps_280x201.gif"));
var _claps_456x = _interopRequireDefault(require("./assets/claps_456x328.gif"));
var _messages = _interopRequireDefault(require("./messages"));
var _SocialIcons = _interopRequireDefault(require("../../social-share/SocialIcons"));
var _utils = require("./utils");
var _modelStore = require("../../../generic/model-store");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["courseId", "isOpen", "onClose"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const CelebrationModal = _ref => {
  let {
      courseId,
      isOpen,
      onClose
    } = _ref,
    rest = _objectWithoutProperties(_ref, _excluded);
  const intl = (0, _i18n.useIntl)();
  const {
    org,
    celebrations
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const dispatch = (0, _reactRedux.useDispatch)();
  const wideScreen = (0, _paragon.useWindowSize)().width >= _paragon.breakpoints.small.minWidth;
  (0, _react.useEffect)(() => {
    if (isOpen) {
      (0, _utils.recordFirstSectionCelebration)(org, courseId, celebrations, dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.StandardModal, _objectSpread(_objectSpread({
    footerNode: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.ActionRow, {
      isStacked: true,
      className: "pb-2",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
        onClick: onClose,
        children: intl.formatMessage(_messages.default.forward)
      })
    }),
    hasCloseButton: false,
    isOpen: isOpen,
    onClose: onClose,
    title: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "h2 text-center mr-n5 pt-4",
      children: intl.formatMessage(_messages.default.congrats)
    })
  }, rest), {}, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        className: "text-center",
        children: intl.formatMessage(_messages.default.completed)
      }), !wideScreen && /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
        src: _claps_280x.default,
        alt: "",
        className: "img-fluid"
      }), wideScreen && /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
        src: _claps_456x.default,
        alt: "",
        className: "img-fluid w-100"
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
        className: "mt-3 text-center",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("strong", {
          children: intl.formatMessage(_messages.default.earned)
        }), " ", intl.formatMessage(_messages.default.share)]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SocialIcons.default, {
        analyticsId: "edx.ui.lms.celebration.social_share.clicked",
        courseId: courseId,
        emailSubject: _messages.default.emailSubject,
        socialMessage: _messages.default.socialMessage
      })]
    })
  }));
};
CelebrationModal.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  isOpen: _propTypes.default.bool.isRequired,
  onClose: _propTypes.default.func.isRequired
};
var _default = exports.default = CelebrationModal;
//# sourceMappingURL=CelebrationModal.js.map