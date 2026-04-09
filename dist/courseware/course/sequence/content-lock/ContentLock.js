import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Button } from '@openedx/paragon';
import messages from './messages';
const ContentLock = ({ courseId, prereqSectionName, prereqId, sequenceTitle, }) => {
    const intl = useIntl();
    const navigate = useNavigate();
    const handleClick = useCallback(() => {
        navigate(`/course/${courseId}/${prereqId}`);
    }, [courseId, prereqId]);
    return (_jsxs(_Fragment, { children: [_jsxs("h3", { children: [_jsx(FontAwesomeIcon, { icon: faLock }), ' ', sequenceTitle] }), _jsx("h4", { children: intl.formatMessage(messages['learn.contentLock.content.locked']) }), _jsx("p", { children: intl.formatMessage(messages['learn.contentLock.complete.prerequisite'], {
                    prereqSectionName,
                }) }), _jsx("p", { children: _jsx(Button, Object.assign({ variant: "primary", onClick: handleClick }, { children: intl.formatMessage(messages['learn.contentLock.goToSection']) })) })] }));
};
ContentLock.propTypes = {
    courseId: PropTypes.string.isRequired,
    prereqSectionName: PropTypes.string.isRequired,
    prereqId: PropTypes.string.isRequired,
    sequenceTitle: PropTypes.string.isRequired,
};
export default ContentLock;
//# sourceMappingURL=ContentLock.js.map