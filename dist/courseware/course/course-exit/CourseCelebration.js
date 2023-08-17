"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _faLinkedinIn = require("@fortawesome/free-brands-svg-icons/faLinkedinIn");

var _i18n = require("@edx/frontend-platform/i18n");

var _reactHelmet = require("react-helmet");

var _reactRedux = require("react-redux");

var _paragon = require("@edx/paragon");

var _icons = require("@edx/paragon/icons");

var _frontendPlatform = require("@edx/frontend-platform");

var _auth = require("@edx/frontend-platform/auth");

var _celebration_456x = _interopRequireDefault(require("./assets/celebration_456x328.gif"));

var _celebration_750x = _interopRequireDefault(require("./assets/celebration_750x540.gif"));

var _edX_certificate = _interopRequireDefault(require("../../../generic/assets/edX_certificate.png"));

var _edX_locked_certificate = _interopRequireDefault(require("../../../generic/assets/edX_locked_certificate.png"));

var _upgradeButton = require("../../../generic/upgrade-button");

var _messages = _interopRequireDefault(require("./messages"));

var _modelStore = require("../../../generic/model-store");

var _thunks = require("../../../course-home/data/thunks");

var _ProgramCompletion = _interopRequireDefault(require("./ProgramCompletion"));

var _DashboardFootnote = _interopRequireDefault(require("./DashboardFootnote"));

var _UpgradeFootnote = _interopRequireDefault(require("./UpgradeFootnote"));

var _SocialIcons = _interopRequireDefault(require("../../social-share/SocialIcons"));

var _utils = require("./utils");

var _links = require("../../../shared/links");

