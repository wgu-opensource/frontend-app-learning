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

var _localStorage = require("../../data/localStorage");

var _upgradeButton = require("../upgrade-button");

var _UpsellBullets = require("../upsell-bullets/UpsellBullets");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function UpsellNoFBECardContent() {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("ul", {
    className: "fa-ul upgrade-notification-ul pt-0",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_UpsellBullets.VerifiedCertBullet, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_UpsellBullets.SupportMissionBullet, {})]
  });
}

function UpsellFBEFarAwayCardContent() {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("ul", {
    className: "fa-ul upgrade-notification-ul",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_UpsellBullets.VerifiedCertBullet, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_UpsellBullets.UnlockGradedBullet, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_UpsellBullets.FullAccessBullet, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_UpsellBullets.SupportMissionBullet, {})]
  });
}

function UpsellFBESoonCardContent(_ref) {
  let {
    accessExpirationDate,
    timezoneFormatArgs
  } = _ref;
  const includingAnyProgress = /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: "font-weight-bold",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.generic.upgradeNotification.expirationAccessLoss.progress",
      defaultMessage: "including any progress"
    })
  });
  const date = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedDate, _objectSpread({
    day: "numeric",
    month: "long",
    value: new Date(accessExpirationDate)
  }, timezoneFormatArgs), "accessDate");
  const benefitsOfUpgrading = /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
    className: "inline-link-underline font-weight-bold",
    rel: "noopener noreferrer",
    target: "_blank",
    href: "https://support.edx.org/hc/en-us/articles/360013426573-What-are-the-differences-between-audit-free-and-verified-paid-courses-",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.generic.upgradeNotification.expirationVerifiedCert.benefits",
      defaultMessage: "benefits of upgrading"
    })
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "upgrade-notification-text",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "learning.generic.upgradeNotification.expirationAccessLoss",
        defaultMessage: "You will lose all access to this course, {includingAnyProgress}, on {date}.",
        values: {
          includingAnyProgress,
          date
        }
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "learning.generic.upgradeNotification.expirationVerifiedCert",
        defaultMessage: "Upgrading your course enables you to pursue a verified certificate and unlocks numerous features. Learn more about the {benefitsOfUpgrading}.",
        values: {
          benefitsOfUpgrading
        }
      })
    })]
  });
}

UpsellFBESoonCardContent.propTypes = {
  accessExpirationDate: _propTypes.default.PropTypes.instanceOf(Date).isRequired,
  timezoneFormatArgs: _propTypes.default.shape({
    timeZone: _propTypes.default.string
  })
};
UpsellFBESoonCardContent.defaultProps = {
  timezoneFormatArgs: {}
};

function PastExpirationCardContent() {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "upgrade-notification-text",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "learning.generic.upgradeNotification.pastExpiration.content",
        defaultMessage: "The upgrade deadline for this course passed. To upgrade, enroll in the next available session."
      })
    })
  });
}

function ExpirationCountdown(_ref2) {
  let {
    courseId,
    hoursToExpiration,
    setupgradeNotificationCurrentState,
    type
  } = _ref2;
  let expirationText;

  if (hoursToExpiration >= 24) {
    // More than 1 day left
    // setupgradeNotificationCurrentState is available in NotificationTray (not course home)
    if (setupgradeNotificationCurrentState) {
      if (type === 'access') {
        setupgradeNotificationCurrentState('accessDaysLeft');
        (0, _localStorage.setLocalStorage)(`upgradeNotificationCurrentState.${courseId}`, 'accessDaysLeft');
      }

      if (type === 'offer') {
        setupgradeNotificationCurrentState('FPDdaysLeft');
        (0, _localStorage.setLocalStorage)(`upgradeNotificationCurrentState.${courseId}`, 'FPDdaysLeft');
      }
    }

    expirationText = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.generic.upgradeNotification.expirationDays",
      defaultMessage: `{dayCount, number} {dayCount, plural, 
          one {day}
          other {days}} left`,
      values: {
        dayCount: Math.floor(hoursToExpiration / 24)
      }
    });
  } else if (hoursToExpiration >= 1) {
    // More than 1 hour left
    // setupgradeNotificationCurrentState is available in NotificationTray (not course home)
    if (setupgradeNotificationCurrentState) {
      if (type === 'access') {
        setupgradeNotificationCurrentState('accessHoursLeft');
        (0, _localStorage.setLocalStorage)(`upgradeNotificationCurrentState.${courseId}`, 'accessHoursLeft');
      }

      if (type === 'offer') {
        setupgradeNotificationCurrentState('FPDHoursLeft');
        (0, _localStorage.setLocalStorage)(`upgradeNotificationCurrentState.${courseId}`, 'FPDHoursLeft');
      }
    }

    expirationText = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.generic.upgradeNotification.expirationHours",
      defaultMessage: `{hourCount, number} {hourCount, plural,
          one {hour}
          other {hours}} left`,
      values: {
        hourCount: hoursToExpiration
      }
    });
  } else {
    // Less than 1 hour
    // setupgradeNotificationCurrentState is available in NotificationTray (not course home)
    if (setupgradeNotificationCurrentState) {
      if (type === 'access') {
        setupgradeNotificationCurrentState('accessLastHour');
        (0, _localStorage.setLocalStorage)(`upgradeNotificationCurrentState.${courseId}`, 'accessLastHour');
      }

      if (type === 'offer') {
        setupgradeNotificationCurrentState('FPDLastHour');
        (0, _localStorage.setLocalStorage)(`upgradeNotificationCurrentState.${courseId}`, 'FPDLastHour');
      }
    }

    expirationText = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.generic.upgradeNotification.expirationMinutes",
      defaultMessage: "Less than 1 hour left"
    });
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "upsell-warning",
    children: expirationText
  });
}

