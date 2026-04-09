import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from '@edx/frontend-platform/i18n';
import DateSummary from '../DateSummary';
import messages from '../messages';
import { useModel } from '../../../generic/model-store';
const CourseDates = () => {
    const intl = useIntl();
    const { courseId, } = useSelector(state => state.courseHome);
    const { userTimezone, } = useModel('courseHomeMeta', courseId);
    const { datesWidget: { courseDateBlocks, datesTabLink, }, } = useModel('outline', courseId);
    if (courseDateBlocks.length === 0) {
        return null;
    }
    return (_jsx("section", Object.assign({ className: "mb-4" }, { children: _jsxs("div", Object.assign({ id: "courseHome-dates" }, { children: [_jsx("h2", Object.assign({ className: "h4" }, { children: intl.formatMessage(messages.dates) })), _jsx("ol", Object.assign({ className: "list-unstyled" }, { children: courseDateBlocks.map((courseDateBlock) => (_jsx(DateSummary, { dateBlock: courseDateBlock, userTimezone: userTimezone }, courseDateBlock.title + courseDateBlock.date))) })), _jsx("a", Object.assign({ id: "dates-tab-link", className: "font-weight-bold ml-4 pl-1 small", href: datesTabLink }, { children: intl.formatMessage(messages.allDates) }))] })) })));
};
export default CourseDates;
//# sourceMappingURL=CourseDates.js.map