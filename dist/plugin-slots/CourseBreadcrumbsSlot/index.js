import { jsx as _jsx } from "react/jsx-runtime";
import { PluginSlot } from '@openedx/frontend-plugin-framework';
export const CourseBreadcrumbsSlot = ({ courseId, sectionId, sequenceId, unitId, isStaff, }) => (_jsx(PluginSlot, { id: "org.openedx.frontend.learning.course_breadcrumbs.v1", idAliases: ['course_breadcrumbs_slot'], slotOptions: {
        mergeProps: true,
    }, pluginProps: {
        courseId,
        sectionId,
        sequenceId,
        unitId,
        isStaff,
    } }));
//# sourceMappingURL=index.js.map