ExpirationCountdown.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  hoursToExpiration: _propTypes.default.number.isRequired,
  setupgradeNotificationCurrentState: _propTypes.default.func,
  type: _propTypes.default.string
};
ExpirationCountdown.defaultProps = {
  setupgradeNotificationCurrentState: null,
  type: null
};

function AccessExpirationDateBanner(_ref3) {
  let {
    courseId,
    accessExpirationDate,
    timezoneFormatArgs,
    setupgradeNotificationCurrentState
  } = _ref3;

  if (setupgradeNotificationCurrentState) {
    setupgradeNotificationCurrentState('accessDateView');
    (0, _localStorage.setLocalStorage)(`upgradeNotificationCurrentState.${courseId}`, 'accessDateView');
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "upsell-warning-light",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.generic.upgradeNotification.expiration",
      defaultMessage: "Course access will expire {date}",
      values: {
        date: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedDate, _objectSpread({
          day: "numeric",
          month: "long",
          value: accessExpirationDate
        }, timezoneFormatArgs), "accessExpireDate")
      }
    })
  });
}

AccessExpirationDateBanner.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  accessExpirationDate: _propTypes.default.PropTypes.instanceOf(Date).isRequired,
  timezoneFormatArgs: _propTypes.default.shape({
    timeZone: _propTypes.default.string
  }),
  setupgradeNotificationCurrentState: _propTypes.default.func
};
AccessExpirationDateBanner.defaultProps = {
  timezoneFormatArgs: {},
  setupgradeNotificationCurrentState: null
};

function PastExpirationDateBanner(_ref4) {
  let {
    courseId,
    accessExpirationDate,
    timezoneFormatArgs,
    setupgradeNotificationCurrentState
  } = _ref4;

  if (setupgradeNotificationCurrentState) {
    setupgradeNotificationCurrentState('PastExpirationDate');
    (0, _localStorage.setLocalStorage)(`upgradeNotificationCurrentState.${courseId}`, 'PastExpirationDate');
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "upsell-warning",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.generic.upgradeNotification.pastExpiration.banner",
      defaultMessage: "Upgrade deadline passed on {date}",
      values: {
        date: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedDate, _objectSpread({
          day: "numeric",
          month: "long",
          value: accessExpirationDate
        }, timezoneFormatArgs), "accessExpireDate")
      }
    })
  });
}

PastExpirationDateBanner.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  accessExpirationDate: _propTypes.default.PropTypes.instanceOf(Date).isRequired,
  timezoneFormatArgs: _propTypes.default.shape({
    timeZone: _propTypes.default.string
  }),
  setupgradeNotificationCurrentState: _propTypes.default.func
};
PastExpirationDateBanner.defaultProps = {
  timezoneFormatArgs: {},
  setupgradeNotificationCurrentState: null
};

