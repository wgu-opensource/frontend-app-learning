import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FormattedDate, FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, breakpoints, Button, Hyperlink, useWindowSize, } from '@openedx/paragon';
import { CheckCircle } from '@openedx/paragon/icons';
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import CelebrationMobile from './assets/celebration_456x328.gif';
import CelebrationDesktop from './assets/celebration_750x540.gif';
import certificate from '../../../generic/assets/openedx_certificate.png';
import certificateLocked from '../../../generic/assets/openedx_locked_certificate.png';
import { FormattedPricing } from '../../../generic/upgrade-button';
import messages from './messages';
import { useModel } from '../../../generic/model-store';
import { requestCert } from '../../../course-home/data/thunks';
import ProgramCompletion from './ProgramCompletion';
import UpgradeFootnote from './UpgradeFootnote';
import SocialIcons from '../../social-share/SocialIcons';
import { logClick, logVisit } from './utils';
import { DashboardLink, IdVerificationSupportLink, ProfileLink } from '../../../shared/links';
import DashboardFootnote from './DashboardFootnote';
import { CourseRecommendationsSlot } from '../../../plugin-slots/CourseExitPluginSlots';
const LINKEDIN_BLUE = '#2867B2';
const CourseCelebration = () => {
    const intl = useIntl();
    const wideScreen = useWindowSize().width >= breakpoints.medium.minWidth;
    const { courseId } = useSelector(state => state.courseware);
    const dispatch = useDispatch();
    const { certificateData, end, linkedinAddToProfileUrl, marketingUrl, offer, relatedPrograms, title, verifyIdentityUrl, verificationStatus, } = useModel('coursewareMeta', courseId);
    const { org, verifiedMode, canViewCertificate, userTimezone, } = useModel('courseHomeMeta', courseId);
    const { certStatus, certWebViewUrl, certificateAvailableDate, } = certificateData || {};
    const { administrator } = getAuthenticatedUser();
    const dashboardLink = _jsx(DashboardLink, {});
    const idVerificationSupportLink = _jsx(IdVerificationSupportLink, {});
    const profileLink = _jsx(ProfileLink, {});
    const timezoneFormatArgs = userTimezone ? { timeZone: userTimezone } : {};
    let buttonPrefix = null;
    let buttonLocation;
    let buttonText;
    let buttonVariant = 'outline-primary';
    let buttonEvent = null;
    let buttonSuffix = null;
    let certificateImage = certificate;
    let footnote;
    let message;
    let certHeader;
    let visitEvent = 'celebration_generic';
    // These cases are taken from the edx-platform `get_cert_data` function found in lms/courseware/views/views.py
    switch (certStatus) {
        case 'downloadable':
            certHeader = intl.formatMessage(messages.certificateHeaderDownloadable);
            message = (_jsx("p", { children: _jsx(FormattedMessage, { id: "courseCelebration.certificateBody.available", defaultMessage: "\n              Showcase your accomplishment on LinkedIn or your resum\u00E9 today.\n              You can download your certificate now and access it any time from your\n              {dashboardLink} and {profileLink}.", values: { dashboardLink, profileLink }, description: "Recommending an action for learner when course certificate is available" }) }));
            if (certWebViewUrl) {
                buttonLocation = `${getConfig().LMS_BASE_URL}${certWebViewUrl}`;
                buttonText = intl.formatMessage(messages.viewCertificateButton);
            }
            if (linkedinAddToProfileUrl) {
                buttonPrefix = (_jsxs(Button, Object.assign({ className: "mr-3", href: linkedinAddToProfileUrl, onClick: () => logClick(org, courseId, administrator, 'linkedin_add_to_profile'), style: { backgroundColor: LINKEDIN_BLUE, border: 'none' } }, { children: [_jsx(FontAwesomeIcon, { icon: faLinkedinIn, className: "mr-3" }), `${intl.formatMessage(messages.linkedinAddToProfileButton)}`] })));
            }
            buttonEvent = 'view_cert';
            visitEvent = 'celebration_with_cert';
            footnote = _jsx(DashboardFootnote, { variant: visitEvent });
            break;
        case 'earned_but_not_available': {
            const endDate = _jsx(FormattedDate, { value: end, day: "numeric", month: "long", year: "numeric" });
            const certAvailableDate = _jsx(FormattedDate, { value: certificateAvailableDate, day: "numeric", month: "long", year: "numeric" });
            certHeader = intl.formatMessage(messages.certificateHeaderNotAvailable);
            message = (_jsxs(_Fragment, { children: [_jsx("p", { children: _jsx(FormattedMessage, { id: "courseCelebration.certificateBody.notAvailable.endDate.v2", defaultMessage: "This course ends on {endDate}. Final grades and any earned certificates are\n              scheduled to be available after {certAvailableDate}.", values: { endDate, certAvailableDate }, description: "This shown for leaner when they are eligible for certifcate but it't not available yet, it could because leaners just finished the course quickly!" }) }), _jsx("p", { children: intl.formatMessage(messages.certificateNotAvailableBodyAccessCert) })] }));
            visitEvent = 'celebration_with_unavailable_cert';
            footnote = _jsx(DashboardFootnote, { variant: visitEvent });
            break;
        }
        case 'requesting':
            // The requesting status needs a different button because it does a POST instead of a GET.
            // So we don't set buttonLocation and instead define a custom button as a buttonPrefix.
            buttonEvent = 'request_cert';
            buttonPrefix = (_jsx(Button, Object.assign({ variant: buttonVariant, onClick: () => {
                    logClick(org, courseId, administrator, buttonEvent);
                    dispatch(requestCert(courseId));
                } }, { children: intl.formatMessage(messages.requestCertificateButton) })));
            certHeader = intl.formatMessage(messages.certificateHeaderRequestable);
            message = (_jsx("p", { children: intl.formatMessage(messages.requestCertificateBodyText) }));
            visitEvent = 'celebration_with_requestable_cert';
            footnote = _jsx(DashboardFootnote, { variant: visitEvent });
            break;
        case 'unverified':
            certHeader = intl.formatMessage(messages.certificateHeaderUnverified);
            visitEvent = 'celebration_unverified';
            footnote = _jsx(DashboardFootnote, { variant: visitEvent });
            if (verificationStatus === 'pending') {
                message = (_jsx("p", { children: intl.formatMessage(messages.verificationPending) }));
            }
            else {
                buttonText = intl.formatMessage(messages.verifyIdentityButton);
                buttonEvent = 'verify_id';
                buttonLocation = verifyIdentityUrl;
                // todo: check for idVerificationSupportLink null
                message = (_jsx("p", { children: _jsx(FormattedMessage, { id: "courseCelebration.certificateBody.unverified", defaultMessage: "In order to generate a certificate, you must complete ID verification.\n                {idVerificationSupportLink} now.", values: { idVerificationSupportLink }, description: "Its shown when learner are not verified thus it recommends going over the verification process" }) }));
            }
            break;
        case 'audit_passing':
        case 'honor_passing':
            if (verifiedMode) {
                certHeader = intl.formatMessage(messages.certificateHeaderUpgradable);
                message = (_jsxs("p", { children: [_jsx(FormattedMessage, { id: "courseCelebration.certificateBody.upgradable", defaultMessage: "It\u2019s not too late to upgrade. For {price} you will unlock access to all graded\n                assignments in this course. Upon completion, you will receive a verified certificate which is a\n                valuable credential to improve your job prospects and advance your career, or highlight your\n                certificate in school applications.", values: { price: _jsx(FormattedPricing, { inline: true, offer: offer, verifiedMode: verifiedMode }) }, description: "Body text when the learner needs to upgrade to earn a certifcate and they have passed the course" }), _jsx("br", {}), getConfig().SUPPORT_URL_VERIFIED_CERTIFICATE && (_jsx(Hyperlink, Object.assign({ className: "text-gray-700", style: { textDecoration: 'underline' }, destination: getConfig().SUPPORT_URL_VERIFIED_CERTIFICATE }, { children: intl.formatMessage(messages.verifiedCertificateSupportLink) })))] }));
                buttonText = intl.formatMessage(messages.upgradeButton);
                buttonEvent = 'upgrade';
                buttonLocation = verifiedMode.upgradeUrl;
                buttonVariant = 'primary';
                if (offer) {
                    buttonSuffix = (_jsx("span", Object.assign({ className: "ml-2 align-middle" }, { children: _jsx(FormattedMessage, { id: "courseCelebration.upgradeDiscountCodePrompt", defaultMessage: "Use code {code} at checkout for {percent}% off!", values: {
                                code: (_jsx("b", { children: offer.code })),
                                percent: offer.percentage,
                            }, description: "Shown if learner can use a discount code when they upgrade the course" }) })));
                }
                certificateImage = certificateLocked;
                visitEvent = 'celebration_upgrade';
                if (verifiedMode.accessExpirationDate) {
                    footnote = _jsx(UpgradeFootnote, { deadline: verifiedMode.accessExpirationDate, href: verifiedMode.upgradeUrl });
                }
                else {
                    footnote = _jsx(DashboardFootnote, { variant: visitEvent });
                }
            }
            else {
                visitEvent = 'celebration_audit_no_upgrade';
            }
            break;
        default:
            if (!canViewCertificate) {
                //  We reuse the cert event here. Since this default state is so
                //  Similar to the earned_not_available state, this event name should be fine
                //  to cover the same cases.
                visitEvent = 'celebration_with_unavailable_cert';
                certHeader = intl.formatMessage(messages.certificateHeaderNotAvailable);
                const endDate = intl.formatDate(end, Object.assign({ year: 'numeric', month: 'long', day: 'numeric' }, timezoneFormatArgs));
                message = (_jsxs(_Fragment, { children: [_jsx("p", { children: intl.formatMessage(messages.certificateNotAvailableEndDateBody, { endDate }) }), _jsx("p", { children: intl.formatMessage(messages.certificateNotAvailableBodyAccessCert) })] }));
            }
            break;
    }
    useEffect(() => logVisit(org, courseId, administrator, visitEvent), [org, courseId, administrator, visitEvent]);
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: `${intl.formatMessage(messages.congratulationsHeader)} | ${title} | ${getConfig().SITE_NAME}` }) }), _jsxs("div", Object.assign({ className: "row w-100 mx-0 mb-4 px-5 py-4 border border-light" }, { children: [_jsx("div", Object.assign({ className: "col-12 p-0 h2 text-center" }, { children: intl.formatMessage(messages.congratulationsHeader) })), _jsxs("div", Object.assign({ className: "col-12 p-0 font-weight-normal lead text-center" }, { children: [intl.formatMessage(messages.completedCourseHeader), marketingUrl && ` ${intl.formatMessage(messages.shareMessage)}`, _jsx(SocialIcons, { analyticsId: "edx.ui.lms.course_exit.social_share.clicked", className: "mt-2", courseId: courseId, emailSubject: messages.socialMessage, socialMessage: messages.socialMessage })] })), _jsxs("div", Object.assign({ className: "col-12 mt-3 mb-4 px-0 px-md-5 text-center" }, { children: [!wideScreen && (_jsx("img", { src: CelebrationMobile, alt: `${intl.formatMessage(messages.congratulationsImage)}`, className: "img-fluid" })), wideScreen && (_jsx("img", { src: CelebrationDesktop, alt: `${intl.formatMessage(messages.congratulationsImage)}`, className: "img-fluid", style: { width: '36rem' } }))] })), _jsxs("div", Object.assign({ className: "col-12 px-0 px-md-5" }, { children: [certHeader && (_jsx(Alert, Object.assign({ variant: "success", icon: CheckCircle }, { children: _jsxs("div", Object.assign({ className: "row w-100 m-0" }, { children: [_jsxs("div", Object.assign({ className: "col order-1 order-md-0 pl-0 pr-0 pr-md-5" }, { children: [_jsx("div", Object.assign({ className: "h4" }, { children: certHeader })), message, _jsxs("div", Object.assign({ className: "mt-2" }, { children: [buttonPrefix, buttonLocation && (_jsx(Button, Object.assign({ variant: buttonVariant, href: buttonLocation, className: "w-xs-100 w-md-auto", onClick: () => logClick(org, courseId, administrator, buttonEvent) }, { children: buttonText }))), buttonSuffix] }))] })), certStatus !== 'unverified' && (_jsx("div", Object.assign({ className: "col-12 order-0 col-md-3 order-md-1 w-100 mb-3 p-0 text-center" }, { children: _jsx("img", { src: certificateImage, alt: `${intl.formatMessage(messages.certificateImage)}`, className: "w-100", style: { maxWidth: '13rem' } }) })))] })) }))), relatedPrograms && relatedPrograms.map(program => (_jsx(ProgramCompletion, { progress: program.progress, title: program.title, type: program.slug, url: program.url }, program.uuid))), footnote, _jsx(CourseRecommendationsSlot, { variant: visitEvent })] }))] }))] }));
};
export default CourseCelebration;
//# sourceMappingURL=CourseCelebration.js.map