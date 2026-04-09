import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton, } from 'react-share';
import { getConfig } from '@edx/frontend-platform';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';
import { useModel } from '../../generic/model-store';
const SocialIcons = ({ analyticsId, className, courseId, emailBody, emailSubject, hashtags, socialMessage, }) => {
    const intl = useIntl();
    const { marketingUrl } = useModel('coursewareMeta', courseId);
    const { org, title, } = useModel('courseHomeMeta', courseId);
    if (!marketingUrl) {
        return null;
    }
    const twitterUrl = getConfig().TWITTER_URL;
    const twitterAccount = twitterUrl && twitterUrl.substring(twitterUrl.lastIndexOf('/') + 1);
    const logClick = (service) => {
        if (!analyticsId) {
            return;
        }
        const { administrator } = getAuthenticatedUser();
        sendTrackEvent(analyticsId, {
            org_key: org,
            courserun_key: courseId,
            course_id: courseId,
            is_staff: administrator,
            service,
        });
    };
    const socialUtmCampaign = getConfig().SOCIAL_UTM_MILESTONE_CAMPAIGN
        ? `utm_campaign=${getConfig().SOCIAL_UTM_MILESTONE_CAMPAIGN}&` : '';
    const socialUtmMarketingUrl = `${marketingUrl}?${socialUtmCampaign}utm_medium=social`;
    return (_jsxs("div", Object.assign({ className: `social-icons ${className}` }, { children: [_jsxs(LinkedinShareButton, Object.assign({ beforeOnClick: () => logClick('linkedin'), url: `${socialUtmMarketingUrl}&utm_source=linkedin` }, { children: [_jsx(LinkedinIcon, { round: true, size: 32 }), _jsx("span", Object.assign({ className: "sr-only" }, { children: intl.formatMessage(messages.shareService, { service: 'LinkedIn' }) }))] })), twitterAccount && (_jsxs(TwitterShareButton, Object.assign({ beforeOnClick: () => logClick('twitter'), className: "ml-2", hashtags: hashtags, title: socialMessage ? intl.formatMessage(socialMessage, { platform: `@${twitterAccount}`, title }) : '', url: `${socialUtmMarketingUrl}&utm_source=twitter` }, { children: [_jsx(TwitterIcon, { round: true, size: 32 }), _jsx("span", Object.assign({ className: "sr-only" }, { children: intl.formatMessage(messages.shareService, { service: 'Twitter' }) }))] }))), _jsxs(FacebookShareButton, Object.assign({ beforeOnClick: () => logClick('facebook'), className: "ml-2", quote: socialMessage ? intl.formatMessage(socialMessage, { platform: getConfig().SITE_NAME, title }) : '', url: `${socialUtmMarketingUrl}&utm_source=facebook` }, { children: [_jsx(FacebookIcon, { round: true, size: 32 }), _jsx("span", Object.assign({ className: "sr-only" }, { children: intl.formatMessage(messages.shareService, { service: 'Facebook' }) }))] })), _jsxs(EmailShareButton, Object.assign({ beforeOnClick: () => logClick('email'), body: emailBody ? `${intl.formatMessage(emailBody)}\n\n` : '', className: "ml-2", subject: emailSubject ? intl.formatMessage(emailSubject, { platform: getConfig().SITE_NAME, title }) : '', url: `${marketingUrl}?${socialUtmCampaign}utm_medium=email&utm_source=email` }, { children: [_jsx(EmailIcon, { round: true, size: 32 }), _jsx("span", Object.assign({ className: "sr-only" }, { children: intl.formatMessage(messages.shareEmail) }))] }))] })));
};
SocialIcons.defaultProps = {
    analyticsId: '',
    className: '',
    emailBody: messages.defaultEmailBody,
    emailSubject: null,
    hashtags: [getConfig().TWITTER_HASHTAG],
    socialMessage: null,
};
SocialIcons.propTypes = {
    analyticsId: PropTypes.string,
    className: PropTypes.string,
    courseId: PropTypes.string.isRequired,
    emailBody: PropTypes.shape({}),
    emailSubject: PropTypes.shape({}),
    hashtags: PropTypes.arrayOf(PropTypes.string),
    socialMessage: PropTypes.shape({}),
};
export default SocialIcons;
//# sourceMappingURL=SocialIcons.js.map