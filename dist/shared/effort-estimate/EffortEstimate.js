import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';
// This component shows an effort estimate provided by the backend block data. Either time, activities, or both.
const EffortEstimate = (props) => {
    const intl = useIntl();
    const { block: { effortActivities, effortTime, }, className, } = props;
    const minuteCount = Math.ceil(effortTime / 60); // effortTime is in seconds
    const minutesAbbreviated = intl.formatMessage(messages.minutesAbbreviated, { minuteCount });
    const minutesFull = intl.formatMessage(messages.minutesFull, { minuteCount });
    const minutes = (_jsxs(_Fragment, { children: [_jsx("span", Object.assign({ "aria-hidden": "true" }, { children: minutesAbbreviated })), _jsx("span", Object.assign({ className: "sr-only" }, { children: minutesFull }))] }));
    const activities = intl.formatMessage(messages.activities, { activityCount: effortActivities });
    let content = null;
    if (effortTime && effortActivities) {
        content = (_jsx(FormattedMessage, { id: "learning.effortEstimation.combinedEstimate", defaultMessage: "{minutes} + {activities}", description: "You can likely leave this alone, unless you want to use a full width plus or similar change", values: { activities, minutes } }));
    }
    else if (effortTime) {
        content = minutes;
    }
    else if (effortActivities) {
        content = activities;
    }
    else {
        return null;
    }
    return (_jsx("span", Object.assign({ className: classNames('text-gray-500 text-monospace', className), style: { fontSize: '0.8em' } }, { children: content })));
};
EffortEstimate.defaultProps = {
    className: null,
};
EffortEstimate.propTypes = {
    block: PropTypes.shape({
        effortActivities: PropTypes.number,
        effortTime: PropTypes.number,
    }).isRequired,
    className: PropTypes.string,
};
export default EffortEstimate;
//# sourceMappingURL=EffortEstimate.js.map