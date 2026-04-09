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
const CourseNonPassing = () => {
    const intl = useIntl();
    const { courseId } = useSelector(state => state.courseware);
    const { org, tabs, title, } = useModel('courseHomeMeta', courseId);
    const { administrator } = getAuthenticatedUser();
    // Get progress tab link for 'view grades' button
    const progressTab = tabs.find(tab => tab.slug === 'progress');
    const progressLink = progressTab && progressTab.url;
    useEffect(() => logVisit(org, courseId, administrator, 'nonpassing'), [org, courseId, administrator]);
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: `${intl.formatMessage(messages.endOfCourseTitle)} | ${title} | ${getConfig().SITE_NAME}` }) }), _jsxs("div", Object.assign({ className: "row w-100 mx-0 mb-4 px-5 py-4 border border-light justify-content-center" }, { children: [_jsx("div", Object.assign({ className: "col-12 p-0 h2 text-center" }, { children: intl.formatMessage(messages.endOfCourseHeader) })), _jsx(Alert, Object.assign({ variant: "primary", className: "col col-lg-10 mt-4" }, { children: _jsxs("div", Object.assign({ className: "row w-100 m-0 align-items-start" }, { children: [_jsx("div", Object.assign({ className: "flex-grow-1 col-sm p-0" }, { children: intl.formatMessage(messages.endOfCourseDescription) })), progressLink && (_jsx(Button, Object.assign({ variant: "primary", className: "flex-shrink-0 mt-3 mt-sm-0 mb-1 mb-sm-0 ml-sm-5", href: progressLink, onClick: () => logClick(org, courseId, administrator, 'view_grades') }, { children: intl.formatMessage(messages.viewGradesButton) })))] })) })), _jsx(DashboardFootnote, { variant: "nonpassing" }), _jsx(CatalogSuggestion, { variant: "nonpassing" })] }))] }));
};
export default CourseNonPassing;
//# sourceMappingURL=CourseNonPassing.js.map