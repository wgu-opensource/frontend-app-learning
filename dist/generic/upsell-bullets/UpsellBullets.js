import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
const CheckmarkBullet = () => (_jsx("span", Object.assign({ className: "fa-li" }, { children: _jsx(FontAwesomeIcon, { icon: faCheck }) })));
// Must be child of a <ul className="fa-ul">
export const VerifiedCertBullet = () => {
    const verifiedCertLink = (_jsxs("a", Object.assign({ className: "inline-link-underline font-weight-bold", rel: "noopener noreferrer", target: "_blank", href: `${getConfig().MARKETING_SITE_BASE_URL}/verified-certificate` }, { children: [_jsx(FormattedMessage, { id: "learning.generic.upsell.verifiedCertBullet.verifiedCert", defaultMessage: "verified certificate", description: "Bolded words 'verified certificate', which is the name of credential the learner receives." }), _jsx("span", Object.assign({ className: "sr-only" }, { children: _jsx(FormattedMessage, { id: "learning.generic.upsell.verifiedCertBullet.verifiedCert.newTab.screenreaderOnly.message", defaultMessage: " (learn more in a new tab)" }) }))] })));
    return (_jsxs("li", Object.assign({ className: "upsell-bullet" }, { children: [_jsx(CheckmarkBullet, {}), _jsx(FormattedMessage, { id: "learning.generic.upsell.verifiedCertBullet", defaultMessage: "Earn a {verifiedCertLink} of completion to showcase on your resum\u00E9", description: "Bullet showcasing benefit of earned credential.", values: { verifiedCertLink } })] })));
};
// Must be child of a <ul className="fa-ul">
export const UnlockGradedBullet = () => {
    const gradedAssignmentsInBoldText = (_jsx("span", Object.assign({ className: "font-weight-bold" }, { children: _jsx(FormattedMessage, { id: "learning.generic.upsell.unlockGradedBullet.gradedAssignments", defaultMessage: "graded assignments", description: "Bolded words 'graded assignments', which are the bolded portion of a bullet point highlighting that course content is unlocked when purchasing an upgrade. Graded assignments are any course content that is graded and are unlocked by upgrading to verified certificates." }) })));
    return (_jsxs("li", Object.assign({ className: "upsell-bullet" }, { children: [_jsx(CheckmarkBullet, {}), _jsx(FormattedMessage, { id: "learning.generic.upsell.unlockGradedBullet", defaultMessage: "Unlock your access to all course activities, including {gradedAssignmentsInBoldText}", description: "Bullet showcasing benefit of additional course material.", values: { gradedAssignmentsInBoldText } })] })));
};
// Must be child of a <ul className="fa-ul">
export const FullAccessBullet = () => {
    const fullAccessInBoldText = (_jsx("span", Object.assign({ className: "font-weight-bold" }, { children: _jsx(FormattedMessage, { id: "learning.generic.upsell.fullAccessBullet.fullAccess", defaultMessage: "Full access", description: "Bolded phrase 'Full access', which is the bolded portion of a bullet point highlighting that access to course content will not have time limits." }) })));
    return (_jsxs("li", Object.assign({ className: "upsell-bullet" }, { children: [_jsx(CheckmarkBullet, {}), _jsx(FormattedMessage, { id: "learning.generic.upsell.fullAccessBullet", defaultMessage: "{fullAccessInBoldText} to course content and materials, even after the course ends", description: "Bullet showcasing upgrade lifts access durations.", values: { fullAccessInBoldText } })] })));
};
// Must be child of a <ul className="fa-ul">
export const SupportMissionBullet = () => {
    const missionInBoldText = (_jsx("span", Object.assign({ className: "font-weight-bold" }, { children: _jsx(FormattedMessage, { id: "learning.generic.upsell.supportMissionBullet.mission", defaultMessage: "mission", description: "Bolded word 'mission', which is the bolded portion of a bullet point encouraging the learner to support the goals of the website." }) })));
    return (_jsxs("li", Object.assign({ className: "upsell-bullet" }, { children: [_jsx(CheckmarkBullet, {}), _jsx(FormattedMessage, { id: "learning.generic.upsell.supportMissionBullet", defaultMessage: "Support our {missionInBoldText} at {siteName}", description: "Bullet encouraging user to support edX's goals.", values: { missionInBoldText, siteName: getConfig().SITE_NAME } })] })));
};
//# sourceMappingURL=UpsellBullets.js.map