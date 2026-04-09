import React from 'react';
import { UpgradeNotificationState } from '../../courseware/course/new-sidebar/SidebarContext';
export declare const NotificationWidgetSlot: ({ courseId, notificationCurrentState, setNotificationCurrentState, toggleSidebar, }: NotificationWidgetSlotProps) => import("react/jsx-runtime").JSX.Element;
interface NotificationWidgetSlotProps {
    courseId: string;
    notificationCurrentState: UpgradeNotificationState;
    setNotificationCurrentState: React.Dispatch<UpgradeNotificationState>;
    toggleSidebar: () => void;
}
export {};
