import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getLocale, isRtl, useIntl } from '@edx/frontend-platform/i18n';
import { DataTable, Icon, OverlayTrigger, Stack, Tooltip, } from '@openedx/paragon';
import { InfoOutline } from '@openedx/paragon/icons';
import { useContextId } from '../../../../data/hooks';
import { useModel } from '../../../../generic/model-store';
import messages from '../messages';
const GradeSummaryTableFooter = () => {
    const intl = useIntl();
    const courseId = useContextId();
    const { courseGrade: { isPassing, percent, }, finalGrades, } = useModel('progress', courseId);
    const getGradePercent = (grade) => {
        const percentage = grade * 100;
        return Number.isInteger(percentage) ? percentage.toFixed(0) : percentage.toFixed(2);
    };
    const rawGrade = getGradePercent(finalGrades);
    const bgColor = isPassing ? 'bg-success-100' : 'bg-warning-100';
    const totalGrade = (percent * 100).toFixed(0);
    const isLocaleRtl = isRtl(getLocale());
    return (_jsx(DataTable.TableFooter, Object.assign({ className: `border-top border-primary ${bgColor}` }, { children: _jsxs("div", Object.assign({ className: "row w-100 m-0" }, { children: [_jsx("div", Object.assign({ id: "weighted-grade-summary", className: "col-8 p-0 small" }, { children: _jsxs(Stack, Object.assign({ gap: 2, direction: "horizontal" }, { children: [intl.formatMessage(messages.weightedGradeSummary), _jsx(OverlayTrigger, Object.assign({ trigger: "hover", placement: "bottom", overlay: (_jsx(Tooltip, { children: intl.formatMessage(messages.weightedGradeSummaryTooltip, { roundedGrade: totalGrade, rawGrade }) })) }, { children: _jsx(Icon, { src: InfoOutline, size: "sm", alt: intl.formatMessage(messages.gradeSummaryTooltipAlt) }) }))] })) })), _jsxs("div", Object.assign({ "data-testid": "gradeSummaryFooterTotalWeightedGrade", "aria-labelledby": "weighted-grade-summary", className: "col-4 p-0 text-right font-weight-bold small" }, { children: [totalGrade, isLocaleRtl && '\u200f', "%"] }))] })) })));
};
export default GradeSummaryTableFooter;
//# sourceMappingURL=GradeSummaryTableFooter.js.map