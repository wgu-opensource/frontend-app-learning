import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import PropTypes from 'prop-types';
import { Alert, Button } from '@openedx/paragon';
import { Info, WarningFilled } from '@openedx/paragon/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useModel } from '../../generic/model-store';
import messages from './messages';
import useEnrollClickHandler from './clickHook';
const EnrollmentAlert = ({ payload }) => {
    const intl = useIntl();
    const { canEnroll, courseId, extraText, isStaff, } = payload;
    const { org, } = useModel('courseHomeMeta', courseId);
    const { enrollClickHandler, loading } = useEnrollClickHandler(courseId, org, intl.formatMessage(messages.success));
    let text = intl.formatMessage(messages.alert);
    let type = 'warning';
    let icon = WarningFilled;
    if (isStaff) {
        text = intl.formatMessage(messages.staffAlert);
        type = 'info';
        icon = Info;
    }
    else if (extraText) {
        text = `${text} ${extraText}`;
    }
    const button = canEnroll && (_jsx(Button, Object.assign({ disabled: loading, variant: "link", className: "p-0 border-0 align-top mx-1", size: "sm", style: { textDecoration: 'underline' }, onClick: enrollClickHandler }, { children: intl.formatMessage(messages.enrollNowSentence) })));
    return (_jsx(Alert, Object.assign({ variant: type, icon: icon }, { children: _jsxs("div", Object.assign({ className: "d-flex" }, { children: [text, button, loading && _jsx(FontAwesomeIcon, { icon: faSpinner, spin: true })] })) })));
};
EnrollmentAlert.propTypes = {
    payload: PropTypes.shape({
        canEnroll: PropTypes.bool,
        courseId: PropTypes.string,
        extraText: PropTypes.string,
        isStaff: PropTypes.bool,
    }).isRequired,
};
export default EnrollmentAlert;
//# sourceMappingURL=EnrollmentAlert.js.map