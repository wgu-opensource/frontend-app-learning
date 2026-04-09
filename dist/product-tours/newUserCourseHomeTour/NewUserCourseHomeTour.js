import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { DismissButtonFormattedMessage, NextButtonFormattedMessage, OkayButtonFormattedMessage, } from '../GenericTourFormattedMessages';
const datesCheckpoint = {
    body: _jsx(FormattedMessage, { id: "tours.datesCheckpoint.body", defaultMessage: "Important dates can help you stay on track." }),
    placement: 'left',
    target: '#courseHome-dates',
    title: _jsx(FormattedMessage, { id: "tours.datesCheckpoint.title", defaultMessage: "Keep on top of key dates" }),
};
const outlineCheckpoint = {
    body: _jsx(FormattedMessage, { id: "tours.outlineCheckpoint.body", defaultMessage: "You can explore sections of the course using the outline below." }),
    placement: 'top',
    target: '#courseHome-outline',
    title: _jsx(FormattedMessage, { id: "tours.outlineCheckpoint.title", defaultMessage: "Take the course!" }),
};
const tabNavigationCheckpoint = {
    body: _jsx(FormattedMessage, { id: "tours.tabNavigationCheckpoint.body", defaultMessage: "These tabs can be used to access other course materials, such as your progress, syllabus, etc." }),
    placement: 'bottom',
    target: '#courseTabsNavigation',
    title: _jsx(FormattedMessage, { id: "tours.tabNavigationCheckpoint.title", defaultMessage: "Additional course resources" }),
};
const upgradeCheckpoint = {
    body: _jsx(FormattedMessage, { id: "tours.upgradeCheckpoint.body", defaultMessage: "Work towards a certificate and gain full access to course materials. Upgrade now!" }),
    placement: 'left',
    target: '#courseHome-upgradeNotification',
    title: _jsx(FormattedMessage, { id: "tours.upgradeCheckpoint.title", defaultMessage: "Unlock your course" }),
};
const weeklyGoalsCheckpoint = {
    body: _jsx(FormattedMessage, { id: "tours.weeklyGoalsCheckpoint.body", defaultMessage: "Setting a goal makes you more likely to complete your course." }),
    placement: 'left',
    target: '#courseHome-weeklyLearningGoal',
    title: _jsx(FormattedMessage, { id: "tours.weeklyGoalsCheckpoint.title", defaultMessage: "Set a course goal" }),
};
const newUserCourseHomeTour = ({ enabled, onDismiss, onEnd, }) => ({
    advanceButtonText: _jsx(NextButtonFormattedMessage, {}),
    checkpoints: [
        outlineCheckpoint,
        datesCheckpoint,
        tabNavigationCheckpoint,
        upgradeCheckpoint,
        weeklyGoalsCheckpoint,
    ],
    dismissButtonText: _jsx(DismissButtonFormattedMessage, {}),
    enabled,
    endButtonText: _jsx(OkayButtonFormattedMessage, {}),
    onDismiss,
    onEnd,
    onEscape: onDismiss,
    tourId: 'newUserCourseHomeTour',
});
export default newUserCourseHomeTour;
//# sourceMappingURL=NewUserCourseHomeTour.js.map