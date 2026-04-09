import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import PropTypes from 'prop-types';
import { getLocale, isRtl, useIntl } from '@edx/frontend-platform/i18n';
import { OverlayTrigger, Popover } from '@openedx/paragon';
import messages from '../messages';
const PassingGradeTooltip = ({ passingGrade, tooltipClassName }) => {
    const intl = useIntl();
    const isLocaleRtl = isRtl(getLocale());
    let passingGradeDirection = passingGrade < 50 ? '' : '-';
    if (isLocaleRtl) {
        passingGradeDirection = passingGrade < 50 ? '-' : '';
    }
    return (_jsxs(_Fragment, { children: [_jsx(OverlayTrigger, Object.assign({ show: true, placement: "bottom", overlay: (_jsx(Popover, Object.assign({ id: "minimum-grade-tooltip", className: `bg-primary-500 ${tooltipClassName}`, "aria-hidden": "true" }, { children: _jsxs(Popover.Content, Object.assign({ className: "text-white" }, { children: [passingGrade, isLocaleRtl && '\u200f', "%"] })) }))) }, { children: _jsxs("g", { children: [_jsx("circle", { cx: `${isLocaleRtl ? 100 - passingGrade : passingGrade}%`, cy: "50%", r: "8.5", fill: "transparent" }), _jsx("circle", { className: "grade-bar--passing", cx: `${isLocaleRtl ? 100 - passingGrade : passingGrade}%`, cy: "50%", r: "4.5" })] }) })), _jsx("text", Object.assign({ className: "x-small", textAnchor: passingGrade < 50 ? 'start' : 'end', x: `${isLocaleRtl ? 100 - passingGrade : passingGrade}%`, y: "90px", style: { transform: `translateX(${passingGradeDirection}3.4em)` } }, { children: intl.formatMessage(messages.passingGradeLabel) }))] }));
};
PassingGradeTooltip.defaultProps = {
    tooltipClassName: '',
};
PassingGradeTooltip.propTypes = {
    passingGrade: PropTypes.number.isRequired,
    tooltipClassName: PropTypes.string,
};
export default PassingGradeTooltip;
//# sourceMappingURL=PassingGradeTooltip.js.map