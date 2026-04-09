import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { Container, Icon, Hyperlink } from '@openedx/paragon';
import { CheckCircleLightOutline, ErrorOutline } from '@openedx/paragon/icons';
import { useParams } from 'react-router-dom';
import Header from '@edx/frontend-component-header';
import { getConfig } from '@edx/frontend-platform';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { logError } from '@edx/frontend-platform/logging';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';
import { LOADED, LOADING, FAILED } from '@src/constants';
import PageLoading from '../generic/PageLoading';
import { unsubscribeNotificationPreferences } from './data/api';
import messages from './messages';
const PreferencesUnsubscribe = () => {
    const intl = useIntl();
    const { userToken } = useParams();
    const [status, setStatus] = useState(LOADING);
    useEffect(() => {
        unsubscribeNotificationPreferences(userToken).then(() => setStatus(LOADED), (error) => {
            setStatus(FAILED);
            logError(error);
        });
        sendTrackEvent('edx.ui.lms.notifications.preferences.unsubscribe', { userToken });
    }, []);
    const pageContent = {
        icon: CheckCircleLightOutline,
        iconClass: 'text-success',
        headingText: messages.unsubscribeSuccessHeading,
        bodyText: messages.unsubscribeSuccessMessage,
    };
    if (status === FAILED) {
        pageContent.icon = ErrorOutline;
        pageContent.iconClass = 'text-danger';
        pageContent.headingText = messages.unsubscribeFailedHeading;
        pageContent.bodyText = messages.unsubscribeFailedMessage;
    }
    return (_jsxs("div", Object.assign({ style: { height: '100vh' } }, { children: [_jsx(Header, {}), _jsx(Container, Object.assign({ size: "xs", className: "h-75 mx-auto my-auto" }, { children: _jsx("div", Object.assign({ className: "d-flex flex-row h-100" }, { children: _jsxs("div", Object.assign({ className: "mx-auto my-auto" }, { children: [status === LOADING && _jsx(PageLoading, { srMessage: `${intl.formatMessage(messages.unsubscribeLoading)}` }), status !== LOADING && (_jsxs(_Fragment, { children: [_jsx(Icon, { src: pageContent.icon, className: `size-56px mx-auto ${pageContent.iconClass}` }), _jsx("h3", Object.assign({ className: "font-weight-bold text-primary-500 text-center my-3", "data-testid": "heading-text" }, { children: intl.formatMessage(pageContent.headingText) })), _jsx("div", Object.assign({ className: "font-weight-normal text-gray-700 text-center" }, { children: intl.formatMessage(pageContent.bodyText) })), _jsx("small", Object.assign({ className: "d-block font-weight-normal text-gray text-center mt-3" }, { children: _jsx(FormattedMessage, { id: "learning.notification.preferences.unsubscribe.preferenceCenterUrl", description: "Shown as a suggestion or recommendation for learner when their unsubscribing request has failed", defaultMessage: "Go to the {preferenceCenterUrl} to set your preferences", values: {
                                                preferenceCenterUrl: (_jsx(Hyperlink, Object.assign({ destination: `${getConfig().ACCOUNT_SETTINGS_URL}/#notifications` }, { children: intl.formatMessage(messages.preferenceCenterUrl) }))),
                                            } }) }))] }))] })) })) }))] })));
};
export default PreferencesUnsubscribe;
//# sourceMappingURL=index.js.map