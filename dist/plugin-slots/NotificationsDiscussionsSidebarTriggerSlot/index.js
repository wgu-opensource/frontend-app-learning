import { jsx as _jsx } from "react/jsx-runtime";
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { useModel } from '@src/generic/model-store';
import SidebarTriggers from '../../courseware/course/sidebar/SidebarTriggers';
import NewSidebarTriggers from '../../courseware/course/new-sidebar/SidebarTriggers';
export const NotificationsDiscussionsSidebarTriggerSlot = ({ courseId }) => {
    const { isNewDiscussionSidebarViewEnabled, } = useModel('courseHomeMeta', courseId);
    return (_jsx(PluginSlot, Object.assign({ id: "org.openedx.frontend.learning.notifications_discussions_sidebar_trigger.v1", idAliases: ['notifications_discussions_sidebar_trigger_slot'], slotOptions: {
            mergeProps: true,
        } }, { children: isNewDiscussionSidebarViewEnabled ? _jsx(NewSidebarTriggers, {}) : _jsx(SidebarTriggers, {}) })));
};
//# sourceMappingURL=index.js.map