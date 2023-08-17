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

var _paragon = require("@edx/paragon");

var _icons = require("@edx/paragon/icons");

var _SidebarContext = _interopRequireDefault(require("../../sidebar/SidebarContext"));

var _messages = _interopRequireDefault(require("./messages"));

var _edX_locked_certificate = _interopRequireDefault(require("../../../../generic/assets/edX_locked_certificate.png"));

var _modelStore = require("../../../../generic/model-store");

var _upgradeButton = require("../../../../generic/upgrade-button");

var _UpsellBullets = require("../../../../generic/upsell-bullets/UpsellBullets");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function LockPaywall(_ref) {
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
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId); // the following variables are set and used for resposive layout to work with
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
}

LockPaywall.propTypes = {
  intl: _i18n.intlShape.isRequired,
  courseId: _propTypes.default.string.isRequired
};

var _default = (0, _i18n.injectIntl)(LockPaywall);

exports.default = _default;
//# sourceMappingURL=LockPaywall.js.map