import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import SidebarBase from '../../common/SidebarBase';
import messages from '../../messages';
import SidebarContext from '../../SidebarContext';
import DiscussionsSidebar from './discussions/DiscussionsWidget';
import NotificationTray from './notifications/NotificationsWidget';
import { ID } from './DiscussionsNotificationsTrigger';
const DiscussionsNotificationsSidebar = () => {
    const intl = useIntl();
    const { hideNotificationbar } = useContext(SidebarContext);
    return (_jsxs(SidebarBase, Object.assign({ ariaLabel: intl.formatMessage(messages.discussionNotificationTray), sidebarId: ID, className: "d-flex flex-column flex-fill overflow-auto", showTitleBar: false, showBorder: false }, { children: [_jsx(NotificationTray, {}), !hideNotificationbar && _jsx("div", { className: "my-1.5" }), _jsx(DiscussionsSidebar, {})] })));
};
export default DiscussionsNotificationsSidebar;
//# sourceMappingURL=DiscussionsNotificationsSidebar.js.map