import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Hyperlink } from '@openedx/paragon';
import { useContextId } from '../../../data/hooks';
import messages from './messages';
import { useModel } from '../../../generic/model-store';
const RelatedLinks = () => {
    const intl = useIntl();
    const courseId = useContextId();
    const { org, tabs, } = useModel('courseHomeMeta', courseId);
    const { administrator } = getAuthenticatedUser();
    const logLinkClicked = (linkName) => {
        sendTrackEvent('edx.ui.lms.course_progress.related_links.clicked', {
            org_key: org,
            courserun_key: courseId,
            is_staff: administrator,
            link_clicked: linkName,
        });
    };
    const overviewTab = tabs.find(tab => tab.slug === 'outline');
    const overviewTabUrl = overviewTab && overviewTab.url;
    const datesTab = tabs.find(tab => tab.slug === 'dates');
    const datesTabUrl = datesTab && datesTab.url;
    return (_jsxs("section", Object.assign({ className: "mb-4 x-small" }, { children: [_jsx("h3", Object.assign({ className: "h4" }, { children: intl.formatMessage(messages.relatedLinks) })), _jsxs("ul", Object.assign({ className: "pl-4" }, { children: [datesTabUrl && (_jsxs("li", { children: [_jsx(Hyperlink, Object.assign({ destination: datesTabUrl, onClick: () => logLinkClicked('dates') }, { children: intl.formatMessage(messages.datesCardLink) })), _jsx("p", { children: intl.formatMessage(messages.datesCardDescription) })] })), overviewTabUrl && (_jsxs("li", { children: [_jsx(Hyperlink, Object.assign({ destination: overviewTabUrl, onClick: () => logLinkClicked('course_outline') }, { children: intl.formatMessage(messages.outlineCardLink) })), _jsx("p", { children: intl.formatMessage(messages.outlineCardDescription) })] }))] }))] })));
};
export default RelatedLinks;
//# sourceMappingURL=RelatedLinks.js.map