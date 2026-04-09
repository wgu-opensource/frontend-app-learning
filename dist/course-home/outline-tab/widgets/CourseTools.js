import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useSelector } from 'react-redux';
import { sendTrackingLogEvent } from '@edx/frontend-platform/analytics';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { useIntl } from '@edx/frontend-platform/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCertificate, faInfo, faCalendar, faStar, } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import messages from '../messages';
import { useModel } from '../../../generic/model-store';
import LaunchCourseHomeTourButton from '../../../product-tours/newUserCourseHomeTour/LaunchCourseHomeTourButton';
const CourseTools = () => {
    const intl = useIntl();
    const { courseId, } = useSelector(state => state.courseHome);
    const { org } = useModel('courseHomeMeta', courseId);
    const { courseTools, } = useModel('outline', courseId);
    if (courseTools.length === 0) {
        return null;
    }
    const eventProperties = {
        org_key: org,
        courserun_key: courseId,
    };
    const logClick = (analyticsId) => {
        const { administrator } = getAuthenticatedUser();
        sendTrackingLogEvent('edx.course.tool.accessed', Object.assign(Object.assign({}, eventProperties), { course_id: courseId, is_staff: administrator, tool_name: analyticsId }));
    };
    const renderIcon = (iconClasses) => {
        switch (iconClasses) {
            case 'edx.bookmarks':
                return faBookmark;
            case 'edx.tool.verified_upgrade':
                return faCertificate;
            case 'edx.tool.financial_assistance':
                return faInfo;
            case 'edx.calendar-sync':
                return faCalendar;
            case 'edx.updates':
                return faNewspaper;
            case 'edx.reviews':
                return faStar;
            default:
                return null;
        }
    };
    return (_jsxs("section", Object.assign({ className: "mb-4" }, { children: [_jsx("h2", Object.assign({ className: "h4" }, { children: intl.formatMessage(messages.tools) })), _jsxs("ul", Object.assign({ className: "list-unstyled" }, { children: [courseTools.map((courseTool) => (_jsx("li", Object.assign({ className: "small" }, { children: _jsxs("a", Object.assign({ href: courseTool.url, onClick: () => logClick(courseTool.analyticsId) }, { children: [_jsx(FontAwesomeIcon, { icon: renderIcon(courseTool.analyticsId), className: "mr-2", fixedWidth: true }), courseTool.title] })) }), courseTool.analyticsId))), _jsx("li", Object.assign({ className: "small", id: "courseHome-launchTourLink" }, { children: _jsx(LaunchCourseHomeTourButton, {}) }))] }))] })));
};
export default CourseTools;
//# sourceMappingURL=CourseTools.js.map