"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CERT_STATUS_TYPE = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _i18n = require("@edx/frontend-platform/i18n");

var _paragon = require("@edx/paragon");

var _reactRedux = require("react-redux");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _faCheckCircle = require("@fortawesome/free-solid-svg-icons/faCheckCircle");

var _faExclamationTriangle = require("@fortawesome/free-solid-svg-icons/faExclamationTriangle");

var _frontendPlatform = require("@edx/frontend-platform");

var _analytics = require("@edx/frontend-platform/analytics");

var _auth = require("@edx/frontend-platform/auth");

var _messages = _interopRequireDefault(require("./messages"));

var _messages2 = _interopRequireDefault(require("../../../progress-tab/certificate-status/messages"));

var _thunks = require("../../../data/thunks");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const CERT_STATUS_TYPE = {
  EARNED_NOT_AVAILABLE: 'earned_but_not_available',
  DOWNLOADABLE: 'downloadable',
  REQUESTING: 'requesting',
  UNVERIFIED: 'unverified'
};
exports.CERT_STATUS_TYPE = CERT_STATUS_TYPE;

function CertificateStatusAlert(_ref) {
  let {
    intl,
    payload
  } = _ref;
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    certificateAvailableDate,
    certStatus,
    courseEndDate,
    courseId,
    certURL,
    userTimezone,
    org,
    notPassingCourseEnded,
    tabs
  } = payload; // eslint-disable-next-line react/prop-types

  const AlertWrapper = props => props.children(props);

  const sendAlertClickTracking = id => {
    const {
      administrator
    } = (0, _auth.getAuthenticatedUser)();
    (0, _analytics.sendTrackEvent)(id, {
      org_key: org,
      courserun_key: courseId,
      is_staff: administrator
    });
  };

  const renderCertAwardedStatus = () => {
    const alertProps = {
      variant: 'success',
      icon: _faCheckCircle.faCheckCircle,
      iconClassName: 'alert-icon text-success-500'
    };

    if (certStatus === CERT_STATUS_TYPE.EARNED_NOT_AVAILABLE) {
      const timezoneFormatArgs = userTimezone ? {
        timeZone: userTimezone
      } : {};
      const certificateAvailableDateFormatted = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedDate, {
        value: certificateAvailableDate,
        day: "numeric",
        month: "long",
        year: "numeric"
      });
      const courseEndDateFormatted = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedDate, {
        value: courseEndDate,
        day: "numeric",
        month: "long",
        year: "numeric"
      });
      alertProps.header = intl.formatMessage(_messages.default.certStatusEarnedNotAvailableHeader);
      alertProps.body = /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({
          id: "learning.outline.alert.cert.earnedNotAvailable",
          defaultMessage: "This course ends on {courseEndDateFormatted}. Final grades and any earned certificates are scheduled to be available after {certificateAvailableDate}.",
          values: {
            courseEndDateFormatted,
            certificateAvailableDate: certificateAvailableDateFormatted
          }
        }, timezoneFormatArgs))
      });
    } else if (certStatus === CERT_STATUS_TYPE.DOWNLOADABLE) {
      alertProps.header = intl.formatMessage(_messages.default.certStatusDownloadableHeader);
      alertProps.buttonMessage = intl.formatMessage(_messages2.default.viewableButton);
      alertProps.buttonVisible = true;
      alertProps.buttonLink = certURL;

      alertProps.buttonAction = () => {
        sendAlertClickTracking('edx.ui.lms.course_outline.certificate_alert_downloadable_button.clicked');
      };
    } else if (certStatus === CERT_STATUS_TYPE.REQUESTING) {
      alertProps.header = intl.formatMessage(_messages.default.certStatusDownloadableHeader);
      alertProps.buttonMessage = intl.formatMessage(_messages2.default.requestableButton);
      alertProps.buttonVisible = true;
      alertProps.buttonLink = '';

      alertProps.buttonAction = () => {
        sendAlertClickTracking('edx.ui.lms.course_outline.certificate_alert_request_cert_button.clicked');
        dispatch((0, _thunks.requestCert)(courseId));
      };
    }

    return alertProps;
  };

  const renderNotIDVerifiedStatus = () => {
    const alertProps = {
      variant: 'warning',
      icon: _faExclamationTriangle.faExclamationTriangle,
      iconClassName: 'alert-icon text-warning-500',
      header: intl.formatMessage(_messages2.default.unverifiedHomeHeader),
      buttonMessage: intl.formatMessage(_messages2.default.unverifiedHomeButton),
      body: intl.formatMessage(_messages2.default.unverifiedHomeBody),
      buttonVisible: true,
      buttonLink: (0, _frontendPlatform.getConfig)().SUPPORT_URL_ID_VERIFICATION,
      buttonAction: () => {
        sendAlertClickTracking('edx.ui.lms.course_outline.certificate_alert_unverified_button.clicked');
      }
    };
    return alertProps;
  };

  const renderNotPassingCourseEnded = () => {
    const progressTab = tabs.find(tab => tab.slug === 'progress');
    const progressLink = progressTab && progressTab.url;
    const alertProps = {
      header: intl.formatMessage(_messages.default.certStatusNotPassingHeader),
      buttonMessage: intl.formatMessage(_messages.default.certStatusNotPassingButton),
      body: intl.formatMessage(_messages2.default.notPassingBody),
      buttonVisible: true,
      buttonLink: progressLink,
      buttonAction: () => {
        sendAlertClickTracking('edx.ui.lms.course_outline.certificate_alert_view_grades_button.clicked');
      }
    };
    return alertProps;
  };

  let alertProps = {};

  switch (certStatus) {
    case CERT_STATUS_TYPE.EARNED_NOT_AVAILABLE:
    case CERT_STATUS_TYPE.DOWNLOADABLE:
    case CERT_STATUS_TYPE.REQUESTING:
      alertProps = renderCertAwardedStatus();
      break;

    case CERT_STATUS_TYPE.UNVERIFIED:
      alertProps = renderNotIDVerifiedStatus();
      break;

    default:
      if (notPassingCourseEnded) {
        alertProps = renderNotPassingCourseEnded();
      }

      break;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(AlertWrapper, _objectSpread(_objectSpread({}, alertProps), {}, {
    children: _ref2 => {
      let {
        variant,
        buttonVisible,
        iconClassName,
        icon,
        header,
        body,
        buttonAction,
        buttonLink,
        buttonMessage
      } = _ref2;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert, {
        variant: variant,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "d-flex flex-column flex-lg-row justify-content-between align-items-center",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: buttonVisible ? 'col-lg-8' : 'col-auto',
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
              icon: icon,
              className: iconClassName
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert.Heading, {
              children: header
            }), body]
          }), buttonVisible && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "flex-grow-0 pt-3 pt-lg-0",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
              variant: "primary",
              href: buttonLink,
              onClick: () => {
                if (buttonAction) {
                  buttonAction();
                }
              },
              children: buttonMessage
            })
          })]
        })
      });
    }
  }));
}

CertificateStatusAlert.propTypes = {
  intl: _i18n.intlShape.isRequired,
  payload: _propTypes.default.shape({
    certificateAvailableDate: _propTypes.default.string,
    certStatus: _propTypes.default.string,
    courseEndDate: _propTypes.default.string,
    courseId: _propTypes.default.string,
    certURL: _propTypes.default.string,
    userTimezone: _propTypes.default.string,
    org: _propTypes.default.string,
    notPassingCourseEnded: _propTypes.default.bool,
    tabs: _propTypes.default.arrayOf(_propTypes.default.shape({
      tab_id: _propTypes.default.string,
      title: _propTypes.default.string,
      url: _propTypes.default.string
    }))
  }).isRequired
};

var _default = (0, _i18n.injectIntl)(CertificateStatusAlert);

exports.default = _default;
//# sourceMappingURL=CertificateStatusAlert.js.map