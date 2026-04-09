import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { getConfig } from '@edx/frontend-platform';
import { useToggle } from '@openedx/paragon';
import { CourseTabsNavigation } from '../course-tabs';
import { useModel } from '../generic/model-store';
import { AlertList } from '../generic/user-messages';
import StreakModal from '../shared/streak-celebration';
import InstructorToolbar from '../instructor-toolbar';
import useEnrollmentAlert from '../alerts/enrollment-alert';
import useLogistrationAlert from '../alerts/logistration-alert';
import ProductTours from '../product-tours/ProductTours';
const LoadedTabPage = ({ activeTabSlug, children, courseId, metadataModel, unitId, }) => {
    const { celebrations, org, originalUserIsStaff, tabs, title, verifiedMode, hasCourseAuthorAccess, } = useModel('courseHomeMeta', courseId);
    // Logistration and enrollment alerts are only really used for the outline tab, but loaded here to put them above
    // breadcrumbs when they are visible.
    const logistrationAlert = useLogistrationAlert(courseId);
    const enrollmentAlert = useEnrollmentAlert(courseId);
    const activeTab = tabs.filter(tab => tab.slug === activeTabSlug)[0];
    const streakLengthToCelebrate = celebrations && celebrations.streakLengthToCelebrate;
    const streakDiscountCouponEnabled = celebrations && celebrations.streakDiscountEnabled && verifiedMode;
    const [isStreakCelebrationOpen, , closeStreakCelebration] = useToggle(streakLengthToCelebrate);
    return (_jsxs(_Fragment, { children: [_jsx(ProductTours, { activeTab: activeTabSlug, courseId: courseId, isStreakCelebrationOpen: isStreakCelebrationOpen, org: org }), _jsx(Helmet, { children: _jsx("title", { children: `${activeTab ? `${activeTab.title} | ` : ''}${title} | ${getConfig().SITE_NAME}` }) }), originalUserIsStaff && (_jsx(InstructorToolbar, { courseId: courseId, unitId: unitId, tab: activeTabSlug, isStudioButtonVisible: hasCourseAuthorAccess })), _jsx(StreakModal, { courseId: courseId, metadataModel: metadataModel, streakLengthToCelebrate: streakLengthToCelebrate, isStreakCelebrationOpen: !!isStreakCelebrationOpen, closeStreakCelebration: closeStreakCelebration, streakDiscountCouponEnabled: streakDiscountCouponEnabled, verifiedMode: verifiedMode }), _jsxs("main", Object.assign({ className: "d-flex flex-column flex-grow-1" }, { children: [_jsx(AlertList, { topic: "outline", className: "mx-5 mt-3", customAlerts: Object.assign(Object.assign({}, enrollmentAlert), logistrationAlert) }), _jsx(CourseTabsNavigation, { tabs: tabs, className: "mb-3", activeTabSlug: activeTabSlug }), _jsx("div", Object.assign({ id: "main-content", className: "container-xl" }, { children: children }))] }))] }));
};
LoadedTabPage.propTypes = {
    activeTabSlug: PropTypes.string.isRequired,
    children: PropTypes.node,
    courseId: PropTypes.string.isRequired,
    metadataModel: PropTypes.string,
    unitId: PropTypes.string,
};
LoadedTabPage.defaultProps = {
    children: null,
    metadataModel: 'courseHomeMeta',
    unitId: null,
};
export default LoadedTabPage;
//# sourceMappingURL=LoadedTabPage.js.map