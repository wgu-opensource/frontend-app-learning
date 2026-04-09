import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from '@openedx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from '../../../courseware/course/course-exit/messages';
const ViewCoursesLink = ({ href }) => {
    const intl = useIntl();
    return (_jsx("div", Object.assign({ className: "row w-100 mt-2 mb-4 justify-content-end" }, { children: _jsx(Button, Object.assign({ variant: "outline-primary", href: href }, { children: intl.formatMessage(messages.viewCoursesButton) })) })));
};
export const CourseExitViewCoursesPluginSlot = () => {
    const href = `${getConfig().LMS_BASE_URL}/dashboard`;
    return (_jsx(PluginSlot, Object.assign({ id: "org.openedx.frontend.learning.course_exit_view_courses.v1", slotOptions: {
            mergeProps: true,
        } }, { children: _jsx(ViewCoursesLink, { href: href }) })));
};
//# sourceMappingURL=index.js.map