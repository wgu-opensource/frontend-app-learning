import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate, FormattedMessage, FormattedRelativeTime, FormattedTime, } from '@edx/frontend-platform/i18n';
import { Alert } from '@openedx/paragon';
import { Info } from '@openedx/paragon/icons';
import { useModel } from '../../generic/model-store';
const DAY_SEC = 24 * 60 * 60; // in seconds
const DAY_MS = DAY_SEC * 1000; // in ms
const YEAR_SEC = 365 * DAY_SEC; // in seconds
const CourseStartAlert = ({ payload }) => {
    const { courseId, } = payload;
    const { start: startDate, userTimezone, } = useModel('courseHomeMeta', courseId);
    const timezoneFormatArgs = userTimezone ? { timeZone: userTimezone } : {};
    const delta = new Date(startDate) - new Date();
    const timeRemaining = (_jsx(FormattedRelativeTime, Object.assign({ value: delta / 1000, numeric: "auto", 
        // 1 year interval to help auto format. It won't format without updateIntervalInSeconds.
        updateIntervalInSeconds: YEAR_SEC }, timezoneFormatArgs), "timeRemaining"));
    if (delta < DAY_MS) {
        return (_jsx(Alert, Object.assign({ variant: "info", icon: Info }, { children: _jsx(FormattedMessage, { id: "learning.outline.alert.start.short", defaultMessage: "Course starts {timeRemaining} at {courseStartTime}.", description: "Used when the time remaining is less than a day away.", values: {
                    courseStartTime: (_jsx(FormattedTime, Object.assign({ day: "numeric", month: "short", year: "numeric", timeZoneName: "short", value: startDate }, timezoneFormatArgs), "courseStartTime")),
                    timeRemaining,
                } }) })));
    }
    return (_jsxs(Alert, Object.assign({ variant: "info", icon: Info }, { children: [_jsx("strong", { children: _jsx(FormattedMessage, { id: "learning.outline.alert.start.long", defaultMessage: "Course starts {timeRemaining} on {courseStartDate}.", description: "Used when the time remaining is more than a day away.", values: {
                        courseStartDate: (_jsx(FormattedDate, Object.assign({ day: "numeric", month: "short", year: "numeric", value: startDate }, timezoneFormatArgs), "courseStartDate")),
                        timeRemaining,
                    } }) }), _jsx("br", {}), _jsx(FormattedMessage, { id: "learning.outline.alert.start.calendar", defaultMessage: "Don\u2019t forget to add a calendar reminder!", description: "It's just a recommendation for learners to set a reminder for the course starting date and is shown when the course starting date is more than a day. " })] })));
};
CourseStartAlert.propTypes = {
    payload: PropTypes.shape({
        courseId: PropTypes.string,
    }).isRequired,
};
export default CourseStartAlert;
//# sourceMappingURL=CourseStartAlert.js.map