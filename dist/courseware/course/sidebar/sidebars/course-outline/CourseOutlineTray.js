import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import classNames from 'classnames';
import { Button, useToggle, IconButton } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { MenuOpen as MenuOpenIcon, ChevronLeft as ChevronLeftIcon, } from '@openedx/paragon/icons';
import { LOADING } from '@src/constants';
import PageLoading from '@src/generic/PageLoading';
import SidebarSection from './components/SidebarSection';
import SidebarSequence from './components/SidebarSequence';
import { ID } from './constants';
import { useCourseOutlineSidebar } from './hooks';
import messages from './messages';
const CourseOutlineTray = () => {
    var _a, _b;
    const intl = useIntl();
    const [selectedSection, setSelectedSection] = useState(null);
    const [isDisplaySequenceLevel, setDisplaySequenceLevel, setDisplaySectionLevel] = useToggle(true);
    const { courseId, unitId, currentSidebar, handleToggleCollapse, isActiveEntranceExam, shouldDisplayFullScreen, courseOutlineStatus, activeSequenceId, sections, sequences, } = useCourseOutlineSidebar();
    const resolvedSectionId = selectedSection
        || Object.keys(sections).find((sectionId) => sections[sectionId].sequenceIds.includes(activeSequenceId));
    const sectionsIds = Object.keys(sections);
    const sequenceIds = ((_a = sections[resolvedSectionId]) === null || _a === void 0 ? void 0 : _a.sequenceIds) || [];
    const backButtonTitle = (_b = sections[resolvedSectionId]) === null || _b === void 0 ? void 0 : _b.title;
    const handleBackToSectionLevel = () => {
        setDisplaySectionLevel();
        setSelectedSection(null);
    };
    const handleSelectSection = (id) => {
        setDisplaySequenceLevel();
        setSelectedSection(id);
    };
    const sidebarHeading = (_jsxs("div", Object.assign({ className: "outline-sidebar-heading-wrapper sticky d-flex justify-content-between align-self-start align-items-center bg-light-200 p-2.5 pl-4" }, { children: [isDisplaySequenceLevel && backButtonTitle ? (_jsx(Button, Object.assign({ variant: "link", iconBefore: ChevronLeftIcon, className: "outline-sidebar-heading p-0 mb-0 text-left text-dark-500", onClick: handleBackToSectionLevel }, { children: backButtonTitle }))) : (_jsx("span", Object.assign({ className: "outline-sidebar-heading mb-0 h4 text-dark-500" }, { children: intl.formatMessage(messages.courseOutlineTitle) }))), _jsx(IconButton, { alt: intl.formatMessage(messages.toggleCourseOutlineTrigger), className: "outline-sidebar-toggle-btn flex-shrink-0 text-dark bg-light-200", iconAs: MenuOpenIcon, onClick: handleToggleCollapse })] })));
    if (isActiveEntranceExam || currentSidebar !== ID) {
        return null;
    }
    if (courseOutlineStatus === LOADING) {
        return (_jsx("div", Object.assign({ className: classNames('outline-sidebar-wrapper', {
                'flex-shrink-0 mr-4 h-auto': !shouldDisplayFullScreen,
                'bg-white m-0 fixed-top w-100 vh-100': shouldDisplayFullScreen,
            }) }, { children: _jsxs("section", Object.assign({ className: "outline-sidebar w-100" }, { children: [sidebarHeading, _jsx(PageLoading, { srMessage: intl.formatMessage(messages.loading) })] })) })));
    }
    return (_jsx("div", Object.assign({ className: classNames('outline-sidebar-wrapper', {
            'flex-shrink-0 mr-4 h-auto': !shouldDisplayFullScreen,
            'bg-white m-0 fixed-top w-100 vh-100': shouldDisplayFullScreen,
        }) }, { children: _jsxs("section", Object.assign({ className: "outline-sidebar w-100" }, { children: [sidebarHeading, _jsx("ol", Object.assign({ id: "outline-sidebar-outline", className: "list-unstyled" }, { children: isDisplaySequenceLevel
                        ? sequenceIds.map((sequenceId) => (_jsx(SidebarSequence, { courseId: courseId, sequence: sequences[sequenceId], defaultOpen: sequenceId === activeSequenceId, activeUnitId: unitId }, sequenceId)))
                        : sectionsIds.map((sectionId) => (_jsx(SidebarSection, { courseId: courseId, section: sections[sectionId], handleSelectSection: handleSelectSection }, sectionId))) }))] })) })));
};
CourseOutlineTray.ID = ID;
export default CourseOutlineTray;
//# sourceMappingURL=CourseOutlineTray.js.map