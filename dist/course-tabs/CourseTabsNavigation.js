import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import classNames from 'classnames';
import messages from './messages';
import Tabs from '../generic/tabs/Tabs';
import { CoursewareSearch, CoursewareSearchToggle } from '../course-home/courseware-search';
import { useCoursewareSearchState } from '../course-home/courseware-search/hooks';
const CourseTabsNavigation = ({ activeTabSlug, className, tabs, }) => {
    const intl = useIntl();
    const { show } = useCoursewareSearchState();
    return (_jsxs("div", Object.assign({ id: "courseTabsNavigation", className: classNames('course-tabs-navigation', className) }, { children: [_jsx("div", Object.assign({ className: "container-xl" }, { children: _jsxs("div", Object.assign({ className: "nav-bar" }, { children: [_jsx("div", Object.assign({ className: "nav-menu" }, { children: _jsx(Tabs, Object.assign({ className: "nav-underline-tabs", "aria-label": intl.formatMessage(messages.courseMaterial) }, { children: tabs.map(({ url, title, slug }) => (_jsx("a", Object.assign({ className: classNames('nav-item flex-shrink-0 nav-link', { active: slug === activeTabSlug }), href: url }, { children: title }), slug))) })) })), _jsx("div", Object.assign({ className: "search-toggle" }, { children: _jsx(CoursewareSearchToggle, {}) }))] })) })), show && _jsx(CoursewareSearch, {})] })));
};
CourseTabsNavigation.propTypes = {
    activeTabSlug: PropTypes.string,
    className: PropTypes.string,
    tabs: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    })).isRequired,
};
CourseTabsNavigation.defaultProps = {
    activeTabSlug: undefined,
    className: null,
};
export default CourseTabsNavigation;
//# sourceMappingURL=CourseTabsNavigation.js.map