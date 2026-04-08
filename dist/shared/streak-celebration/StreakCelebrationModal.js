"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _frontendPlatform = require("@edx/frontend-platform");
var _analytics = require("@edx/frontend-platform/analytics");
var _i18n = require("@edx/frontend-platform/i18n");
var _icons = require("@openedx/paragon/icons");
var _paragon = require("@openedx/paragon");
var _reactRedux = require("react-redux");
var _upgradeButton = require("../../generic/upgrade-button");
var _modelStore = require("../../generic/model-store");
var _Streak_mobile = _interopRequireDefault(require("./assets/Streak_mobile.png"));
var _Streak_desktop = _interopRequireDefault(require("./assets/Streak_desktop.png"));
var _messages = _interopRequireDefault(require("./messages"));
var _utils = require("./utils");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["courseId", "metadataModel", "streakLengthToCelebrate", "isStreakCelebrationOpen", "closeStreakCelebration", "streakDiscountCouponEnabled", "verifiedMode"];
/* eslint-disable react/prop-types */
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function getRandomFactoid(intl, streakLength) {
  const boldedSectionA = intl.formatMessage(_messages.default.streakFactoidABoldedSection);
  const boldedSectionB = intl.formatMessage(_messages.default.streakFactoidBBoldedSection);
  const factoids = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
    id: "learning.streakcelebration.factoida",
    defaultMessage: "Users who learn {streak_length} days in a row {bolded_section} than those who don\u2019t.",
    values: {
      bolded_section: /*#__PURE__*/(0, _jsxRuntime.jsx)("b", {
        children: boldedSectionA
      }),
      streak_length: streakLength
    }
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
    id: "learning.streakcelebration.factoidb",
    defaultMessage: "Users who learn {streak_length} days in a row {bolded_section} vs. those who don\u2019t.",
    values: {
      bolded_section: /*#__PURE__*/(0, _jsxRuntime.jsx)("b", {
        children: boldedSectionB
      }),
      streak_length: streakLength
    }
  })];
  return factoids[Math.floor(Math.random() * factoids.length)];
}
const CloseText = ({
  intl
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
  children: [intl.formatMessage(_messages.default.streakButton), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
    className: "sr-only",
    children: [". ", intl.formatMessage(_messages.default.streakButtonSrOnly)]
  })]
});
const StreakModal = _ref => {
  let {
      courseId,
      metadataModel,
      streakLengthToCelebrate,
      isStreakCelebrationOpen,
      closeStreakCelebration,
      streakDiscountCouponEnabled,
      verifiedMode
    } = _ref,
    rest = _objectWithoutProperties(_ref, _excluded);
  const intl = (0, _i18n.useIntl)();
  const {
    org,
    celebrations,
    username
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const factoid = getRandomFactoid(intl, streakLengthToCelebrate);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [randomFactoid, setRandomFactoid] = (0, _react.useState)(factoid); // Don't change factoid on re-render

  // Open edX Folks: if you create a voucher with this code, the MFE will notice and show the discount
  const discountCode = 'ZGY11119949';
  // Negative means "we don't know yet" vs zero meaning no discount available
  const [discountPercent, setDiscountPercent] = (0, _react.useState)(-1);
  const queryingDiscount = discountPercent < 0;
  const wideScreen = (0, _paragon.useWindowSize)().width >= _paragon.breakpoints.small.minWidth;
  const dispatch = (0, _reactRedux.useDispatch)();
  (0, _react.useEffect)(() => {
    if (isStreakCelebrationOpen) {
      (0, _utils.recordStreakCelebration)(org, courseId);
    }
  }, [isStreakCelebrationOpen, org, courseId]);

  // Ask ecommerce to calculate discount savings
  (0, _react.useEffect)(() => {
    (async () => {
      let streakDiscountPercentage = 0;
      try {
        if (streakDiscountCouponEnabled && verifiedMode) {
          // If the discount service is available, use it to get the discount percentage
          if ((0, _frontendPlatform.getConfig)().DISCOUNT_CODE_INFO_URL) {
            streakDiscountPercentage = await (0, _utils.getDiscountCodePercentage)(discountCode, courseId);
            // If the discount service is not available, fall back to ecommerce to calculate the discount percentage
          } else if ((0, _frontendPlatform.getConfig)().ECOMMERCE_BASE_URL) {
            streakDiscountPercentage = await (0, _utils.calculateVoucherDiscountPercentage)(discountCode, verifiedMode.sku, username);
          }
        }
      } catch {
        // ignore any errors - we just won't show the discount to the user then
      } finally {
        if (streakDiscountPercentage) {
          (0, _analytics.sendTrackEvent)('edx.bi.course.streak_discount_enabled', {
            course_id: courseId,
            sku: verifiedMode.sku
          });
        }
        setDiscountPercent(streakDiscountPercentage);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streakDiscountCouponEnabled, username, verifiedMode]);
  if (!isStreakCelebrationOpen) {
    return null;
  }
  let upgradeUrl;
  let mode;
  let offer;
  if (verifiedMode) {
    upgradeUrl = `${verifiedMode.upgradeUrl}`;
    mode = {
      currencySymbol: verifiedMode.currencySymbol,
      price: verifiedMode.price,
      upgradeUrl
    };
    if (discountPercent > 0) {
      const discountMultipler = 1 - discountPercent;
      offer = {
        discountedPrice: `${verifiedMode.currencySymbol}${(mode.price * discountMultipler).toFixed(2).toString()}`,
        originalPrice: `${verifiedMode.currencySymbol}${mode.price.toString()}`,
        upgradeUrl: `${mode.upgradeUrl}&code=${discountCode}`
      };
    }
  }
  const title = `${streakLengthToCelebrate} ${intl.formatMessage(_messages.default.streakHeader)}`;
  const showOffer = offer && streakDiscountCouponEnabled;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.ModalDialog, _objectSpread(_objectSpread({
    className: "streak-modal modal-dialog-centered",
    title: title,
    onClose: () => {
      closeStreakCelebration();
      (0, _utils.recordModalClosing)(celebrations, org, courseId, dispatch);
    },
    isOpen: isStreakCelebrationOpen,
    isFullscreenScroll: true
  }, rest), {}, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.ModalDialog.Header, {
      className: "modal-header",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.ModalDialog.Title, {
        className: "mr-0 modal-title",
        children: title
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.ModalDialog.Body, {
      className: "modal-body",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        className: "text-center",
        children: intl.formatMessage(_messages.default.streakBody)
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
        className: "modal-image text-center",
        children: [!wideScreen && /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
          src: _Streak_mobile.default,
          alt: "",
          className: "img-fluid"
        }), wideScreen && /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
          src: _Streak_desktop.default,
          alt: "",
          className: "img-fluid"
        })]
      }), queryingDiscount && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Spinner, {
        animation: "border",
        variant: "primary"
      }), !queryingDiscount && !showOffer && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "d-flex py-3 bg-light-300",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
          className: "col-small ml-3",
          src: _icons.Lightbulb
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "col-11 factoid-wrapper",
          children: randomFactoid
        })]
      }), !queryingDiscount && showOffer && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert, {
        variant: "success",
        className: "px-0",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "d-flex",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
            className: "col-small ml-3 text-success-500",
            src: _icons.MoneyFilled
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "col-11 factoid-wrapper",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("b", {
              children: intl.formatMessage(_messages.default.congratulations)
            }), "\xA0", intl.formatMessage(_messages.default.streakDiscountMessage, {
              percent: (discountPercent * 100).toFixed(0)
            }), "\xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
              id: "learning.streakCelebration.streakCelebrationCouponEndDateMessage",
              defaultMessage: "Ends {date}.",
              values: {
                date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString({
                  timeZone: 'UTC'
                })
              }
            })]
          })]
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.ModalDialog.Footer, {
      className: "modal-footer d-block",
      children: [!queryingDiscount && showOffer && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [!wideScreen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_upgradeButton.UpgradeNowButton, {
            className: "upgrade mb-3",
            size: "sm",
            offer: offer,
            variant: "brand",
            verifiedMode: mode
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.ModalDialog.CloseButton, {
            variant: "outline-brand",
            className: "btn-sm",
            children: intl.formatMessage(_messages.default.streakButtonAA759)
          })]
        }), wideScreen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_upgradeButton.UpgradeNowButton, {
            className: "upgrade mb-3",
            offer: offer,
            variant: "brand",
            verifiedMode: mode
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.ModalDialog.CloseButton, {
            variant: "outline-brand",
            children: intl.formatMessage(_messages.default.streakButtonAA759)
          })]
        })]
      }), !queryingDiscount && !showOffer && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.ModalDialog.CloseButton, {
        className: "px-5",
        variant: "primary",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(CloseText, {
          intl: intl
        })
      })]
    })]
  }));
};
StreakModal.defaultProps = {
  isStreakCelebrationOpen: false,
  streakDiscountCouponEnabled: false,
  streakLengthToCelebrate: -1,
  verifiedMode: {}
};
StreakModal.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  metadataModel: _propTypes.default.string.isRequired,
  streakLengthToCelebrate: _propTypes.default.number,
  isStreakCelebrationOpen: _propTypes.default.bool,
  closeStreakCelebration: _propTypes.default.func.isRequired,
  streakDiscountCouponEnabled: _propTypes.default.bool,
  verifiedMode: _propTypes.default.shape({
    currencySymbol: _propTypes.default.string,
    price: _propTypes.default.number,
    sku: _propTypes.default.string,
    upgradeUrl: _propTypes.default.string
  })
};
var _default = exports.default = StreakModal;
//# sourceMappingURL=StreakCelebrationModal.js.map