import { jsx as _jsx } from "react/jsx-runtime";
import { useContext } from 'react';
import SidebarContext from './SidebarContext';
import { SIDEBARS } from './sidebars';
const Sidebar = () => {
    const { currentSidebar } = useContext(SidebarContext);
    if (!currentSidebar || !SIDEBARS[currentSidebar]) {
        return null;
    }
    const SidebarToRender = SIDEBARS[currentSidebar].Sidebar;
    return (_jsx(SidebarToRender, {}));
};
export default Sidebar;
//# sourceMappingURL=Sidebar.js.map