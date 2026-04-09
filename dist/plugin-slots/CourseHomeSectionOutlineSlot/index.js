import { jsx as _jsx } from "react/jsx-runtime";
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import Section from '@src/course-home/outline-tab/section-outline/Section';
const CourseHomeSectionOutlineSlot = ({ expandAll, sections, sectionIds, }) => (_jsx(PluginSlot, Object.assign({ id: "org.openedx.frontend.learning.course_home_section_outline.v1", idAliases: ['course_home_section_outline_slot'], pluginProps: { expandAll, sectionIds, sections } }, { children: _jsx("ol", Object.assign({ id: "courseHome-outline", className: "list-unstyled" }, { children: sectionIds.map((sectionId) => (_jsx(Section, { defaultOpen: sections[sectionId].resumeBlock, expand: expandAll, section: sections[sectionId] }, sectionId))) })) })));
export default CourseHomeSectionOutlineSlot;
//# sourceMappingURL=index.js.map