import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import PropTypes from 'prop-types';
import { getLocale, isRtl, useIntl } from '@edx/frontend-platform/i18n';
import { OverlayTrigger, Popover } from '@openedx/paragon';
import { useContextId } from '../../../../data/hooks';
import { useModel } from '../../../../generic/model-store';
import messages from '../messages';
const CurrentGradeTooltip = ({ tooltipClassName }) => {
    const intl = useIntl();
    const courseId = useContextId();
    const { assignmentTypeGradeSummary, courseGrade: { isPassing, percent, }, } = useModel('progress', courseId);
    const currentGrade = Number((percent * 100).toFixed(0));
    let currentGradeDirection = currentGrade < 50 ? '' : '-';
    const isLocaleRtl = isRtl(getLocale());
    const hasHiddenGrades = assignmentTypeGradeSummary.some((assignmentType) => assignmentType.hasHiddenContribution !== 'none');
    if (isLocaleRtl) {
        currentGradeDirection = currentGrade < 50 ? '-' : '';
    }
    return (_jsxs(_Fragment, { children: [_jsx(OverlayTrigger, Object.assign({ show: true, placement: "top", overlay: (_jsx(Popover, Object.assign({ id: `${isPassing ? 'passing' : 'non-passing'}-grade-tooltip`, "aria-hidden": "true", className: tooltipClassName }, { children: _jsxs(Popover.Content, Object.assign({ "data-testid": "currentGradeTooltipContent", className: isPassing ? 'text-white' : 'text-dark-700' }, { children: [currentGrade.toFixed(0), isLocaleRtl ? '\u200f' : '', "%"] })) }))) }, { children: _jsxs("g", { children: [_jsx("circle", { cx: `${Math.min(...[isLocaleRtl ? 100 - currentGrade : currentGrade, 100])}%`, cy: "50%", r: "8.5", fill: "transparent" }), _jsx("rect", { className: "grade-bar__divider", x: `${Math.min(...[isLocaleRtl ? 100 - currentGrade : currentGrade, 100])}%`, style: { transform: 'translateY(2.61em)' } })] }) })), _jsx("text", Object.assign({ className: "x-small", textAnchor: currentGrade < 50 ? 'start' : 'end', x: `${Math.min(...[isLocaleRtl ? 100 - currentGrade : currentGrade, 100])}%`, y: "20px", style: { transform: `translateX(${currentGradeDirection}3.4em)` } }, { children: intl.formatMessage(messages.currentGradeLabel) })), _jsx("text", Object.assign({ className: "x-small", textAnchor: currentGrade < 50 ? 'start' : 'end', x: `${Math.min(...[isLocaleRtl ? 100 - currentGrade : currentGrade, 100])}%`, y: "35px", style: { transform: `translateX(${currentGradeDirection}3.4em)` } }, { children: hasHiddenGrades ? ` + ${intl.formatMessage(messages.hiddenScoreLabel)}` : '' }))] }));
};
CurrentGradeTooltip.defaultProps = {
    tooltipClassName: '',
};
CurrentGradeTooltip.propTypes = {
    tooltipClassName: PropTypes.string,
};
export default CurrentGradeTooltip;
//# sourceMappingURL=CurrentGradeTooltip.js.map