function UpgradeNotification(_ref5) {
  let {
    accessExpiration,
    contentTypeGatingEnabled,
    marketingUrl,
    courseId,
    offer,
    org,
    setupgradeNotificationCurrentState,
    shouldDisplayBorder,
    timeOffsetMillis,
    upsellPageName,
    userTimezone,
    verifiedMode
  } = _ref5;
  const dateNow = Date.now();
  const timezoneFormatArgs = userTimezone ? {
    timeZone: userTimezone
  } : {};
  const correctedTime = new Date(dateNow + timeOffsetMillis);
  const accessExpirationDate = accessExpiration ? new Date(accessExpiration.expirationDate) : null;
  const pastExpirationDeadline = accessExpiration ? new Date(dateNow) > accessExpirationDate : false;

  if (!verifiedMode) {
    return null;
  }

  const eventProperties = {
    org_key: org,
    courserun_key: courseId
  };

  const promotionEventProperties = _objectSpread({
    creative: 'sidebarupsell',
    name: 'In-Course Verification Prompt',
    position: 'sidebar-message',
    promotion_id: 'courseware_verified_certificate_upsell'
  }, eventProperties);

  (0, _react.useEffect)(() => {
    (0, _analytics.sendTrackingLogEvent)('edx.bi.course.upgrade.sidebarupsell.displayed', eventProperties);
    (0, _analytics.sendTrackEvent)('Promotion Viewed', promotionEventProperties);
  }, []);

  const logClick = () => {
    (0, _analytics.sendTrackingLogEvent)('edx.bi.course.upgrade.sidebarupsell.clicked', eventProperties);
    (0, _analytics.sendTrackingLogEvent)('edx.course.enrollment.upgrade.clicked', _objectSpread(_objectSpread({}, eventProperties), {}, {
      location: 'sidebar-message'
    }));
    (0, _analytics.sendTrackEvent)('Promotion Clicked', promotionEventProperties);
    (0, _analytics.sendTrackEvent)('edx.bi.ecommerce.upsell_links_clicked', _objectSpread(_objectSpread({}, eventProperties), {}, {
      linkCategory: 'green_upgrade',
      linkName: `${upsellPageName}_green`,
      linkType: 'button',
      pageName: upsellPageName
    }));
  };

  const logClickPastExpiration = () => {
    (0, _analytics.sendTrackEvent)('edx.bi.ecommerce.upgrade_notification.past_expiration.button_clicked', _objectSpread(_objectSpread({}, eventProperties), {}, {
      linkCategory: 'upgrade_notification',
      linkName: `${upsellPageName}_course_details`,
      linkType: 'button',
      pageName: upsellPageName
    }));
  };
  /*
  There are 5 parts that change in the upgrade card:
    upgradeNotificationHeaderText
    expirationBanner
    upsellMessage
    callToActionButton
    offerCode
  */


  let upgradeNotificationHeaderText;
  let expirationBanner;
  let upsellMessage;
  let callToActionButton;
  let offerCode;

  if (!!accessExpiration && !!contentTypeGatingEnabled) {
    const hoursToAccessExpiration = Math.floor((accessExpirationDate - correctedTime) / 1000 / 60 / 60);

    if (hoursToAccessExpiration >= 7 * 24) {
      if (offer) {
        // countdown to the first purchase discount if there is one
        const hoursToDiscountExpiration = Math.floor((new Date(offer.expirationDate) - correctedTime) / 1000 / 60 / 60);
        upgradeNotificationHeaderText = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
          id: "learning.generic.upgradeNotification.firstTimeLearnerDiscount",
          defaultMessage: "{percentage}% First-Time Learner Discount",
          values: {
            percentage: offer.percentage
          }
        });
        expirationBanner = /*#__PURE__*/(0, _jsxRuntime.jsx)(ExpirationCountdown, {
          courseId: courseId,
          hoursToExpiration: hoursToDiscountExpiration,
          setupgradeNotificationCurrentState: setupgradeNotificationCurrentState,
          type: "offer"
        });
      } else {
        upgradeNotificationHeaderText = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
          id: "learning.generic.upgradeNotification.accessExpiration",
          defaultMessage: "Upgrade your course today"
        });
        expirationBanner = /*#__PURE__*/(0, _jsxRuntime.jsx)(AccessExpirationDateBanner, {
          courseId: courseId,
          accessExpirationDate: accessExpirationDate,
          timezoneFormatArgs: timezoneFormatArgs,
          setupgradeNotificationCurrentState: setupgradeNotificationCurrentState
        });
      }

      upsellMessage = /*#__PURE__*/(0, _jsxRuntime.jsx)(UpsellFBEFarAwayCardContent, {});
    } else if (hoursToAccessExpiration < 7 * 24 && hoursToAccessExpiration >= 0) {
      // more urgent messaging if there's less than 7 days left to access expiration
      upgradeNotificationHeaderText = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "learning.generic.upgradeNotification.accessExpirationUrgent",
        defaultMessage: "Course Access Expiration"
      });
      expirationBanner = /*#__PURE__*/(0, _jsxRuntime.jsx)(ExpirationCountdown, {
        courseId: courseId,
        hoursToExpiration: hoursToAccessExpiration,
        setupgradeNotificationCurrentState: setupgradeNotificationCurrentState,
        type: "access"
      });
      upsellMessage = /*#__PURE__*/(0, _jsxRuntime.jsx)(UpsellFBESoonCardContent, {
        accessExpirationDate: accessExpirationDate,
        timezoneFormatArgs: timezoneFormatArgs
      });
    } else {
      // access expiration deadline has passed
      upgradeNotificationHeaderText = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "learning.generic.upgradeNotification.accessExpirationPast",
        defaultMessage: "Course Access Expiration"
      });
      expirationBanner = /*#__PURE__*/(0, _jsxRuntime.jsx)(PastExpirationDateBanner, {
        courseId: courseId,
        accessExpirationDate: accessExpirationDate,
        timezoneFormatArgs: timezoneFormatArgs,
        setupgradeNotificationCurrentState: setupgradeNotificationCurrentState
      });
      upsellMessage = /*#__PURE__*/(0, _jsxRuntime.jsx)(PastExpirationCardContent, {});
    }
  } else {
    // FBE is turned off
    upgradeNotificationHeaderText = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.generic.upgradeNotification.pursueAverifiedCertificate",
      defaultMessage: "Pursue a verified certificate"
    });
    upsellMessage = /*#__PURE__*/(0, _jsxRuntime.jsx)(UpsellNoFBECardContent, {});
  }

  if (pastExpirationDeadline) {
    callToActionButton = /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
      variant: "primary",
      onClick: logClickPastExpiration,
      href: marketingUrl,
      block: true,
      children: "View Course Details"
    });
  } else {
    callToActionButton = /*#__PURE__*/(0, _jsxRuntime.jsx)(_upgradeButton.UpgradeButton, {
      offer: offer,
      onClick: logClick,
      verifiedMode: verifiedMode,
      block: true
    });
  }

  if (offer) {
    // if there's a first purchase discount, message the code at the bottom
    offerCode = /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "text-center discount-info",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "learning.generic.upgradeNotification.code",
        defaultMessage: "Use code {code} at checkout",
        values: {
          code: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "font-weight-bold",
            children: offer.code
          })
        }
      })
    });
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
    className: (0, _classnames.default)('upgrade-notification small', {
      'card mb-4': shouldDisplayBorder
    }),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      id: "courseHome-upgradeNotification",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
        className: "h5 upgrade-notification-header",
        id: "outline-sidebar-upgrade-header",
        children: upgradeNotificationHeaderText
      }), expirationBanner, /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "upgrade-notification-message",
        children: upsellMessage
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "upgrade-notification-button",
        children: callToActionButton
      }), offerCode]
    })
  });
}