var _CourseRecommendations = _interopRequireDefault(require("./CourseRecommendations"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const LINKEDIN_BLUE = '#2867B2';

function CourseCelebration(_ref) {
  let {
    intl
  } = _ref;

  const wideScreen = (0, _paragon.useWindowSize)().width >= _paragon.breakpoints.medium.minWidth;

  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseware);
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    certificateData,
    end,
    linkedinAddToProfileUrl,
    marketingUrl,
    offer,
    relatedPrograms,
    title,
    verifyIdentityUrl,
    verificationStatus
  } = (0, _modelStore.useModel)('coursewareMeta', courseId);
  const {
    org,
    verifiedMode,
    canViewCertificate,
    userTimezone
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    certStatus,
    certWebViewUrl,
    certificateAvailableDate
  } = certificateData || {};
  const {
    administrator
  } = (0, _auth.getAuthenticatedUser)();
  const dashboardLink = /*#__PURE__*/(0, _jsxRuntime.jsx)(_links.DashboardLink, {});
  const idVerificationSupportLink = /*#__PURE__*/(0, _jsxRuntime.jsx)(_links.IdVerificationSupportLink, {});
  const profileLink = /*#__PURE__*/(0, _jsxRuntime.jsx)(_links.ProfileLink, {});
  const timezoneFormatArgs = userTimezone ? {
    timeZone: userTimezone
  } : {};
  let buttonPrefix = null;
  let buttonLocation;
  let buttonText;
  let buttonVariant = 'outline-primary';
  let buttonEvent = null;
  let buttonSuffix = null;
  let certificateImage = _edX_certificate.default;
  let footnote;
  let message;
  let certHeader;
  let visitEvent = 'celebration_generic'; // These cases are taken from the edx-platform `get_cert_data` function found in lms/courseware/views/views.py

  switch (certStatus) {
    case 'downloadable':
      certHeader = intl.formatMessage(_messages.default.certificateHeaderDownloadable);
      message = /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
          id: "courseCelebration.certificateBody.available",
          defaultMessage: " Showcase your accomplishment on LinkedIn or your resum\xE9 today. You can download your certificate now and access it any time from your {dashboardLink} and {profileLink}.",
          values: {
            dashboardLink,
            profileLink
          },
          description: "Recommending an action for learner when course certificate is available"
        })
      });

      if (certWebViewUrl) {
        buttonLocation = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}${certWebViewUrl}`;
        buttonText = intl.formatMessage(_messages.default.viewCertificateButton);
      }

      if (linkedinAddToProfileUrl) {
        buttonPrefix = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Button, {
          className: "mr-3",
          href: linkedinAddToProfileUrl,
          onClick: () => (0, _utils.logClick)(org, courseId, administrator, 'linkedin_add_to_profile'),
          style: {
            backgroundColor: LINKEDIN_BLUE,
            border: 'none'
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
            icon: _faLinkedinIn.faLinkedinIn,
            className: "mr-3"
          }), `${intl.formatMessage(_messages.default.linkedinAddToProfileButton)}`]
        });
      }

      buttonEvent = 'view_cert';
      visitEvent = 'celebration_with_cert';
      footnote = /*#__PURE__*/(0, _jsxRuntime.jsx)(_DashboardFootnote.default, {
        variant: visitEvent
      });
      break;

    case 'earned_but_not_available':
      {
        const endDate = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedDate, {
          value: end,
          day: "numeric",
          month: "long",
          year: "numeric"
        });
        const certAvailableDate = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedDate, {
          value: certificateAvailableDate,
          day: "numeric",
          month: "long",
          year: "numeric"
        });
        certHeader = intl.formatMessage(_messages.default.certificateHeaderNotAvailable);
        message = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
              id: "courseCelebration.certificateBody.notAvailable.endDate.v2",
              defaultMessage: "This course ends on {endDate}. Final grades and any earned certificates are scheduled to be available after {certAvailableDate}.",
              values: {
                endDate,
                certAvailableDate
              },
              description: "This shown for leaner when they are eligible for certifcate but it't not available yet, it could because leaners just finished the course quickly!"
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            children: intl.formatMessage(_messages.default.certificateNotAvailableBodyAccessCert)
          })]
        });
        visitEvent = 'celebration_with_unavailable_cert';
        footnote = /*#__PURE__*/(0, _jsxRuntime.jsx)(_DashboardFootnote.default, {
          variant: visitEvent
        });
        break;
      }

    case 'requesting':
      // The requesting status needs a different button because it does a POST instead of a GET.
      // So we don't set buttonLocation and instead define a custom button as a buttonPrefix.
      buttonEvent = 'request_cert';
      buttonPrefix = /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
        variant: buttonVariant,
        onClick: () => {
          (0, _utils.logClick)(org, courseId, administrator, buttonEvent);
          dispatch((0, _thunks.requestCert)(courseId));
        },
        children: intl.formatMessage(_messages.default.requestCertificateButton)
      });
      certHeader = intl.formatMessage(_messages.default.certificateHeaderRequestable);
      message = /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: intl.formatMessage(_messages.default.requestCertificateBodyText)
      });
      visitEvent = 'celebration_with_requestable_cert';
      footnote = /*#__PURE__*/(0, _jsxRuntime.jsx)(_DashboardFootnote.default, {
        variant: visitEvent
      });
      break;

    case 'unverified':
      certHeader = intl.formatMessage(_messages.default.certificateHeaderUnverified);
      visitEvent = 'celebration_unverified';
      footnote = /*#__PURE__*/(0, _jsxRuntime.jsx)(_DashboardFootnote.default, {
        variant: visitEvent
      });

      if (verificationStatus === 'pending') {
        message = /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: intl.formatMessage(_messages.default.verificationPending)
        });
      } else {
        buttonText = intl.formatMessage(_messages.default.verifyIdentityButton);
        buttonEvent = 'verify_id';
        buttonLocation = verifyIdentityUrl; // todo: check for idVerificationSupportLink null

        message = /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "courseCelebration.certificateBody.unverified",
            defaultMessage: "In order to generate a certificate, you must complete ID verification. {idVerificationSupportLink} now.",
            values: {
              idVerificationSupportLink
            },
            description: "Its shown when learner are not verified thus it recommends going over the verification process"
          })
        });
      }

      break;

    case 'audit_passing':
    case 'honor_passing':
      if (verifiedMode) {
        certHeader = intl.formatMessage(_messages.default.certificateHeaderUpgradable);
        message = /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "courseCelebration.certificateBody.upgradable",
            defaultMessage: "It\u2019s not too late to upgrade. For {price} you will unlock access to all graded assignments in this course. Upon completion, you will receive a verified certificate which is a valuable credential to improve your job prospects and advance your career, or highlight your certificate in school applications.",
            values: {
              price: /*#__PURE__*/(0, _jsxRuntime.jsx)(_upgradeButton.FormattedPricing, {
                inline: true,
                offer: offer,
                verifiedMode: verifiedMode
              })
            },
            description: "Body text when the learner needs to upgrade to earn a certifcate and they have passed the course"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {}), (0, _frontendPlatform.getConfig)().SUPPORT_URL_VERIFIED_CERTIFICATE && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
            className: "text-gray-700",
            style: {
              textDecoration: 'underline'
            },
            destination: (0, _frontendPlatform.getConfig)().SUPPORT_URL_VERIFIED_CERTIFICATE,
            children: intl.formatMessage(_messages.default.verifiedCertificateSupportLink)
          })]
        });
        buttonText = intl.formatMessage(_messages.default.upgradeButton);
        buttonEvent = 'upgrade';
        buttonLocation = verifiedMode.upgradeUrl;
        buttonVariant = 'primary';

        if (offer) {
          buttonSuffix = /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "ml-2 align-middle",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
              id: "courseCelebration.upgradeDiscountCodePrompt",
              defaultMessage: "Use code {code} at checkout for {percent}% off!",
              values: {
                code: /*#__PURE__*/(0, _jsxRuntime.jsx)("b", {
                  children: offer.code
                }),
                percent: offer.percentage
              },
              description: "Shown if learner can use a discount code when they upgrade the course"
            })
          });
        }

        certificateImage = _edX_locked_certificate.default;
        visitEvent = 'celebration_upgrade';

        if (verifiedMode.accessExpirationDate) {
          footnote = /*#__PURE__*/(0, _jsxRuntime.jsx)(_UpgradeFootnote.default, {
            deadline: verifiedMode.accessExpirationDate,
            href: verifiedMode.upgradeUrl
          });
        } else {
          footnote = /*#__PURE__*/(0, _jsxRuntime.jsx)(_DashboardFootnote.default, {
            variant: visitEvent
          });
        }
      } else {
        visitEvent = 'celebration_audit_no_upgrade';
      }

      break;

    default:
      if (!canViewCertificate) {
        //  We reuse the cert event here. Since this default state is so
        //  Similar to the earned_not_available state, this event name should be fine
        //  to cover the same cases.
        visitEvent = 'celebration_with_unavailable_cert';
        certHeader = intl.formatMessage(_messages.default.certificateHeaderNotAvailable);
        const endDate = intl.formatDate(end, _objectSpread({
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }, timezoneFormatArgs));
        message = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            children: intl.formatMessage(_messages.default.certificateNotAvailableEndDateBody, {
              endDate
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            children: intl.formatMessage(_messages.default.certificateNotAvailableBodyAccessCert)
          })]
        });
      }

      break;
  }

  (0, _react.useEffect)(() => (0, _utils.logVisit)(org, courseId, administrator, visitEvent), [org, courseId, administrator, visitEvent]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactHelmet.Helmet, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("title", {
        children: `${intl.formatMessage(_messages.default.congratulationsHeader)} | ${title} | ${(0, _frontendPlatform.getConfig)().SITE_NAME}`
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "row w-100 mx-0 mb-4 px-5 py-4 border border-light",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "col-12 p-0 h2 text-center",
        children: intl.formatMessage(_messages.default.congratulationsHeader)
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "col-12 p-0 font-weight-normal lead text-center",
        children: [intl.formatMessage(_messages.default.completedCourseHeader), marketingUrl && ` ${intl.formatMessage(_messages.default.shareMessage)}`, /*#__PURE__*/(0, _jsxRuntime.jsx)(_SocialIcons.default, {
          analyticsId: "edx.ui.lms.course_exit.social_share.clicked",
          className: "mt-2",
          courseId: courseId,
          emailSubject: _messages.default.socialMessage,
          socialMessage: _messages.default.socialMessage
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "col-12 mt-3 mb-4 px-0 px-md-5 text-center",
        children: [!wideScreen && /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
          src: _celebration_456x.default,
          alt: `${intl.formatMessage(_messages.default.congratulationsImage)}`,
          className: "img-fluid"
        }), wideScreen && /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
          src: _celebration_750x.default,
          alt: `${intl.formatMessage(_messages.default.congratulationsImage)}`,
          className: "img-fluid",
          style: {
            width: '36rem'
          }
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "col-12 px-0 px-md-5",
        children: [certHeader && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert, {
          variant: "success",
          icon: _icons.CheckCircle,
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "row w-100 m-0",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              className: "col order-1 order-md-0 pl-0 pr-0 pr-md-5",
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: "h4",
                children: certHeader
              }), message, /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                className: "mt-2",
                children: [buttonPrefix, buttonLocation && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
                  variant: buttonVariant,
                  href: buttonLocation,
                  className: "w-xs-100 w-md-auto",
                  onClick: () => (0, _utils.logClick)(org, courseId, administrator, buttonEvent),
                  children: buttonText
                }), buttonSuffix]
              })]
            }), certStatus !== 'unverified' && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "col-12 order-0 col-md-3 order-md-1 w-100 mb-3 p-0 text-center",
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
                src: certificateImage,
                alt: `${intl.formatMessage(_messages.default.certificateImage)}`,
                className: "w-100",
                style: {
                  maxWidth: '13rem'
                }
              })
            })]
          })
        }), relatedPrograms && relatedPrograms.map(program => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProgramCompletion.default, {
          progress: program.progress,
          title: program.title,
          type: program.slug,
          url: program.url
        }, program.uuid)), footnote, /*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseRecommendations.default, {
          variant: visitEvent
        })]
      })]
    })]
  });
}

CourseCelebration.propTypes = {
  intl: _i18n.intlShape.isRequired
};

var _default = (0, _i18n.injectIntl)(CourseCelebration);

exports.default = _default;
//# sourceMappingURL=CourseCelebration.js.map