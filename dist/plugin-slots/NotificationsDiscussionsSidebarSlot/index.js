import { jsx as _jsx } from "react/jsx-runtime";
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { useModel } from '@src/generic/model-store';
import Sidebar from '../../courseware/course/sidebar/Sidebar';
import NewSidebar from '../../courseware/course/new-sidebar/Sidebar';
export const NotificationsDiscussionsSidebarSlot = ({ courseId }) => {
    const { isNewDiscussionSidebarViewEnabled, } = useModel('courseHomeMeta', courseId);
    return (_jsx(PluginSlot, Object.assign({ id: "org.openedx.frontend.learning.notifications_discussions_sidebar.v1", idAliases: ['notifications_discussions_sidebar_slot'], slotOptions: {
            mergeProps: true,
        } }, { children: isNewDiscussionSidebarViewEnabled ? _jsx(NewSidebar, {}) : _jsx(Sidebar, {}) })));
};
//# sourceMappingURL=index.js.map