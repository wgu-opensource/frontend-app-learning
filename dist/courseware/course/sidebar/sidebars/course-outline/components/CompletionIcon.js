import { jsx as _jsx } from "react/jsx-runtime";
import PropTypes from 'prop-types';
import { CheckCircle as CheckCircleIcon, LmsCompletionSolid as LmsCompletionSolidIcon, } from '@openedx/paragon/icons';
import { DashedCircleIcon } from '../icons';
const CompletionIcon = ({ completionStat: { completed = 0, total = 0 }, enabled }) => {
    const percentage = total !== 0 ? Math.min((completed / total) * 100, 100) : 0;
    const remainder = 100 - percentage;
    switch (true) {
        case !completed || !enabled:
            return _jsx(LmsCompletionSolidIcon, { className: "text-gray-300", "data-testid": "completion-solid-icon" });
        case completed === total:
            return _jsx(CheckCircleIcon, { className: "text-success", "data-testid": "check-circle-icon" });
        default:
            return _jsx(DashedCircleIcon, { percentage: percentage, remainder: remainder, "data-testid": "dashed-circle-icon" });
    }
};
CompletionIcon.propTypes = {
    completionStat: PropTypes.shape({
        completed: PropTypes.number,
        total: PropTypes.number,
    }).isRequired,
    enabled: PropTypes.bool.isRequired,
};
export default CompletionIcon;
//# sourceMappingURL=CompletionIcon.js.map