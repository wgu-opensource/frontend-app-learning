import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Toast } from '@openedx/paragon';
import { FooterSlot } from '@edx/frontend-component-footer';
import HeaderSlot from '../plugin-slots/HeaderSlot';
import PageLoading from '../generic/PageLoading';
import { getAccessDeniedRedirectUrl } from '../shared/access';
import { useModel } from '../generic/model-store';
import genericMessages from '../generic/messages';
import messages from './messages';
import LoadedTabPage from './LoadedTabPage';
import { setCallToActionToast } from '../course-home/data/slice';
import LaunchCourseHomeTourButton from '../product-tours/newUserCourseHomeTour/LaunchCourseHomeTourButton';
const TabPage = (props) => {
    const intl = useIntl();
    const { activeTabSlug, courseId, courseStatus, metadataModel, } = props;
    const { toastBodyLink, toastBodyText, toastHeader, } = useSelector(state => state.courseHome);
    const dispatch = useDispatch();
    const { courseAccess, number, org, start, title, } = useModel('courseHomeMeta', courseId);
    if (courseStatus === 'denied') {
        const redirectUrl = getAccessDeniedRedirectUrl(courseId, activeTabSlug, courseAccess, start);
        if (redirectUrl) {
            return (_jsx(Navigate, { to: redirectUrl, replace: true }));
        }
    }
    return (_jsxs(_Fragment, { children: [['loaded', 'denied'].includes(courseStatus) && (_jsxs(_Fragment, { children: [_jsx(Toast, Object.assign({ action: toastBodyText ? {
                            label: toastBodyText,
                            href: toastBodyLink,
                        } : null, closeLabel: intl.formatMessage(genericMessages.close), onClose: () => dispatch(setCallToActionToast({ header: '', link: null, link_text: null })), show: !!(toastHeader) }, { children: toastHeader })), metadataModel === 'courseHomeMeta' && (_jsx(LaunchCourseHomeTourButton, { srOnly: true }))] })), _jsx(HeaderSlot, { courseOrg: org, courseNumber: number, courseTitle: title }), courseStatus === 'loading' && (_jsx(PageLoading, { srMessage: intl.formatMessage(messages.loading) })), ['loaded', 'denied'].includes(courseStatus) && (_jsx(LoadedTabPage, Object.assign({}, props))), (!['loading', 'loaded', 'denied'].includes(courseStatus)) && (_jsx("p", Object.assign({ className: "text-center py-5 mx-auto", style: { maxWidth: '30em' } }, { children: intl.formatMessage(messages.failure) }))), _jsx(FooterSlot, {})] }));
};
TabPage.defaultProps = {
    courseId: null,
    unitId: null,
};
TabPage.propTypes = {
    activeTabSlug: PropTypes.string.isRequired,
    courseId: PropTypes.string,
    courseStatus: PropTypes.string.isRequired,
    metadataModel: PropTypes.string.isRequired,
    unitId: PropTypes.string,
};
export default TabPage;
//# sourceMappingURL=TabPage.js.map