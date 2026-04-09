import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useModel } from '@src/generic/model-store';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import React from 'react';
import DetailedGrades from '../../course-home/progress-tab/grades/detailed-grades/DetailedGrades';
import GradeSummary from '../../course-home/progress-tab/grades/grade-summary/GradeSummary';
import { useContextId } from '../../data/hooks';
const ProgressTabGradeBreakdownSlot = () => {
    const courseId = useContextId();
    const { gradesFeatureIsFullyLocked } = useModel('progress', courseId);
    const applyLockedOverlay = gradesFeatureIsFullyLocked ? 'locked-overlay' : '';
    return (_jsx(PluginSlot, Object.assign({ id: "org.openedx.frontend.learning.progress_tab_grade_breakdown.v1", idAliases: ['progress_tab_grade_breakdown_slot'] }, { children: _jsxs("div", Object.assign({ className: `grades my-4 p-4 rounded raised-card ${applyLockedOverlay}`, "aria-hidden": gradesFeatureIsFullyLocked }, { children: [_jsx(GradeSummary, {}), _jsx(DetailedGrades, {})] })) })));
};
ProgressTabGradeBreakdownSlot.propTypes = {};
export default ProgressTabGradeBreakdownSlot;
//# sourceMappingURL=index.js.map