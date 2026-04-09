import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { OverlayTrigger, Popover } from '@openedx/paragon';
import messages from './messages';
const IncompleteDonutSegment = ({ incompletePercentage }) => {
    const intl = useIntl();
    const [showIncompletePopover, setShowIncompletePopover] = useState(false);
    if (!incompletePercentage) {
        return null;
    }
    const incompleteSegmentOffset = (3.6 * incompletePercentage) / 16;
    const incompleteTooltipDegree = incompletePercentage < 100 ? incompleteSegmentOffset : 0;
    return (_jsxs("g", Object.assign({ className: "donut-segment-group", onBlur: () => setShowIncompletePopover(false), onFocus: () => setShowIncompletePopover(true), tabIndex: "-1" }, { children: [_jsx("circle", { className: "donut-ring incomplete-stroke", cx: "21", cy: "21", r: "15.91549430918954", strokeDasharray: `${incompletePercentage} ${100 - incompletePercentage}`, strokeDashoffset: "25" }), _jsx(OverlayTrigger, Object.assign({ show: showIncompletePopover, placement: "top", overlay: (_jsx(Popover, Object.assign({ id: "incomplete-tooltip-popover", "aria-hidden": "true" }, { children: _jsx(Popover.Content, { children: intl.formatMessage(messages.incompleteContentTooltip) }) }))) }, { children: _jsx("rect", { x: "19", y: "3", style: { transform: `rotate(${incompleteTooltipDegree}deg)` } }) }))] })));
};
IncompleteDonutSegment.propTypes = {
    incompletePercentage: PropTypes.number.isRequired,
};
export default IncompleteDonutSegment;
//# sourceMappingURL=IncompleteDonutSegment.js.map