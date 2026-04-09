import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Alert, Button } from '@openedx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { useModel } from '../../../generic/model-store';
import CatalogSuggestion from './CatalogSuggestion';
import DashboardFootnote from './DashboardFootnote';
import messages from './messages';
import { logClick, logVisit } from './utils';
const CourseInProgress = () => {
    const intl = useIntl();
    const { courseId } = useSelector(state => state.courseware);
    const { org, tabs, title, } = useModel('courseHomeMeta', courseId);
    const { administrator } = getAuthenticatedUser();
    // Get dates tab link for 'view course schedule' button
    const datesTab = tabs.find(tab => tab.slug === 'dates');
    const datesTabLink = datesTab && datesTab.url;
    useEffect(() => logVisit(org, courseId, administrator, 'in_progress'), [org, courseId, administrator]);
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: `${intl.formatMessage(messages.endOfCourseTitle)} | ${title} | ${getConfig().SITE_NAME}` }) }), _jsxs("div", Object.assign({ className: "row w-100 mx-0 mb-4 px-5 py-4 border border-light justify-content-center" }, { children: [_jsx("div", Object.assign({ className: "col-12 p-0 h2 text-center" }, { children: intl.formatMessage(messages.courseInProgressHeader) })), _jsx(Alert, Object.assign({ variant: "primary", className: "mt-4" }, { children: _jsxs("div", Object.assign({ className: "row w-100 m-0 align-items-start" }, { children: [_jsx("div", Object.assign({ className: "col-md p-0" }, { children: intl.formatMessage(messages.courseInProgressDescription) })), datesTabLink && (_jsx(Button, Object.assign({ variant: "primary", className: "mt-3 my-md-0 mb-1 ml-md-5 w-xs-100 w-md-auto", href: datesTabLink, onClick: () => logClick(org, courseId, administrator, 'view_dates_tab') }, { children: intl.formatMessage(messages.viewCourseScheduleButton) })))] })) })), _jsx(DashboardFootnote, { variant: "in_progress" }), _jsx(CatalogSuggestion, { variant: "in_progress" })] }))] }));
};
export default CourseInProgress;
//# sourceMappingURL=CourseInProgress.js.map