import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { InfoOutline } from '@openedx/paragon/icons';
import { Icon, IconButton, OverlayTrigger, Popover, } from '@openedx/paragon';
import { useContextId } from '../../../../data/hooks';
import { useModel } from '../../../../generic/model-store';
import messages from '../messages';
const GradeRangeTooltip = ({ iconButtonClassName, passingGrade }) => {
    const intl = useIntl();
    const courseId = useContextId();
    const { gradesFeatureIsFullyLocked, gradingPolicy: { gradeRange, }, } = useModel('progress', courseId);
    const [showTooltip, setShowTooltip] = useState(false);
    const orderedGradeRange = Object.entries(gradeRange).sort((a, b) => (gradeRange[b[0]] - gradeRange[a[0]]));
    return (_jsx(OverlayTrigger, Object.assign({ placement: "top", trigger: "click", show: showTooltip, overlay: (_jsx(Popover, { children: _jsxs(Popover.Content, Object.assign({ className: "px-3" }, { children: [intl.formatMessage(messages.courseGradeRangeTooltip), _jsxs("ul", Object.assign({ className: "list-unstyled m-0" }, { children: [orderedGradeRange.map((range, index) => {
                                if (index === 0) {
                                    return (_jsxs("li", { children: [range[0], ": ", (range[1] * 100).toFixed(0), "%-100%"] }, range[0]));
                                }
                                const previousGrade = orderedGradeRange[index - 1];
                                return (_jsxs("li", { children: [range[0], ": ", (range[1] * 100).toFixed(0), "%-", (previousGrade[1] * 100).toFixed(0), "%"] }, range[0]));
                            }), _jsxs("li", { children: ["F: ", '<', passingGrade, "%"] })] }))] })) })) }, { children: _jsx(IconButton, { onClick: () => setShowTooltip(!showTooltip), onBlur: () => setShowTooltip(false), alt: intl.formatMessage(messages.gradeRangeTooltipAlt), className: `mb-0 mt-n1 ${iconButtonClassName}`, src: InfoOutline, iconAs: Icon, size: "inline", disabled: gradesFeatureIsFullyLocked }) })));
};
GradeRangeTooltip.defaultProps = {
    iconButtonClassName: '',
};
GradeRangeTooltip.propTypes = {
    iconButtonClassName: PropTypes.string,
    passingGrade: PropTypes.number.isRequired,
};
export default GradeRangeTooltip;
//# sourceMappingURL=GradeRangeTooltip.js.map