import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import PropTypes from 'prop-types';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { FormattedMessage, FormattedDate, useIntl } from '@edx/frontend-platform/i18n';
import { Alert, Hyperlink } from '@openedx/paragon';
import { Info } from '@openedx/paragon/icons';
import messages from './messages';
const AccessExpirationAlert = ({ payload }) => {
    const intl = useIntl();
    const { accessExpiration, courseId, org, userTimezone, analyticsPageName, } = payload;
    const timezoneFormatArgs = userTimezone ? { timeZone: userTimezone } : {};
    if (!accessExpiration) {
        return null;
    }
    const { expirationDate, upgradeDeadline, upgradeUrl, } = accessExpiration;
    const logClick = () => {
        sendTrackEvent('edx.bi.ecommerce.upsell_links_clicked', {
            org_key: org,
            courserun_key: courseId,
            linkCategory: 'FBE_banner',
            linkName: `${analyticsPageName}_audit_access_expires`,
            linkType: 'link',
            pageName: analyticsPageName,
        });
    };
    let deadlineMessage = null;
    if (upgradeDeadline && upgradeUrl) {
        deadlineMessage = (_jsxs(_Fragment, { children: [_jsx("br", {}), _jsx(FormattedMessage, { id: "learning.accessExpiration.deadline", defaultMessage: "Upgrade by {date} to get unlimited access to the course as long as it exists on the site.", description: "Warning shown to learner to upgrade while they are enrolled on the audit version and it's possible to upgrade", values: {
                        date: (_jsx(FormattedDate, Object.assign({ day: "numeric", month: "short", year: "numeric", value: upgradeDeadline }, timezoneFormatArgs), "accessExpirationUpgradeDeadline")),
                    } }), "\u00A0", _jsx(Hyperlink, Object.assign({ className: "font-weight-bold", style: { textDecoration: 'underline' }, destination: upgradeUrl, onClick: logClick }, { children: intl.formatMessage(messages.upgradeNow) }))] }));
    }
    return (_jsxs(Alert, Object.assign({ variant: "info", icon: Info }, { children: [_jsx("span", Object.assign({ className: "font-weight-bold" }, { children: _jsx(FormattedMessage, { id: "learning.accessExpiration.header", defaultMessage: "Audit Access Expires {date}", description: "Headline for auditing deadline", values: {
                        date: (_jsx(FormattedDate, Object.assign({ day: "numeric", month: "short", year: "numeric", value: expirationDate }, timezoneFormatArgs), "accessExpirationHeaderDate")),
                    } }) })), _jsx("br", {}), _jsx(FormattedMessage, { id: "learning.accessExpiration.body", defaultMessage: "You lose all access to this course, including your progress, on {date}.", description: "Message body to tell learner the consequences of course expiration.", values: {
                    date: (_jsx(FormattedDate, Object.assign({ day: "numeric", month: "short", year: "numeric", value: expirationDate }, timezoneFormatArgs), "accessExpirationBodyDate")),
                } }), deadlineMessage] })));
};
AccessExpirationAlert.propTypes = {
    payload: PropTypes.shape({
        accessExpiration: PropTypes.shape({
            expirationDate: PropTypes.string.isRequired,
            masqueradingExpiredCourse: PropTypes.bool.isRequired,
            upgradeDeadline: PropTypes.string,
            upgradeUrl: PropTypes.string,
        }).isRequired,
        courseId: PropTypes.string.isRequired,
        org: PropTypes.string.isRequired,
        userTimezone: PropTypes.string.isRequired,
        analyticsPageName: PropTypes.string.isRequired,
    }).isRequired,
};
export default AccessExpirationAlert;
//# sourceMappingURL=AccessExpirationAlert.js.map