import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Card, Icon } from '@openedx/paragon';
import { history } from '@edx/frontend-platform';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Email } from '@openedx/paragon/icons';
import { useSelector } from 'react-redux';
import messages from '../messages';
import LearningGoalButton from './LearningGoalButton';
import { saveWeeklyLearningGoal } from '../../data';
import { useModel } from '../../../generic/model-store';
import './FlagButton.scss';
const WeeklyLearningGoalCard = ({ daysPerWeek, subscribedToReminders, }) => {
    const intl = useIntl();
    const { courseId, } = useSelector(state => state.courseHome);
    const { isMasquerading, org, } = useModel('courseHomeMeta', courseId);
    const { administrator } = getAuthenticatedUser();
    const [daysPerWeekGoal, setDaysPerWeekGoal] = useState(daysPerWeek);
    // eslint-disable-next-line react/prop-types
    const [isGetReminderSelected, setGetReminderSelected] = useState(subscribedToReminders);
    const location = useLocation();
    const handleSelect = (days, triggeredFromEmail = false) => {
        // Set the subscription button if this is the first time selecting a goal
        const selectReminders = daysPerWeekGoal === null ? true : isGetReminderSelected;
        setGetReminderSelected(selectReminders);
        setDaysPerWeekGoal(days);
        if (!isMasquerading) { // don't save goal updates while masquerading
            saveWeeklyLearningGoal(courseId, days, selectReminders);
            sendTrackEvent('edx.ui.lms.goal.days-per-week.changed', {
                org_key: org,
                courserun_key: courseId,
                is_staff: administrator,
                num_days: days,
                reminder_selected: selectReminders,
            });
            if (triggeredFromEmail) {
                sendTrackEvent('enrollment.email.clicked.setgoal', {});
            }
        }
    };
    function handleSubscribeToReminders(event) {
        const isGetReminderChecked = event.target.checked;
        setGetReminderSelected(isGetReminderChecked);
        if (!isMasquerading) { // don't save goal updates while masquerading
            saveWeeklyLearningGoal(courseId, daysPerWeekGoal, isGetReminderChecked);
            sendTrackEvent('edx.ui.lms.goal.reminder-selected.changed', {
                org_key: org,
                courserun_key: courseId,
                is_staff: administrator,
                num_days: daysPerWeekGoal,
                reminder_selected: isGetReminderChecked,
            });
        }
    }
    useEffect(() => {
        const currentParams = new URLSearchParams(location.search);
        const weeklyGoal = Number(currentParams.get('weekly_goal'));
        if ([1, 3, 5].includes(weeklyGoal)) {
            handleSelect(weeklyGoal, true);
            // Deleting the weekly_goal query param as it only needs to be set once
            // whenever passed in query params.
            currentParams.delete('weekly_goal');
            history.replace({
                search: currentParams.toString(),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);
    return (_jsxs(Card, Object.assign({ id: "courseHome-weeklyLearningGoal", className: "row w-100 m-0 mb-3 raised-card", "data-testid": "weekly-learning-goal-card" }, { children: [_jsx(Card.Header, { size: "sm", title: (_jsx("div", Object.assign({ id: "set-weekly-goal-header" }, { children: intl.formatMessage(messages.setWeeklyGoal) }))), subtitle: intl.formatMessage(messages.setWeeklyGoalDetail) }), _jsxs(Card.Section, Object.assign({ className: "text-gray-700 small" }, { children: [_jsxs("div", Object.assign({ role: "radiogroup", "aria-labelledby": "set-weekly-goal-header", className: "flag-button-container m-0 p-0" }, { children: [_jsx(LearningGoalButton, { level: "casual", isSelected: daysPerWeekGoal === 1, handleSelect: handleSelect }), _jsx(LearningGoalButton, { level: "regular", isSelected: daysPerWeekGoal === 3, handleSelect: handleSelect }), _jsx(LearningGoalButton, { level: "intense", isSelected: daysPerWeekGoal === 5, handleSelect: handleSelect })] })), _jsx("div", Object.assign({ className: "d-flex pt-3" }, { children: _jsx(Form.Switch, Object.assign({ checked: isGetReminderSelected, onChange: (event) => handleSubscribeToReminders(event), disabled: !daysPerWeekGoal }, { children: _jsx("small", { children: intl.formatMessage(messages.setGoalReminder) }) })) }))] })), isGetReminderSelected && (_jsx(Card.Section, Object.assign({ muted: true }, { children: _jsxs("div", Object.assign({ className: "row w-100 m-0 small align-center" }, { children: [_jsx("div", Object.assign({ className: "d-flex align-items-center pr-1" }, { children: _jsx(Icon, { className: "text-primary-500", src: Email }) })), _jsx("div", Object.assign({ className: "col" }, { children: intl.formatMessage(messages.goalReminderDetail) }))] })) })))] })));
};
WeeklyLearningGoalCard.propTypes = {
    daysPerWeek: PropTypes.number,
    subscribedToReminders: PropTypes.bool,
};
WeeklyLearningGoalCard.defaultProps = {
    daysPerWeek: null,
    subscribedToReminders: false,
};
export default WeeklyLearningGoalCard;
//# sourceMappingURL=WeeklyLearningGoalCard.js.map