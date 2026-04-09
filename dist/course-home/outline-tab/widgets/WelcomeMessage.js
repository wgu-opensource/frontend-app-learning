import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Alert, Button, TransitionReplace } from '@openedx/paragon';
import truncate from 'truncate-html';
import { useDispatch } from 'react-redux';
import LmsHtmlFragment from '../LmsHtmlFragment';
import messages from '../messages';
import { useModel } from '../../../generic/model-store';
import { dismissWelcomeMessage } from '../../data/thunks';
const WelcomeMessage = ({ courseId, nextElementRef }) => {
    const intl = useIntl();
    const { welcomeMessageHtml, } = useModel('outline', courseId);
    const messageBodyRef = useRef();
    const [display, setDisplay] = useState(true);
    // welcomeMessageHtml can contain comments or malformatted HTML which can impact the length that determines
    // messageCanBeShortened. We clean it by calling truncate with a length of welcomeMessageHtml.length which
    // will not result in a truncation but a formatting into 'truncate-html' canonical format.
    const cleanedWelcomeMessageHtml = useMemo(() => truncate(welcomeMessageHtml, welcomeMessageHtml.length, { keepWhitespaces: true }), [welcomeMessageHtml]);
    const shortWelcomeMessageHtml = useMemo(() => truncate(cleanedWelcomeMessageHtml, 100, { byWords: true, keepWhitespaces: true }), [cleanedWelcomeMessageHtml]);
    const messageCanBeShortened = useMemo(() => (shortWelcomeMessageHtml.length < cleanedWelcomeMessageHtml.length), [cleanedWelcomeMessageHtml, shortWelcomeMessageHtml]);
    const [showShortMessage, setShowShortMessage] = useState(messageCanBeShortened);
    const dispatch = useDispatch();
    if (!welcomeMessageHtml) {
        return null;
    }
    return (_jsx(Alert, Object.assign({ "data-testid": "alert-container-welcome", variant: "light", stacked: true, dismissible: true, show: display, onClose: () => {
            var _a;
            (_a = nextElementRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            setDisplay(false);
            dispatch(dismissWelcomeMessage(courseId));
        }, className: "raised-card", actions: messageCanBeShortened ? [
            _jsx(Button, Object.assign({ onClick: () => {
                    var _a;
                    if (showShortMessage) {
                        (_a = messageBodyRef.current) === null || _a === void 0 ? void 0 : _a.focus();
                    }
                    setShowShortMessage(!showShortMessage);
                }, variant: "outline-primary" }, { children: showShortMessage ? intl.formatMessage(messages.welcomeMessageShowMoreButton)
                    : intl.formatMessage(messages.welcomeMessageShowLessButton) })),
        ] : [] }, { children: _jsx("div", Object.assign({ ref: messageBodyRef, tabIndex: "-1" }, { children: _jsx(TransitionReplace, Object.assign({ className: "mb-3", enterDuration: 400, exitDuration: 200 }, { children: showShortMessage ? (_jsx(LmsHtmlFragment, { className: "inline-link", "data-testid": "short-welcome-message-iframe", html: shortWelcomeMessageHtml, title: intl.formatMessage(messages.welcomeMessage) }, "short-html")) : (_jsx(LmsHtmlFragment, { className: "inline-link", "data-testid": "long-welcome-message-iframe", html: cleanedWelcomeMessageHtml, title: intl.formatMessage(messages.welcomeMessage) }, "full-html")) })) })) })));
};
WelcomeMessage.propTypes = {
    courseId: PropTypes.string.isRequired,
    nextElementRef: PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) }),
};
export default WelcomeMessage;
//# sourceMappingURL=WelcomeMessage.js.map