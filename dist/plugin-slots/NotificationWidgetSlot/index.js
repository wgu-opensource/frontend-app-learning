import { jsx as _jsx } from "react/jsx-runtime";
import { PluginSlot } from '@openedx/frontend-plugin-framework';
export const NotificationWidgetSlot = ({ courseId, notificationCurrentState, setNotificationCurrentState, toggleSidebar, }) => (_jsx(PluginSlot, { id: "org.openedx.frontend.learning.notification_widget.v1", idAliases: ['notification_widget_slot'], pluginProps: {
        courseId,
        model: 'coursewareMeta',
        notificationCurrentState,
        setNotificationCurrentState,
        toggleSidebar,
    } }));
//# sourceMappingURL=index.js.map