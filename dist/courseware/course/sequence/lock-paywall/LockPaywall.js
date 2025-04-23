"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _analytics = require("@edx/frontend-platform/analytics");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _SidebarContext = _interopRequireDefault(require("../../sidebar/SidebarContext"));
var _messages = _interopRequireDefault(require("./messages"));
var _edX_locked_certificate = _interopRequireDefault(require("../../../../generic/assets/edX_locked_certificate.png"));
var _modelStore = require("../../../../generic/model-store");
var _upgradeButton = require("../../../../generic/upgrade-button");
var _UpsellBullets = require("../../../../generic/upsell-bullets/UpsellBullets");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const LockPaywall = _ref => {
  let {
    intl,
    courseId
  } = _ref;
  const {
    notificationTrayVisible
  } = (0, _react.useContext)(_SidebarContext.default);
  const course = (0, _modelStore.useModel)('coursewareMeta', courseId);
  const {
    accessExpiration,
    marketingUrl,
    offer
  } = course;
  const {
    org,
    verifiedMode
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);

  // the following variables are set and used for resposive layout to work with
  // whether the NotificationTray is open or not and if there's an offer with longer text
  const shouldDisplayBulletPointsBelowCertificate = (0, _paragon.useWindowSize)().width <= _paragon.breakpoints.large.minWidth;
  const shouldDisplayGatedContentOneColumn = (0, _paragon.useWindowSize)().width <= _paragon.breakpoints.extraLarge.minWidth && notificationTrayVisible;
  const shouldDisplayGatedContentTwoColumns = (0, _paragon.useWindowSize)().width < _paragon.breakpoints.large.minWidth && notificationTrayVisible;
  const shouldDisplayGatedContentTwoColumnsHalf = (0, _paragon.useWindowSize)().width <= _paragon.breakpoints.large.minWidth && !notificationTrayVisible;
  const shouldWrapTextOnButton = (0, _paragon.useWindowSize)().width > _paragon.breakpoints.extraSmall.minWidth;
  const accessExpirationDate = accessExpiration ? new Date(accessExpiration.expirationDate) : null;
  const pastExpirationDeadline = accessExpiration ? new Date(Date.now()) > accessExpirationDate : false;
  if (!verifiedMode) {
    return null;
  }
  const eventProperties = {
    org_key: org,
    courserun_key: courseId
  };
  const logClick = () => {
    (0, _analytics.sendTrackEvent)('edx.bi.ecommerce.upsell_links_clicked', _objectSpread(_objectSpread({}, eventProperties), {}, {
      linkCategory: '(none)',
      linkName: 'in_course_upgrade',
      linkType: 'link',
      pageName: 'in_course'
    }));
  };
  const logClickPastExpiration = () => {
    (0, _analytics.sendTrackEvent)('edx.bi.ecommerce.gated_content.past_expiration.link_clicked', _objectSpread(_objectSpread({}, eventProperties), {}, {
      linkCategory: 'gated_content',
      linkName: 'course_details',
      linkType: 'link',
      pageName: 'in_course'
    }));
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert, {
    variant: "light",
    "aria-live": "off",
    icon: _icons.Locked,
    className: "lock-paywall-container",
    "data-testId": "lock-paywall-test-id",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "row",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "col",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h4", {
          "aria-level": "3",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: intl.formatMessage(_messages.default['learn.lockPaywall.title'])
          })
        }), pastExpirationDeadline ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "mb-2 upgrade-intro",
          children: [intl.formatMessage(_messages.default['learn.lockPaywall.content.pastExpiration']), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
            destination: marketingUrl,
            onClick: logClickPastExpiration,
            target: "_blank",
            children: intl.formatMessage(_messages.default['learn.lockPaywall.courseDetails'])
          })]
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "mb-2 upgrade-intro",
          children: intl.formatMessage(_messages.default['learn.lockPaywall.content'])
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: (0, _classnames.default)('d-inline-flex flex-row', {
            'flex-wrap': notificationTrayVisible || shouldDisplayBulletPointsBelowCertificate
          }),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              float: 'left'
            },
            className: "mr-3 mb-2",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
              alt: intl.formatMessage(_messages.default['learn.lockPaywall.example.alt']),
              src: _edX_locked_certificate.default,
              className: "border-0 certificate-image-banner",
              style: {
                height: '128px',
                width: '175px'
              }
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "mw-xs list-div",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "mb-2",
              children: intl.formatMessage(_messages.default['learn.lockPaywall.list.intro'])
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("ul", {
              className: "fa-ul ml-4 pl-2",
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_UpsellBullets.VerifiedCertBullet, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_UpsellBullets.UnlockGradedBullet, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_UpsellBullets.FullAccessBullet, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_UpsellBullets.SupportMissionBullet, {})]
            })]
          })]
        })]
      }), pastExpirationDeadline ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: (0, _classnames.default)('d-md-flex align-items-md-center text-right', {
          'col-md-5 mx-md-0': notificationTrayVisible,
          'col-md-4 mx-md-3 justify-content-center': !notificationTrayVisible && !shouldDisplayGatedContentTwoColumnsHalf,
          'col-md-11 justify-content-end': shouldDisplayGatedContentOneColumn && !shouldDisplayGatedContentTwoColumns,
          'col-md-6 justify-content-center': shouldDisplayGatedContentTwoColumnsHalf
        }),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_upgradeButton.UpgradeButton, {
          offer: offer,
          onClick: logClick,
          verifiedMode: verifiedMode,
          style: {
            whiteSpace: shouldWrapTextOnButton ? 'nowrap' : null
          }
        })
      })]
    })
  });
};
LockPaywall.propTypes = {
  intl: _i18n.intlShape.isRequired,
  courseId: _propTypes.default.string.isRequired
};
var _default = exports.default = (0, _i18n.injectIntl)(LockPaywall);
//# sourceMappingURL=LockPaywall.js.map