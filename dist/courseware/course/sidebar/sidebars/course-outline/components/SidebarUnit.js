import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from '../messages';
import UnitIcon, { UNIT_ICON_TYPES } from './UnitIcon';
import UnitLinkWrapper from './UnitLinkWrapper';
const SidebarUnit = ({ id, courseId, sequenceId, isFirst, unit, isActive, isLocked, activeUnitId, isCompletionTrackingEnabled, }) => {
    const intl = useIntl();
    const { complete, title, icon = UNIT_ICON_TYPES.other, } = unit;
    const iconType = isLocked ? UNIT_ICON_TYPES.lock : icon;
    const completeAndEnabled = complete && isCompletionTrackingEnabled;
    return (_jsx("li", Object.assign({ className: classNames({ 'bg-info-100': isActive, 'border-top border-light': !isFirst }) }, { children: _jsxs(UnitLinkWrapper, Object.assign({}, {
            sequenceId,
            activeUnitId,
            id,
            courseId,
        }, { children: [_jsx("div", Object.assign({ className: "col-auto p-0" }, { children: _jsx(UnitIcon, { type: iconType, isCompleted: completeAndEnabled }) })), _jsxs("div", Object.assign({ className: "col-10 p-0 ml-3 text-break" }, { children: [_jsx("span", Object.assign({ className: "align-middle" }, { children: title })), isCompletionTrackingEnabled && (_jsxs("span", Object.assign({ className: "sr-only" }, { children: [", ", intl.formatMessage(complete ? messages.completedUnit : messages.incompleteUnit)] })))] }))] })) })));
};
SidebarUnit.propTypes = {
    id: PropTypes.string.isRequired,
    isFirst: PropTypes.bool.isRequired,
    unit: PropTypes.shape({
        complete: PropTypes.bool,
        icon: PropTypes.string,
        id: PropTypes.string,
        title: PropTypes.string,
        type: PropTypes.string,
    }).isRequired,
    isActive: PropTypes.bool.isRequired,
    isLocked: PropTypes.bool.isRequired,
    courseId: PropTypes.string.isRequired,
    sequenceId: PropTypes.string.isRequired,
    activeUnitId: PropTypes.string.isRequired,
    isCompletionTrackingEnabled: PropTypes.bool.isRequired,
};
export default SidebarUnit;
//# sourceMappingURL=SidebarUnit.js.map