import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { getConfig } from '@edx/frontend-platform';
import { useLocation, useNavigate } from 'react-router-dom';
import { breakpoints, useWindowSize } from '@openedx/paragon';
import { AlertList } from '@src/generic/user-messages';
import { useModel } from '@src/generic/model-store';
import Chat from './chat/Chat';
import SidebarProvider from './sidebar/SidebarContextProvider';
import NewSidebarProvider from './new-sidebar/SidebarContextProvider';
import { NotificationsDiscussionsSidebarTriggerSlot } from '../../plugin-slots/NotificationsDiscussionsSidebarTriggerSlot';
import { CelebrationModal, shouldCelebrateOnSectionLoad, WeeklyGoalCelebrationModal } from './celebration';
import ContentTools from './content-tools';
import Sequence from './sequence';
import { CourseOutlineMobileSidebarTriggerSlot } from '../../plugin-slots/CourseOutlineMobileSidebarTriggerSlot';
import { CourseBreadcrumbsSlot } from '../../plugin-slots/CourseBreadcrumbsSlot';
const Course = ({ courseId, sequenceId, unitId, nextSequenceHandler, previousSequenceHandler, unitNavigationHandler, windowWidth, }) => {
    var _a, _b;
    const course = useModel('coursewareMeta', courseId);
    const { celebrations, isStaff, isNewDiscussionSidebarViewEnabled, originalUserIsStaff, } = useModel('courseHomeMeta', courseId);
    const sequence = useModel('sequences', sequenceId);
    const section = useModel('sections', sequence ? sequence.sectionId : null);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    if (!originalUserIsStaff && pathname.startsWith('/preview')) {
        const courseUrl = pathname.replace('/preview', '');
        navigate(courseUrl, { replace: true });
    }
    const pageTitleBreadCrumbs = [
        sequence,
        section,
        course,
    ].filter(element => element != null).map(element => element.title);
    // Below the tabs, above the breadcrumbs alerts (appearing in the order listed here)
    const dispatch = useDispatch();
    const [firstSectionCelebrationOpen, setFirstSectionCelebrationOpen] = useState(false);
    // If streakLengthToCelebrate is populated, that modal takes precedence. Wait til the next load to display
    // the weekly goal celebration modal.
    const [weeklyGoalCelebrationOpen, setWeeklyGoalCelebrationOpen] = useState(celebrations && !celebrations.streakLengthToCelebrate && celebrations.weeklyGoal);
    const shouldDisplayChat = windowWidth >= breakpoints.medium.minWidth;
    const daysPerWeek = (_b = (_a = course === null || course === void 0 ? void 0 : course.courseGoals) === null || _a === void 0 ? void 0 : _a.selectedGoal) === null || _b === void 0 ? void 0 : _b.daysPerWeek;
    useEffect(() => {
        const celebrateFirstSection = celebrations && celebrations.firstSection;
        setFirstSectionCelebrationOpen(shouldCelebrateOnSectionLoad(courseId, sequenceId, celebrateFirstSection, dispatch, celebrations));
    }, [sequenceId]);
    const SidebarProviderComponent = isNewDiscussionSidebarViewEnabled ? NewSidebarProvider : SidebarProvider;
    return (_jsxs(SidebarProviderComponent, Object.assign({ courseId: courseId, unitId: unitId }, { children: [_jsx(Helmet, { children: _jsx("title", { children: `${pageTitleBreadCrumbs.join(' | ')} | ${getConfig().SITE_NAME}` }) }), _jsxs("div", Object.assign({ className: "position-relative d-flex align-items-xl-center mb-4 mt-1 flex-column flex-xl-row" }, { children: [_jsx(CourseBreadcrumbsSlot, { courseId: courseId, sectionId: section ? section.id : null, sequenceId: sequenceId, isStaff: isStaff, unitId: unitId }), shouldDisplayChat && (_jsx(_Fragment, { children: _jsx(Chat, { enabled: course.learningAssistantEnabled, enrollmentMode: course.enrollmentMode, isStaff: isStaff, courseId: courseId, contentToolsEnabled: course.showCalculator || course.notes.enabled, unitId: unitId }) })), _jsxs("div", Object.assign({ className: "w-100 d-flex align-items-center" }, { children: [_jsx(CourseOutlineMobileSidebarTriggerSlot, {}), _jsx(NotificationsDiscussionsSidebarTriggerSlot, { courseId: courseId })] }))] })), _jsx(AlertList, { topic: "sequence" }), _jsx(Sequence, { unitId: unitId, sequenceId: sequenceId, courseId: courseId, unitNavigationHandler: unitNavigationHandler, nextSequenceHandler: nextSequenceHandler, previousSequenceHandler: previousSequenceHandler }), _jsx(CelebrationModal, { courseId: courseId, isOpen: firstSectionCelebrationOpen, onClose: () => setFirstSectionCelebrationOpen(false) }), _jsx(WeeklyGoalCelebrationModal, { courseId: courseId, daysPerWeek: daysPerWeek, isOpen: weeklyGoalCelebrationOpen, onClose: () => setWeeklyGoalCelebrationOpen(false) }), _jsx(ContentTools, { course: course })] })));
};
Course.propTypes = {
    courseId: PropTypes.string,
    sequenceId: PropTypes.string,
    unitId: PropTypes.string,
    nextSequenceHandler: PropTypes.func.isRequired,
    previousSequenceHandler: PropTypes.func.isRequired,
    unitNavigationHandler: PropTypes.func.isRequired,
    windowWidth: PropTypes.number.isRequired,
};
Course.defaultProps = {
    courseId: null,
    sequenceId: null,
    unitId: null,
};
const CourseWrapper = (props) => {
    // useWindowSize initially returns an undefined width intentionally at first.
    // See https://www.joshwcomeau.com/react/the-perils-of-rehydration/ for why.
    // But <Course> has some tricky window-size-dependent, session-storage-setting logic and React would yell at us if
    // we exited that component early, before hitting all the useState() calls.
    // So just skip all that until we have a window size available.
    const windowWidth = useWindowSize().width;
    if (windowWidth === undefined) {
        return null;
    }
    return _jsx(Course, Object.assign({}, props, { windowWidth: windowWidth }));
};
export default CourseWrapper;
//# sourceMappingURL=Course.js.map