import { jsx as _jsx } from "react/jsx-runtime";
import { useContext } from 'react';
import classNames from 'classnames';
import { breakpoints, useWindowSize } from '@openedx/paragon';
import SidebarContext from './SidebarContext';
import { SIDEBAR_ORDER, SIDEBARS } from './sidebars';
const SidebarTriggers = () => {
    const { toggleSidebar, currentSidebar, } = useContext(SidebarContext);
    const isMobileView = useWindowSize().width < breakpoints.small.minWidth;
    return (_jsx("div", Object.assign({ className: "d-flex ml-auto" }, { children: SIDEBAR_ORDER.map((sidebarId) => {
            const { Trigger } = SIDEBARS[sidebarId];
            const isActive = sidebarId === currentSidebar;
            return (_jsx("div", Object.assign({ className: classNames({ 'ml-1': !isMobileView, 'border-primary-700 sidebar-active': isActive }), style: { borderBottom: '2px solid', borderColor: isActive ? 'inherit' : 'transparent' } }, { children: _jsx(Trigger, { onClick: () => toggleSidebar(sidebarId) }, sidebarId) }), sidebarId));
        }) })));
};
SidebarTriggers.propTypes = {};
export default SidebarTriggers;
//# sourceMappingURL=SidebarTriggers.js.map