UpgradeNotification.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  org: _propTypes.default.string.isRequired,
  accessExpiration: _propTypes.default.shape({
    expirationDate: _propTypes.default.string
  }),
  contentTypeGatingEnabled: _propTypes.default.bool,
  marketingUrl: _propTypes.default.string,
  offer: _propTypes.default.shape({
    expirationDate: _propTypes.default.string,
    percentage: _propTypes.default.number,
    code: _propTypes.default.string
  }),
  shouldDisplayBorder: _propTypes.default.bool,
  setupgradeNotificationCurrentState: _propTypes.default.func,
  timeOffsetMillis: _propTypes.default.number,
  upsellPageName: _propTypes.default.string.isRequired,
  userTimezone: _propTypes.default.string,
  verifiedMode: _propTypes.default.shape({
    currencySymbol: _propTypes.default.string.isRequired,
    price: _propTypes.default.number.isRequired,
    upgradeUrl: _propTypes.default.string.isRequired
  })
};
UpgradeNotification.defaultProps = {
  accessExpiration: null,
  contentTypeGatingEnabled: false,
  marketingUrl: null,
  offer: null,
  setupgradeNotificationCurrentState: null,
  shouldDisplayBorder: null,
  timeOffsetMillis: 0,
  userTimezone: null,
  verifiedMode: null
};

var _default = (0, _i18n.injectIntl)(UpgradeNotification);

exports.default = _default;
//# sourceMappingURL=UpgradeNotification.js.map