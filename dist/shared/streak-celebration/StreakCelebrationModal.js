"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _frontendPlatform = require("@edx/frontend-platform");
var _analytics = require("@edx/frontend-platform/analytics");
var _auth = require("@edx/frontend-platform/auth");
var _i18n = require("@edx/frontend-platform/i18n");
var _icons = require("@edx/paragon/icons");
var _paragon = require("@edx/paragon");
var _reactRedux = require("react-redux");
var _upgradeButton = require("../../generic/upgrade-button");
var _modelStore = require("../../generic/model-store");
var _Streak_mobile = _interopRequireDefault(require("./assets/Streak_mobile.png"));
var _Streak_desktop = _interopRequireDefault(require("./assets/Streak_desktop.png"));
var _messages = _interopRequireDefault(require("./messages"));
var _utils = require("./utils");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["courseId", "metadataModel", "streakLengthToCelebrate", "intl", "isStreakCelebrationOpen", "closeStreakCelebration", "streakDiscountCouponEnabled", "verifiedMode"];
/* eslint-disable react/prop-types */
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
async function calculateVoucherDiscount(voucher, sku, username) {
  const urlBase = `${(0, _frontendPlatform.getConfig)().ECOMMERCE_BASE_URL}/api/v2/baskets/calculate`;
  const url = `${urlBase}/?code=${voucher}&sku=${sku}&username=${username}`;
  return (0, _auth.getAuthenticatedHttpClient)().get(url).then(res => (0, _frontendPlatform.camelCaseObject)(res));
}
const CloseText = _ref => {
  let {
    intl
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
    children: [intl.formatMessage(_messages.default.streakButton), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      className: "sr-only",
      children: [". ", intl.formatMessage(_messages.default.streakButtonSrOnly)]
    })]
  });
};
const StreakModal = _ref2 => {
  let {
      courseId,
      metadataModel,
      streakLengthToCelebrate,
      intl,
      isStreakCelebrationOpen,
      closeStreakCelebration,
      streakDiscountCouponEnabled,
      verifiedMode
    } = _ref2,
    rest = _objectWithoutProperties(_ref2, _excluded);
  const {
    org,
    celebrations,
    username
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const factoid = getRandomFactoid(intl, streakLengthToCelebrate);
  // eslint-disable-next-line no-unused-vars
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
    if (streakDiscountCouponEnabled && verifiedMode && (0, _frontendPlatform.getConfig)().ECOMMERCE_BASE_URL) {
      calculateVoucherDiscount(discountCode, verifiedMode.sku, username).then(result => {
        const {
          totalInclTax,
          totalInclTaxExclDiscounts
        } = result.data;
        if (totalInclTaxExclDiscounts && totalInclTax !== totalInclTaxExclDiscounts) {
          // Just store the percent (rather than using these values directly), because ecommerce doesn't give us
          // the currency symbol to use, so we want to use the symbol that LMS gives us. And I don't want to assume
          // ecommerce's currency is the same as the LMS. So we'll keep using the values in verifiedMode, just
          // multiplied by the calculated percentage.
          setDiscountPercent(1 - totalInclTax / totalInclTaxExclDiscounts);
          (0, _analytics.sendTrackEvent)('edx.bi.course.streak_discount_enabled', {
            course_id: courseId,
            sku: verifiedMode.sku
          });
        } else {
          setDiscountPercent(0);
        }
      }, () => {
        // ignore any errors - we just won't show the discount to the user then
        setDiscountPercent(0);
      });
    } else {
      setDiscountPercent(0);
    }
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
  intl: _i18n.intlShape.isRequired,
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
var _default = (0, _i18n.injectIntl)(StreakModal);
exports.default = _default;
//# sourceMappingURL=StreakCelebrationModal.js.map