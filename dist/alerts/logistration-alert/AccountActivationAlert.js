import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { AlertModal, Button, Spinner, Icon, } from '@openedx/paragon';
import { Check, ArrowForward } from '@openedx/paragon/icons';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';
import { sendActivationEmail } from '../../courseware/data';
import messages from './messages';
const AccountActivationAlert = () => {
    const intl = useIntl();
    const [showModal, setShowModal] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [showCheck, setShowCheck] = useState(false);
    const handleOnClick = () => {
        setShowSpinner(true);
        setShowCheck(false);
        sendActivationEmail().then(() => {
            setShowSpinner(false);
            setShowCheck(true);
        });
    };
    const showAccountActivationAlert = Cookies.get('show-account-activation-popup');
    if (showAccountActivationAlert !== undefined) {
        Cookies.remove('show-account-activation-popup', { path: '/', domain: process.env.SESSION_COOKIE_DOMAIN });
        // extra check to make sure cookie was removed before updating the state. Updating the state without removal
        // of cookie would make it infinite rendering
        if (Cookies.get('show-account-activation-popup') === undefined) {
            setShowModal(true);
        }
    }
    const button = (_jsxs(Button, Object.assign({ variant: "primary", className: "", onClick: () => setShowModal(false) }, { children: [_jsx(FormattedMessage, { id: "account-activation.alert.button", defaultMessage: "Continue to {siteName}", description: "account activation alert continue button", values: {
                    siteName: getConfig().SITE_NAME,
                } }), _jsx(Icon, { src: ArrowForward, className: "ml-1 d-inline-block align-bottom" })] })));
    const children = () => {
        let bodyContent;
        const message = (_jsx(FormattedMessage, { id: "account-activation.alert.message", defaultMessage: "We sent an email to {boldEmail} with a link to activate your account. Can\u2019t find it? Check your spam folder or\n        {sendEmailTag}.", description: "Message for account activation alert which is shown after the registration", values: {
                boldEmail: _jsx("b", { children: getAuthenticatedUser() && getAuthenticatedUser().email }),
                sendEmailTag: (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                _jsx("a", Object.assign({ href: "#", role: "button", onClick: handleOnClick }, { children: _jsx(FormattedMessage, { id: "account-activation.resend.link", defaultMessage: "resend the email", description: "Message for resend link in account activation alert which is shown after the registration" }) }))),
            } }));
        bodyContent = (_jsx("div", { children: message }));
        if (!showCheck && showSpinner) {
            bodyContent = (_jsxs("div", { children: [message, _jsx(Spinner, { animation: "border", variant: "secondary", style: { height: '1.5rem', width: '1.5rem' } })] }));
        }
        if (showCheck && !showSpinner) {
            bodyContent = (_jsxs("div", { children: [message, _jsx(Icon, { src: Check, style: { height: '1.7rem', width: '1.25rem' }, className: "text-success-500 d-inline-block position-fixed" })] }));
        }
        return bodyContent;
    };
    return (_jsx(AlertModal, Object.assign({ isOpen: showModal, title: intl.formatMessage(messages.accountActivationAlertTitle), footerNode: button, onClose: () => ({}) }, { children: children() })));
};
export default AccountActivationAlert;
//# sourceMappingURL=AccountActivationAlert.js.map