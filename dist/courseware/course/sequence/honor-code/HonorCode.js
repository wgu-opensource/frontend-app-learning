import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';
import { ActionRow, Alert, Button } from '@openedx/paragon';
import { useNavigate } from 'react-router-dom';
import { useModel } from '../../../../generic/model-store';
import { saveIntegritySignature } from '../../../data';
import messages from './messages';
const HonorCode = ({ courseId }) => {
    const intl = useIntl();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isMasquerading, username, } = useModel('courseHomeMeta', courseId);
    const authUser = getAuthenticatedUser();
    const siteName = getConfig().SITE_NAME;
    const honorCodeUrl = `${getConfig().TERMS_OF_SERVICE_URL}#honor-code`;
    const handleCancel = () => navigate(`/course/${courseId}/home`);
    const handleAgree = () => dispatch(
    // If the request is made by a staff user masquerading as a specific learner,
    // don't actually create a signature for them on the backend.
    // Only the modal dialog will be dismissed.
    // Otherwise, even for staff users, we want to record the signature.
    saveIntegritySignature(courseId, isMasquerading && username !== authUser.username));
    return (_jsxs(Alert, Object.assign({ variant: "light", "aria-live": "off" }, { children: [_jsxs("h4", Object.assign({ "aria-level": "3" }, { children: [siteName, ' ', intl.formatMessage(messages['learn.honorCode.name'])] })), _jsx("p", { children: _jsx(FormattedMessage, { id: "learn.honorCode.content", defaultMessage: "Honesty and academic integrity are important to {siteName} and the institutions providing courses and programs on the {siteName} site. By clicking \u201CI agree\u201D below, I confirm that I have read, understand, and will abide by the {link} for the {siteName} Site.", values: {
                        siteName,
                        link: _jsx("a", Object.assign({ href: honorCodeUrl }, { children: intl.formatMessage(messages['learn.honorCode.name']) })),
                    }, description: "This is shown to learner, when course author wants to learners to explicity agree on their (Term of use or conduct), hence it links honor code page. " }) }), _jsxs(ActionRow, { children: [_jsx(ActionRow.Spacer, {}), _jsx(Button, Object.assign({ variant: "tertiary", onClick: handleCancel }, { children: intl.formatMessage(messages['learn.honorCode.cancel']) })), _jsx(Button, Object.assign({ variant: "primary", onClick: handleAgree }, { children: intl.formatMessage(messages['learn.honorCode.agree']) }))] })] })));
};
HonorCode.propTypes = {
    courseId: PropTypes.string.isRequired,
};
export default HonorCode;
//# sourceMappingURL=HonorCode.js.map