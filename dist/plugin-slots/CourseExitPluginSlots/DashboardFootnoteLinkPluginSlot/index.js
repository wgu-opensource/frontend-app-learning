import { jsx as _jsx } from "react/jsx-runtime";
import { Hyperlink } from '@openedx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import messages from '../../../courseware/course/course-exit/messages';
import { logClick } from '../../../courseware/course/course-exit/utils';
import { useModel } from '../../../generic/model-store';
import { useContextId } from '../../../data/hooks';
const DashboardFootnoteLink = ({ variant, destination }) => {
    const intl = useIntl();
    const courseId = useContextId();
    const { org } = useModel('courseHomeMeta', courseId);
    const { administrator } = getAuthenticatedUser();
    return (_jsx(Hyperlink, Object.assign({ style: { textDecoration: 'underline' }, destination: destination, className: "text-reset", onClick: () => logClick(org, courseId, administrator, 'dashboard_footnote', { variant }) }, { children: intl.formatMessage(messages.dashboardLink) })));
};
export const DashboardFootnoteLinkPluginSlot = ({ variant }) => {
    const destination = `${getConfig().LMS_BASE_URL}/dashboard`;
    return (_jsx(PluginSlot, Object.assign({ id: "org.openedx.frontend.learning.course_exit_dashboard_footnote_link.v1", slotOptions: {
            mergeProps: true,
        } }, { children: _jsx(DashboardFootnoteLink, { variant: variant, destination: destination }) })));
};
//# sourceMappingURL=index.js.map