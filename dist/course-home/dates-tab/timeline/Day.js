import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { FormattedDate, FormattedTime, useIntl, } from '@edx/frontend-platform/i18n';
import { Tooltip, OverlayTrigger } from '@openedx/paragon';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useModel } from '../../../generic/model-store';
import { getBadgeListAndColor } from './badgelist';
import { isLearnerAssignment } from '../utils';
const Day = ({ date, first, items, last, }) => {
    const intl = useIntl();
    const { courseId, } = useSelector(state => state.courseHome);
    const { userTimezone, } = useModel('courseHomeMeta', courseId);
    const timezoneFormatArgs = userTimezone ? { timeZone: userTimezone } : {};
    const { color, badges } = getBadgeListAndColor(date, intl, null, items);
    return (_jsxs("li", Object.assign({ className: "dates-day pb-4", "data-testid": "dates-day" }, { children: [!first && _jsx("div", { className: "dates-line-top border-1 border-left border-gray-900 bg-gray-900" }), _jsx("div", { className: classNames(color, 'dates-dot border border-gray-900') }), !last && _jsx("div", { className: "dates-line-bottom border-1 border-left border-gray-900 bg-gray-900" }), _jsxs("div", Object.assign({ className: "d-inline-block ml-3 pl-2" }, { children: [_jsxs("div", Object.assign({ className: "row w-100 m-0 mb-1 align-items-center text-primary-700", "data-testid": "dates-header" }, { children: [_jsx(FormattedDate, Object.assign({ value: date, day: "numeric", month: "short", weekday: "short", year: "numeric" }, timezoneFormatArgs)), badges] })), items.map((item) => {
                        const { badges: itemBadges } = getBadgeListAndColor(date, intl, item, items);
                        const showDueDateTime = item.dateType === 'assignment-due-date';
                        const showLink = item.link && isLearnerAssignment(item);
                        const title = showLink ? (_jsx("u", { children: _jsx("a", Object.assign({ href: item.link, className: "text-reset" }, { children: item.title })) })) : item.title;
                        const available = item.learnerHasAccess && (item.link || !isLearnerAssignment(item));
                        const textColor = available ? 'text-primary-700' : 'text-gray-500';
                        return (_jsxs("div", Object.assign({ className: classNames(textColor, 'small pb-1'), "data-testid": "dates-item" }, { children: [_jsxs("div", { children: [_jsxs("span", Object.assign({ className: "small" }, { children: [_jsxs("span", Object.assign({ className: "font-weight-bold" }, { children: [item.assignmentType && `${item.assignmentType}: `, title] })), showDueDateTime && (_jsxs("span", { children: [_jsx("span", Object.assign({ className: "mx-1" }, { children: "due" })), _jsx(FormattedTime, Object.assign({ value: date, timeZoneName: "short" }, timezoneFormatArgs))] }))] })), itemBadges, item.extraInfo && (_jsx(OverlayTrigger, Object.assign({ placement: "bottom", overlay: _jsx(Tooltip, { children: item.extraInfo }) }, { children: _jsx(FontAwesomeIcon, { icon: faInfoCircle, className: "fa-xs ml-1 text-gray-700", "data-testid": "dates-extra-info" }) })))] }), item.description && _jsx("div", Object.assign({ className: "small mb-2" }, { children: item.description }))] }), item.title + item.date));
                    })] }))] })));
};
Day.propTypes = {
    date: PropTypes.objectOf(Date).isRequired,
    first: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string,
        dateType: PropTypes.string,
        description: PropTypes.string,
        dueNext: PropTypes.bool,
        learnerHasAccess: PropTypes.bool,
        link: PropTypes.string,
        title: PropTypes.string,
    })).isRequired,
    last: PropTypes.bool,
};
Day.defaultProps = {
    first: false,
    last: false,
};
export default Day;
//# sourceMappingURL=Day.js.map