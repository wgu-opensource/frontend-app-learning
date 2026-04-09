import { jsx as _jsx } from "react/jsx-runtime";
import { useContext } from 'react';
import SidebarContext from './SidebarContext';
import { SIDEBAR_ORDER, SIDEBARS } from './sidebars';
const SidebarTriggers = () => {
    const { toggleSidebar } = useContext(SidebarContext);
    return (_jsx("div", Object.assign({ className: "d-flex ml-auto" }, { children: SIDEBAR_ORDER.map((sidebarId) => {
            const { Trigger } = SIDEBARS[sidebarId];
            return (_jsx(Trigger, { onClick: () => toggleSidebar(sidebarId) }, sidebarId));
        }) })));
};
export default SidebarTriggers;
//# sourceMappingURL=SidebarTriggers.js.map