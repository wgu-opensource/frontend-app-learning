import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useContextId } from '../../../../data/hooks';
import { useModel } from '../../../../generic/model-store';
import GradeSummaryHeader from './GradeSummaryHeader';
import GradeSummaryTable from './GradeSummaryTable';
const GradeSummary = () => {
    const courseId = useContextId();
    const { assignmentTypeGradeSummary, } = useModel('progress', courseId);
    const [allOfSomeAssignmentTypeIsLocked, setAllOfSomeAssignmentTypeIsLocked] = useState(false);
    if (assignmentTypeGradeSummary.length === 0) {
        return null;
    }
    return (_jsxs("section", Object.assign({ className: "text-dark-700 mb-4" }, { children: [_jsx(GradeSummaryHeader, { allOfSomeAssignmentTypeIsLocked: allOfSomeAssignmentTypeIsLocked }), _jsx(GradeSummaryTable, { setAllOfSomeAssignmentTypeIsLocked: setAllOfSomeAssignmentTypeIsLocked })] })));
};
export default GradeSummary;
//# sourceMappingURL=GradeSummary.js.map