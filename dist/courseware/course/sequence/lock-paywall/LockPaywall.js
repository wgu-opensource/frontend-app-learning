import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Alert, Hyperlink, breakpoints, useWindowSize, } from '@openedx/paragon';
import { Locked } from '@openedx/paragon/icons';
import SidebarContext from '../../sidebar/SidebarContext';
import messages from './messages';
import certificateLocked from '../../../../generic/assets/openedx_locked_certificate.png';
import { useModel } from '../../../../generic/model-store';
import { UpgradeButton } from '../../../../generic/upgrade-button';
import { VerifiedCertBullet, UnlockGradedBullet, FullAccessBullet, SupportMissionBullet, } from '../../../../generic/upsell-bullets/UpsellBullets';
const LockPaywall = ({ courseId, }) => {
    const intl = useIntl();
    const { notificationTrayVisible } = useContext(SidebarContext);
    const course = useModel('coursewareMeta', courseId);
    const { accessExpiration, marketingUrl, offer, } = course;
    const { org, verifiedMode, } = useModel('courseHomeMeta', courseId);
    // the following variables are set and used for resposive layout to work with
    // whether the NotificationTray is open or not and if there's an offer with longer text
    const shouldDisplayBulletPointsBelowCertificate = useWindowSize().width <= breakpoints.large.minWidth;
    const shouldDisplayGatedContentOneColumn = useWindowSize().width <= breakpoints.extraLarge.minWidth
        && notificationTrayVisible;
    const shouldDisplayGatedContentTwoColumns = useWindowSize().width < breakpoints.large.minWidth
        && notificationTrayVisible;
    const shouldDisplayGatedContentTwoColumnsHalf = useWindowSize().width <= breakpoints.large.minWidth
        && !notificationTrayVisible;
    const shouldWrapTextOnButton = useWindowSize().width > breakpoints.extraSmall.minWidth;
    const accessExpirationDate = accessExpiration ? new Date(accessExpiration.expirationDate) : null;
    const pastExpirationDeadline = accessExpiration ? new Date(Date.now()) > accessExpirationDate : false;
    if (!verifiedMode) {
        return null;
    }
    const eventProperties = {
        org_key: org,
        courserun_key: courseId,
    };
    const logClick = () => {
        sendTrackEvent('edx.bi.ecommerce.upsell_links_clicked', Object.assign(Object.assign({}, eventProperties), { linkCategory: '(none)', linkName: 'in_course_upgrade', linkType: 'link', pageName: 'in_course' }));
    };
    const logClickPastExpiration = () => {
        sendTrackEvent('edx.bi.ecommerce.gated_content.past_expiration.link_clicked', Object.assign(Object.assign({}, eventProperties), { linkCategory: 'gated_content', linkName: 'course_details', linkType: 'link', pageName: 'in_course' }));
    };
    return (_jsx(Alert, Object.assign({ variant: "light", "aria-live": "off", icon: Locked, className: "lock-paywall-container", "data-testId": "lock-paywall-test-id" }, { children: _jsxs("div", Object.assign({ className: "row" }, { children: [_jsxs("div", Object.assign({ className: "col" }, { children: [_jsx("h4", Object.assign({ "aria-level": "3" }, { children: _jsx("span", { children: intl.formatMessage(messages['learn.lockPaywall.title']) }) })), pastExpirationDeadline ? (_jsxs("div", Object.assign({ className: "mb-2 upgrade-intro" }, { children: [intl.formatMessage(messages['learn.lockPaywall.content.pastExpiration']), _jsx(Hyperlink, Object.assign({ destination: marketingUrl, onClick: logClickPastExpiration, target: "_blank" }, { children: intl.formatMessage(messages['learn.lockPaywall.courseDetails']) }))] }))) : (_jsx("div", Object.assign({ className: "mb-2 upgrade-intro" }, { children: intl.formatMessage(messages['learn.lockPaywall.content']) }))), _jsxs("div", Object.assign({ className: classNames('d-inline-flex flex-row', { 'flex-wrap': notificationTrayVisible || shouldDisplayBulletPointsBelowCertificate }) }, { children: [_jsx("div", Object.assign({ style: { float: 'left' }, className: "mr-3 mb-2" }, { children: _jsx("img", { alt: intl.formatMessage(messages['learn.lockPaywall.example.alt']), src: certificateLocked, className: "border-0 certificate-image-banner", style: { height: '128px', width: '175px' } }) })), _jsxs("div", Object.assign({ className: "mw-xs list-div" }, { children: [_jsx("div", Object.assign({ className: "mb-2" }, { children: intl.formatMessage(messages['learn.lockPaywall.list.intro']) })), _jsxs("ul", Object.assign({ className: "fa-ul ml-4 pl-2" }, { children: [_jsx(VerifiedCertBullet, {}), _jsx(UnlockGradedBullet, {}), _jsx(FullAccessBullet, {}), _jsx(SupportMissionBullet, {})] }))] }))] }))] })), pastExpirationDeadline
                    ? null
                    : (_jsx("div", Object.assign({ className: classNames('d-md-flex align-items-md-center text-right', {
                            'col-md-5 mx-md-0': notificationTrayVisible, 'col-md-4 mx-md-3 justify-content-center': !notificationTrayVisible && !shouldDisplayGatedContentTwoColumnsHalf, 'col-md-11 justify-content-end': shouldDisplayGatedContentOneColumn && !shouldDisplayGatedContentTwoColumns, 'col-md-6 justify-content-center': shouldDisplayGatedContentTwoColumnsHalf,
                        }) }, { children: _jsx(UpgradeButton, { offer: offer, onClick: logClick, verifiedMode: verifiedMode, style: { whiteSpace: shouldWrapTextOnButton ? 'nowrap' : null } }) })))] })) })));
};
LockPaywall.propTypes = {
    courseId: PropTypes.string.isRequired,
};
export default LockPaywall;
//# sourceMappingURL=LockPaywall.js.map