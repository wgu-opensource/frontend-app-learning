import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { FormattedDate } from '@edx/frontend-platform/i18n';
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useModel } from '../../generic/model-store';
import { isLearnerAssignment } from '../dates-tab/utils';
import './DateSummary.scss';
const DateSummary = ({ dateBlock, userTimezone, }) => {
    const { courseId, } = useSelector(state => state.courseHome);
    const { org, } = useModel('courseHomeMeta', courseId);
    const linkedTitle = dateBlock.link && isLearnerAssignment(dateBlock);
    const timezoneFormatArgs = userTimezone ? { timeZone: userTimezone } : {};
    const logVerifiedUpgradeClick = () => {
        sendTrackEvent('edx.bi.ecommerce.upsell_links_clicked', {
            org_key: org,
            courserun_key: courseId,
            linkCategory: '(none)',
            linkName: 'course_home_dates',
            linkType: 'link',
            pageName: 'course_home',
        });
    };
    return (_jsxs("li", Object.assign({ className: "p-0 mb-3 small text-dark-500" }, { children: [_jsxs("div", Object.assign({ className: "row" }, { children: [_jsx(FontAwesomeIcon, { icon: faCalendarAlt, className: "ml-3 mt-1 mr-1", fixedWidth: true }), _jsx("div", Object.assign({ className: "ml-1 font-weight-bold" }, { children: _jsx(FormattedDate, Object.assign({ value: dateBlock.date, day: "numeric", month: "short", weekday: "short", year: "numeric" }, timezoneFormatArgs)) }))] })), _jsxs("div", Object.assign({ className: "row ml-4 pr-2" }, { children: [_jsxs("div", Object.assign({ className: "date-summary-text" }, { children: [linkedTitle && (_jsx("div", Object.assign({ className: "font-weight-bold mt-2" }, { children: _jsx("a", Object.assign({ href: dateBlock.link }, { children: dateBlock.title })) }))), !linkedTitle && (_jsx("div", Object.assign({ className: "font-weight-bold mt-2" }, { children: dateBlock.title })))] })), dateBlock.description && (_jsx("div", Object.assign({ className: "date-summary-text mt-1" }, { children: dateBlock.description }))), !linkedTitle && dateBlock.link && (_jsx("a", Object.assign({ id: dateBlock.dateType === 'verified-upgrade-deadline' ? 'date-verified-upgrade-deadline' : '', href: dateBlock.link, onClick: dateBlock.dateType === 'verified-upgrade-deadline' ? logVerifiedUpgradeClick : () => { }, className: "description-link" }, { children: dateBlock.linkText })))] }))] })));
};
DateSummary.propTypes = {
    dateBlock: PropTypes.shape({
        date: PropTypes.string.isRequired,
        dateType: PropTypes.string,
        description: PropTypes.string,
        link: PropTypes.string,
        linkText: PropTypes.string,
        title: PropTypes.string.isRequired,
        learnerHasAccess: PropTypes.bool,
    }).isRequired,
    userTimezone: PropTypes.string,
};
DateSummary.defaultProps = {
    userTimezone: null,
};
export default DateSummary;
//# sourceMappingURL=DateSummary.js.map