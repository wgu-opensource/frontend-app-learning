import React from 'react';
import { UpgradeNotificationState } from '../../courseware/course/new-sidebar/SidebarContext';
export declare const NotificationTraySlot: ({ courseId, notificationCurrentState, setNotificationCurrentState, }: NotificationTraySlotProps) => import("react/jsx-runtime").JSX.Element;
interface NotificationTraySlotProps {
    courseId: string;
    notificationCurrentState: UpgradeNotificationState;
    setNotificationCurrentState: React.Dispatch<UpgradeNotificationState>;
}
export {};
