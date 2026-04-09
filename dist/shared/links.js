import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';
import { Hyperlink } from '@openedx/paragon';
import messages from '../courseware/course/course-exit/messages';
const DashboardLink = () => {
    const intl = useIntl();
    return (_jsx(Hyperlink, Object.assign({ variant: "muted", isInline: true, destination: `${getConfig().LMS_BASE_URL}/dashboard` }, { children: intl.formatMessage(messages.dashboardLink) })));
};
const IdVerificationSupportLink = () => {
    const intl = useIntl();
    if (!getConfig().SUPPORT_URL_ID_VERIFICATION) {
        return null;
    }
    return (_jsx(Hyperlink, Object.assign({ variant: "muted", isInline: true, destination: getConfig().SUPPORT_URL_ID_VERIFICATION }, { children: intl.formatMessage(messages.idVerificationSupportLink) })));
};
const ProfileLink = () => {
    const intl = useIntl();
    const { username } = getAuthenticatedUser();
    return (_jsx(Hyperlink, Object.assign({ variant: "muted", isInline: true, destination: `${getConfig().ACCOUNT_PROFILE_URL}/u/${username}` }, { children: intl.formatMessage(messages.profileLink) })));
};
export { DashboardLink, IdVerificationSupportLink, ProfileLink };
//# sourceMappingURL=links.js.map