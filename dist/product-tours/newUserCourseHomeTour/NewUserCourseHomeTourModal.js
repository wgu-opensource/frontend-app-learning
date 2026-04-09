import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';
import { ActionRow, Button, MarketingModal, ModalDialog, } from '@openedx/paragon';
import heroImage from './course_home_tour_modal_hero.png';
import messages from '../messages';
const NewUserCourseHomeTourModal = ({ isOpen, onDismiss, onStartTour, }) => {
    const intl = useIntl();
    return (_jsx(MarketingModal, Object.assign({ isOpen: isOpen, title: "New user course home prompt", className: "new-user-tour-dialog", heroIsDark: true, hasCloseButton: false, heroNode: (_jsxs(ModalDialog.Hero, { children: [_jsx(ModalDialog.Hero.Background, { backgroundSrc: heroImage }), _jsx(ModalDialog.Hero.Content, Object.assign({ style: { maxWidth: '20rem' } }, { children: _jsx(ModalDialog.Title, Object.assign({ as: "h2" }, { children: _jsx(FormattedMessage, { id: "tours.newUserModal.title", defaultMessage: "{welcome} {siteName} course!", values: {
                                siteName: getConfig().SITE_NAME,
                                welcome: _jsx("span", Object.assign({ className: "text-accent-b" }, { children: intl.formatMessage(messages.newUserModalTitleWelcome) })),
                            } }) })) }))] })), footerNode: (_jsxs(ActionRow, { children: [_jsx(Button, Object.assign({ variant: "tertiary", onClick: onDismiss }, { children: intl.formatMessage(messages.skipForNow) })), _jsx(Button, Object.assign({ variant: "brand", onClick: onStartTour }, { children: intl.formatMessage(messages.beginTour) }))] })), onClose: onDismiss }, { children: _jsx("p", Object.assign({ className: "text-dark-900" }, { children: intl.formatMessage(messages.newUserModalBody, { siteName: getConfig().SITE_NAME }) })) })));
};
NewUserCourseHomeTourModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onStartTour: PropTypes.func.isRequired,
};
export default NewUserCourseHomeTourModal;
//# sourceMappingURL=NewUserCourseHomeTourModal.js.map