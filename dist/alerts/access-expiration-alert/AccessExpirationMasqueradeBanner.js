import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedDate } from '@edx/frontend-platform/i18n';
import { PageBanner } from '@openedx/paragon';
const AccessExpirationMasqueradeBanner = ({ payload }) => {
    const { expirationDate, userTimezone, } = payload;
    const timezoneFormatArgs = userTimezone ? { timeZone: userTimezone } : {};
    return (_jsx(PageBanner, Object.assign({ variant: "warning" }, { children: _jsx(FormattedMessage, { id: "instructorToolbar.pageBanner.courseHasExpired", defaultMessage: "This learner no longer has access to this course. Their access expired on {date}.", description: "It's a warning that is shown to course author when being masqueraded as learner, while the course has expired for the real learner.", values: {
                date: _jsx(FormattedDate, Object.assign({ value: expirationDate }, timezoneFormatArgs), "instructorToolbar.pageBanner.accessExpirationDate"),
            } }) })));
};
AccessExpirationMasqueradeBanner.propTypes = {
    payload: PropTypes.shape({
        expirationDate: PropTypes.string.isRequired,
        userTimezone: PropTypes.string.isRequired,
    }).isRequired,
};
export default AccessExpirationMasqueradeBanner;
//# sourceMappingURL=AccessExpirationMasqueradeBanner.js.map