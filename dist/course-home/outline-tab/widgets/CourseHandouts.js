import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from '@edx/frontend-platform/i18n';
import LmsHtmlFragment from '../LmsHtmlFragment';
import messages from '../messages';
import { useModel } from '../../../generic/model-store';
const CourseHandouts = () => {
    const intl = useIntl();
    const { courseId, } = useSelector(state => state.courseHome);
    const { handoutsHtml, } = useModel('outline', courseId);
    if (!handoutsHtml) {
        return null;
    }
    return (_jsxs("section", Object.assign({ className: "mb-4" }, { children: [_jsx("h2", Object.assign({ className: "h4" }, { children: intl.formatMessage(messages.handouts) })), _jsx(LmsHtmlFragment, { className: "small", html: handoutsHtml, title: intl.formatMessage(messages.handouts) })] })));
};
export default CourseHandouts;
//# sourceMappingURL=CourseHandouts.js.map