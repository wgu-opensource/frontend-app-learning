import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Alert, Button } from '@openedx/paragon';
import React from 'react';
import PropTypes from 'prop-types';
const ScheduledContentAlert = ({ payload }) => {
    const { datesTabLink, } = payload;
    return (_jsx(Alert, Object.assign({ variant: "info" }, { children: _jsxs("div", Object.assign({ className: "d-flex flex-column flex-lg-row justify-content-between align-items-center" }, { children: [_jsxs("div", Object.assign({ className: "col-lg-7" }, { children: [_jsx(Alert.Heading, { children: _jsx(FormattedMessage, { id: "learning.outline.alert.scheduled-content.heading", defaultMessage: "More content is coming soon!" }) }), _jsx(FormattedMessage, { id: "learning.outline.alert.scheduled-content.body", defaultMessage: "This course will have more content released at a future date. Look out for email updates or check back on this course for updates." })] })), _jsx("div", Object.assign({ className: "flex-grow-0 pt-3 pt-lg-0" }, { children: datesTabLink && (_jsx(Button, Object.assign({ href: datesTabLink }, { children: _jsx(FormattedMessage, { id: "learning.outline.alert.scheduled-content.button", defaultMessage: "View Course Schedule" }) }))) }))] })) })));
};
ScheduledContentAlert.propTypes = {
    payload: PropTypes.shape({
        datesTabLink: PropTypes.string,
    }).isRequired,
};
export default ScheduledContentAlert;
//# sourceMappingURL=ScheduledCotentAlert.js.map