import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { getLocale, isRtl, useIntl } from '@edx/frontend-platform/i18n';
import { useContextId } from '../../../data/hooks';
import { useModel } from '../../../generic/model-store';
import CompleteDonutSegment from './CompleteDonutSegment';
import IncompleteDonutSegment from './IncompleteDonutSegment';
import LockedDonutSegment from './LockedDonutSegment';
import messages from './messages';
const CompletionDonutChart = () => {
    const intl = useIntl();
    const courseId = useContextId();
    const { completionSummary: { completeCount, incompleteCount, lockedCount, }, } = useModel('progress', courseId);
    const numTotalUnits = completeCount + incompleteCount + lockedCount;
    const completePercentage = completeCount ? Number(((completeCount / numTotalUnits) * 100).toFixed(0)) : 0;
    const lockedPercentage = lockedCount ? Number(((lockedCount / numTotalUnits) * 100).toFixed(0)) : 0;
    const incompletePercentage = 100 - completePercentage - lockedPercentage;
    const isLocaleRtl = isRtl(getLocale());
    return (_jsxs(_Fragment, { children: [_jsxs("svg", Object.assign({ role: "img", width: "50%", height: "100%", viewBox: "0 0 42 42", className: "donut", style: { maxWidth: '178px' }, "aria-hidden": "true" }, { children: [_jsx("circle", { className: "donut-hole", fill: "#fff", cx: "21", cy: "21", r: "15.91549430918954" }), _jsxs("g", Object.assign({ className: "donut-chart-text" }, { children: [_jsxs("text", Object.assign({ x: "50%", y: "50%", className: "donut-chart-number" }, { children: [completePercentage, isLocaleRtl && '\u200f', "%"] })), _jsx("text", Object.assign({ x: "50%", y: "50%", className: "donut-chart-label" }, { children: intl.formatMessage(messages.donutLabel) }))] })), _jsx(IncompleteDonutSegment, { incompletePercentage: incompletePercentage }), _jsx(LockedDonutSegment, { lockedPercentage: lockedPercentage }), _jsx(CompleteDonutSegment, { completePercentage: completePercentage, lockedPercentage: lockedPercentage })] })), _jsxs("div", Object.assign({ className: "sr-only" }, { children: [intl.formatMessage(messages.percentComplete, { percent: completePercentage }), intl.formatMessage(messages.percentIncomplete, { percent: incompletePercentage }), lockedPercentage > 0 && (_jsx(_Fragment, { children: intl.formatMessage(messages.percentLocked, { percent: lockedPercentage }) }))] }))] }));
};
export default CompletionDonutChart;
//# sourceMappingURL=CompletionDonutChart.js.map