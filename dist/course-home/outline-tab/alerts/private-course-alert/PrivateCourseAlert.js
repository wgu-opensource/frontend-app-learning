import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { useIntl, FormattedMessage } from '@edx/frontend-platform/i18n';
import { getLoginRedirectUrl } from '@edx/frontend-platform/auth';
import { Alert, Button, Hyperlink } from '@openedx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import enrollmentMessages from '../../../../alerts/enrollment-alert/messages';
import genericMessages from '../../../../generic/messages';
import messages from './messages';
import outlineMessages from '../../messages';
import useEnrollClickHandler from '../../../../alerts/enrollment-alert/clickHook';
import { useModel } from '../../../../generic/model-store';
const PrivateCourseAlert = ({ payload }) => {
    const intl = useIntl();
    const { anonymousUser, canEnroll, courseId, } = payload;
    const { org, title, } = useModel('courseHomeMeta', courseId);
    const { enrollClickHandler, loading } = useEnrollClickHandler(courseId, org, intl.formatMessage(enrollmentMessages.success));
    const enrollNowButton = (_jsx(Button, Object.assign({ disabled: loading, variant: "link", className: "p-0 border-0 align-top mr-1", style: { textDecoration: 'underline' }, size: "sm", onClick: enrollClickHandler }, { children: intl.formatMessage(enrollmentMessages.enrollNowInline) })));
    const register = (_jsx(Hyperlink, Object.assign({ style: { textDecoration: 'underline' }, destination: `${getConfig().LMS_BASE_URL}/register?next=${encodeURIComponent(global.location.href)}` }, { children: intl.formatMessage(genericMessages.registerLowercase) })));
    const signIn = (_jsx(Hyperlink, Object.assign({ style: { textDecoration: 'underline' }, destination: `${getLoginRedirectUrl(global.location.href)}` }, { children: intl.formatMessage(genericMessages.signInSentenceCase) })));
    return (_jsxs(Alert, Object.assign({ variant: "light", "data-testid": "private-course-alert" }, { children: [anonymousUser && (_jsxs(_Fragment, { children: [_jsx("p", Object.assign({ className: "font-weight-bold" }, { children: intl.formatMessage(enrollmentMessages.alert) })), _jsx(FormattedMessage, { id: "learning.privateCourse.signInOrRegister", description: "Prompts the user to sign in or register to see course content.", defaultMessage: "{signIn} or {register} and then enroll in this course.", values: {
                            signIn,
                            register,
                        } })] })), !anonymousUser && (_jsxs(_Fragment, { children: [_jsxs("p", Object.assign({ className: "font-weight-bold" }, { children: [intl.formatMessage(outlineMessages.welcomeTo), " ", title] })), canEnroll && (_jsxs("div", Object.assign({ className: "d-flex" }, { children: [enrollNowButton, intl.formatMessage(messages.toAccess), loading && _jsx(FontAwesomeIcon, { icon: faSpinner, spin: true })] }))), !canEnroll && (_jsx(_Fragment, { children: intl.formatMessage(enrollmentMessages.alert) }))] }))] })));
};
PrivateCourseAlert.propTypes = {
    payload: PropTypes.shape({
        anonymousUser: PropTypes.bool,
        canEnroll: PropTypes.bool,
        courseId: PropTypes.string,
    }).isRequired,
};
export default PrivateCourseAlert;
//# sourceMappingURL=PrivateCourseAlert.js.map