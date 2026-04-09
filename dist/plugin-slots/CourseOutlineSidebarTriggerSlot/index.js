import { jsx as _jsx } from "react/jsx-runtime";
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import CourseOutlineTrigger from '../../courseware/course/sidebar/sidebars/course-outline/CourseOutlineTrigger';
export const CourseOutlineSidebarTriggerSlot = ({ sectionId, sequenceId, unitId, isStaff, }) => (_jsx(PluginSlot, Object.assign({ id: "org.openedx.frontend.learning.course_outline_sidebar_trigger.v1", idAliases: ['course_outline_sidebar_trigger_slot'], slotOptions: {
        mergeProps: true,
    }, pluginProps: {
        sectionId,
        sequenceId,
        unitId,
        isStaff,
    } }, { children: _jsx(CourseOutlineTrigger, { isMobileView: false }) })));
//# sourceMappingURL=index.js.map