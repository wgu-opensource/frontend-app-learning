import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import { useIntl, FormattedMessage } from '@edx/frontend-platform/i18n';
import { getLoginRedirectUrl } from '@edx/frontend-platform/auth';
import { Alert, Hyperlink } from '@openedx/paragon';
import { WarningFilled } from '@openedx/paragon/icons';
import genericMessages from '../../generic/messages';
const LogistrationAlert = () => {
    const intl = useIntl();
    const signIn = (_jsx(Hyperlink, Object.assign({ style: { textDecoration: 'underline' }, destination: `${getLoginRedirectUrl(global.location.href)}` }, { children: intl.formatMessage(genericMessages.signInLowercase) })));
    // TODO: Pull this registration URL building out into a function, like the login one above.
    // This is complicated by the fact that we don't have a REGISTER_URL env variable available.
    const register = (_jsx(Hyperlink, Object.assign({ style: { textDecoration: 'underline' }, destination: `${getConfig().LMS_BASE_URL}/register?next=${encodeURIComponent(global.location.href)}` }, { children: intl.formatMessage(genericMessages.registerLowercase) })));
    return (_jsx(Alert, Object.assign({ variant: "warning", icon: WarningFilled }, { children: _jsx(FormattedMessage, { id: "learning.logistration.alert", description: "Prompts the user to sign in or register to see course content.", defaultMessage: "To see course content, {signIn} or {register}.", values: {
                signIn,
                register,
            } }) })));
};
export default LogistrationAlert;
//# sourceMappingURL=LogistrationAlert.js.map