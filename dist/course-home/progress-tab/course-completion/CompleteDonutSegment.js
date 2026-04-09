import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { OverlayTrigger, Popover } from '@openedx/paragon';
import messages from './messages';
const CompleteDonutSegment = ({ completePercentage, lockedPercentage }) => {
    const intl = useIntl();
    const [showCompletePopover, setShowCompletePopover] = useState(false);
    if (!completePercentage) {
        return null;
    }
    const completeSegmentOffset = (3.6 * completePercentage) / 8;
    let completeTooltipDegree = completePercentage < 100 ? -completeSegmentOffset : 0;
    const lockedSegmentOffset = lockedPercentage - 75;
    if (lockedPercentage > 0) {
        completeTooltipDegree = (lockedSegmentOffset + completePercentage) * -3.6 + 90 + completeSegmentOffset;
    }
    return (_jsxs("g", Object.assign({ className: "donut-segment-group", onBlur: () => setShowCompletePopover(false), onFocus: () => setShowCompletePopover(true), tabIndex: "-1" }, { children: [_jsx(OverlayTrigger, Object.assign({ show: showCompletePopover, placement: "top", overlay: (_jsx(Popover, Object.assign({ id: "complete-content-tooltip-popover", "aria-hidden": "true" }, { children: _jsx(Popover.Content, { children: intl.formatMessage(messages.completeContentTooltip) }) }))) }, { children: _jsx("rect", { x: "19", y: "3", style: { transform: `rotate(${completeTooltipDegree}deg)` } }) })), _jsx("circle", { className: "donut-segment complete-stroke", cx: "21", cy: "21", r: "15.91549430918954", strokeDasharray: `${completePercentage} ${100 - completePercentage}`, strokeDashoffset: lockedSegmentOffset + completePercentage }), lockedPercentage > 0 && lockedPercentage < 100 && (_jsx("circle", { cx: "21", cy: "21", r: "15.91549430918954", className: "donut-segment divider-stroke", strokeDasharray: "0.3 99.7", strokeDashoffset: 0.15 + lockedSegmentOffset })), completePercentage < 100 && lockedPercentage > 0 && lockedPercentage < 100
                && lockedPercentage + completePercentage === 100 && (_jsx("circle", { cx: "21", cy: "21", r: "15.91549430918954", className: "donut-segment divider-stroke", strokeDasharray: "0.3 99.7", strokeDashoffset: "25.15" }))] })));
};
CompleteDonutSegment.propTypes = {
    completePercentage: PropTypes.number.isRequired,
    lockedPercentage: PropTypes.number.isRequired,
};
export default CompleteDonutSegment;
//# sourceMappingURL=CompleteDonutSegment.js.map