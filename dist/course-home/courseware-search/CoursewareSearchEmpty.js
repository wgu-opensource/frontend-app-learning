import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';
const CoursewareSearchEmpty = () => {
    const intl = useIntl();
    return (_jsx("div", Object.assign({ className: "courseware-search-results" }, { children: _jsx("p", Object.assign({ className: "courseware-search-results__empty", "data-testid": "no-results" }, { children: intl.formatMessage(messages.searchResultsNone) })) })));
};
export default CoursewareSearchEmpty;
//# sourceMappingURL=CoursewareSearchEmpty.js.map