var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { ActionRow, breakpoints, Button, StandardModal, useWindowSize, } from '@openedx/paragon';
import { useDispatch } from 'react-redux';
import ClapsMobile from './assets/claps_280x201.gif';
import ClapsTablet from './assets/claps_456x328.gif';
import messages from './messages';
import SocialIcons from '../../social-share/SocialIcons';
import { recordFirstSectionCelebration } from './utils';
import { useModel } from '../../../generic/model-store';
const CelebrationModal = (_a) => {
    var { courseId, isOpen, onClose } = _a, rest = __rest(_a, ["courseId", "isOpen", "onClose"]);
    const intl = useIntl();
    const { org, celebrations } = useModel('courseHomeMeta', courseId);
    const dispatch = useDispatch();
    const wideScreen = useWindowSize().width >= breakpoints.small.minWidth;
    useEffect(() => {
        if (isOpen) {
            recordFirstSectionCelebration(org, courseId, celebrations, dispatch);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);
    return (_jsx(StandardModal, Object.assign({ footerNode: (_jsx(ActionRow, Object.assign({ isStacked: true, className: "pb-2" }, { children: _jsx(Button, Object.assign({ onClick: onClose }, { children: intl.formatMessage(messages.forward) })) }))), hasCloseButton: false, isOpen: isOpen, onClose: onClose, title: (_jsx("p", Object.assign({ className: "h2 text-center mr-n5 pt-4" }, { children: intl.formatMessage(messages.congrats) }))) }, rest, { children: _jsxs(_Fragment, { children: [_jsx("p", Object.assign({ className: "text-center" }, { children: intl.formatMessage(messages.completed) })), !wideScreen && _jsx("img", { src: ClapsMobile, alt: "", className: "img-fluid" }), wideScreen && _jsx("img", { src: ClapsTablet, alt: "", className: "img-fluid w-100" }), _jsxs("p", Object.assign({ className: "mt-3 text-center" }, { children: [_jsx("strong", { children: intl.formatMessage(messages.earned) }), " ", intl.formatMessage(messages.share)] })), _jsx(SocialIcons, { analyticsId: "edx.ui.lms.celebration.social_share.clicked", courseId: courseId, emailSubject: messages.emailSubject, socialMessage: messages.socialMessage })] }) })));
};
CelebrationModal.propTypes = {
    courseId: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
export default CelebrationModal;
//# sourceMappingURL=CelebrationModal.js.map