import { jsx as _jsx } from "react/jsx-runtime";
import { PluginSlot } from '@openedx/frontend-plugin-framework';
export const NotificationTraySlot = ({ courseId, notificationCurrentState, setNotificationCurrentState, }) => (_jsx(PluginSlot, { id: "org.openedx.frontend.learning.notification_tray.v1", idAliases: ['notification_tray_slot'], pluginProps: {
        courseId,
        model: 'coursewareMeta',
        notificationCurrentState,
        setNotificationCurrentState,
    } }));
//# sourceMappingURL=index.js.map