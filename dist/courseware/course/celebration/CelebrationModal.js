"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _i18n = require("@edx/frontend-platform/i18n");

var _paragon = require("@edx/paragon");

var _reactRedux = require("react-redux");

var _claps_280x = _interopRequireDefault(require("./assets/claps_280x201.gif"));

var _claps_456x = _interopRequireDefault(require("./assets/claps_456x328.gif"));

var _messages = _interopRequireDefault(require("./messages"));

var _SocialIcons = _interopRequireDefault(require("../../social-share/SocialIcons"));

var _utils = require("./utils");

var _modelStore = require("../../../generic/model-store");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["courseId", "intl", "isOpen", "onClose"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function CelebrationModal(_ref) {
  let {
    courseId,
    intl,
    isOpen,
    onClose
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

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
}

CelebrationModal.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  intl: _i18n.intlShape.isRequired,
  isOpen: _propTypes.default.bool.isRequired,
  onClose: _propTypes.default.func.isRequired
};

var _default = (0, _i18n.injectIntl)(CelebrationModal);

exports.default = _default;
//# sourceMappingURL=CelebrationModal.js.map