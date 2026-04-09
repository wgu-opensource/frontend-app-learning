import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import UnitButton from './UnitButton';
import SequenceNavigationDropdown from './SequenceNavigationDropdown';
import useIndexOfLastVisibleChild from '../../../../generic/tabs/useIndexOfLastVisibleChild';
import { useIsOnXLDesktop, useIsOnMediumDesktop, useIsOnLargeDesktop, useIsSidebarOpen, } from './hooks';
const SequenceNavigationTabs = ({ unitIds, unitId, showCompletion, onNavigate, }) => {
    const isSidebarOpen = useIsSidebarOpen(unitId);
    const [indexOfLastVisibleChild, containerRef, invisibleStyle,] = useIndexOfLastVisibleChild(isSidebarOpen);
    const isOnXLDesktop = useIsOnXLDesktop();
    const isOnLargeDesktop = useIsOnLargeDesktop();
    const isOnMediumDesktop = useIsOnMediumDesktop();
    const shouldDisplayDropdown = indexOfLastVisibleChild === -1 || indexOfLastVisibleChild < unitIds.length - 1;
    return (_jsxs("div", Object.assign({ style: { flexBasis: '100%', minWidth: 0 }, className: classNames({
            'navigation-tab-width-xl': isOnXLDesktop && isSidebarOpen,
            'navigation-tab-width-large': isOnLargeDesktop && isSidebarOpen,
            'navigation-tab-width-medium': isOnMediumDesktop && isSidebarOpen,
        }) }, { children: [_jsx("div", Object.assign({ className: "sequence-navigation-tabs-container" }, { children: _jsx("div", Object.assign({ className: "sequence-navigation-tabs d-flex flex-grow-1", style: shouldDisplayDropdown ? invisibleStyle : null, ref: containerRef }, { children: unitIds.map(buttonUnitId => (_jsx(UnitButton, { unitId: buttonUnitId, isActive: unitId === buttonUnitId, showCompletion: showCompletion, onClick: onNavigate }, buttonUnitId))) })) })), shouldDisplayDropdown && (_jsx(SequenceNavigationDropdown, { unitId: unitId, onNavigate: onNavigate, showCompletion: showCompletion, unitIds: unitIds }))] })));
};
SequenceNavigationTabs.propTypes = {
    unitId: PropTypes.string.isRequired,
    onNavigate: PropTypes.func.isRequired,
    showCompletion: PropTypes.bool.isRequired,
    unitIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default SequenceNavigationTabs;
//# sourceMappingURL=SequenceNavigationTabs.js.map