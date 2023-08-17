"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactShare = require("react-share");

var _frontendPlatform = require("@edx/frontend-platform");

var _analytics = require("@edx/frontend-platform/analytics");

var _auth = require("@edx/frontend-platform/auth");

var _i18n = require("@edx/frontend-platform/i18n");

var _messages = _interopRequireDefault(require("./messages"));

var _modelStore = require("../../generic/model-store");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SocialIcons(_ref) {
  let {
    analyticsId,
    className,
    courseId,
    emailBody,
    emailSubject,
    hashtags,
    intl,
    socialMessage
  } = _ref;
  const {
    marketingUrl
  } = (0, _modelStore.useModel)('coursewareMeta', courseId);
  const {
    org,
    title
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);

  if (!marketingUrl) {
    return null;
  }

  const twitterUrl = (0, _frontendPlatform.getConfig)().TWITTER_URL;
  const twitterAccount = twitterUrl && twitterUrl.substring(twitterUrl.lastIndexOf('/') + 1);

  const logClick = service => {
    if (!analyticsId) {
      return;
    }

    const {
      administrator
    } = (0, _auth.getAuthenticatedUser)();
    (0, _analytics.sendTrackEvent)(analyticsId, {
      org_key: org,
      courserun_key: courseId,
      course_id: courseId,
      // should only be courserun_key, but left as-is for historical reasons
      is_staff: administrator,
      service
    });
  };

  const socialUtmCampaign = (0, _frontendPlatform.getConfig)().SOCIAL_UTM_MILESTONE_CAMPAIGN ? `utm_campaign=${(0, _frontendPlatform.getConfig)().SOCIAL_UTM_MILESTONE_CAMPAIGN}&` : '';
  const socialUtmMarketingUrl = `${marketingUrl}?${socialUtmCampaign}utm_medium=social`;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `social-icons ${className}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactShare.LinkedinShareButton, {
      beforeOnClick: () => logClick('linkedin'),
      url: `${socialUtmMarketingUrl}&utm_source=linkedin`,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactShare.LinkedinIcon, {
        round: true,
        size: 32
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "sr-only",
        children: intl.formatMessage(_messages.default.shareService, {
          service: 'LinkedIn'
        })
      })]
    }), twitterAccount && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactShare.TwitterShareButton, {
      beforeOnClick: () => logClick('twitter'),
      className: "ml-2",
      hashtags: hashtags,
      title: socialMessage ? intl.formatMessage(socialMessage, {
        platform: `@${twitterAccount}`,
        title
      }) : '',
      url: `${socialUtmMarketingUrl}&utm_source=twitter`,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactShare.TwitterIcon, {
        round: true,
        size: 32
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "sr-only",
        children: intl.formatMessage(_messages.default.shareService, {
          service: 'Twitter'
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactShare.FacebookShareButton, {
      beforeOnClick: () => logClick('facebook'),
      className: "ml-2",
      quote: socialMessage ? intl.formatMessage(socialMessage, {
        platform: (0, _frontendPlatform.getConfig)().SITE_NAME,
        title
      }) : '',
      url: `${socialUtmMarketingUrl}&utm_source=facebook`,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactShare.FacebookIcon, {
        round: true,
        size: 32
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "sr-only",
        children: intl.formatMessage(_messages.default.shareService, {
          service: 'Facebook'
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactShare.EmailShareButton, {
      beforeOnClick: () => logClick('email'),
      body: emailBody ? `${intl.formatMessage(emailBody)}\n\n` : '',
      className: "ml-2",
      subject: emailSubject ? intl.formatMessage(emailSubject, {
        platform: (0, _frontendPlatform.getConfig)().SITE_NAME,
        title
      }) : '',
      url: `${marketingUrl}?${socialUtmCampaign}utm_medium=email&utm_source=email`,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactShare.EmailIcon, {
        round: true,
        size: 32
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "sr-only",
        children: intl.formatMessage(_messages.default.shareEmail)
      })]
    })]
  });
}

SocialIcons.defaultProps = {
  analyticsId: '',
  className: '',
  emailBody: _messages.default.defaultEmailBody,
  emailSubject: null,
  hashtags: [(0, _frontendPlatform.getConfig)().TWITTER_HASHTAG],
  socialMessage: null
};
SocialIcons.propTypes = {
  analyticsId: _propTypes.default.string,
  className: _propTypes.default.string,
  courseId: _propTypes.default.string.isRequired,
  emailBody: _propTypes.default.shape({}),
  emailSubject: _propTypes.default.shape({}),
  hashtags: _propTypes.default.arrayOf(_propTypes.default.string),
  intl: _i18n.intlShape.isRequired,
  socialMessage: _propTypes.default.shape({})
};

var _default = (0, _i18n.injectIntl)(SocialIcons);

exports.default = _default;
//# sourceMappingURL=SocialIcons.js.map