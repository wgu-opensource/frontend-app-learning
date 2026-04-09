import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Folder, TextFields, VideoCamera, Article, } from '@openedx/paragon/icons';
import { getConfig } from '@edx/frontend-platform';
import { Icon } from '@openedx/paragon';
import PropTypes from 'prop-types';
import CoursewareSearchEmpty from './CoursewareSearchEmpty';
const iconTypeMapping = {
    text: TextFields,
    video: VideoCamera,
    sequence: Folder,
    other: Article,
};
const defaultIcon = Article;
const CoursewareSearchResults = ({ results = [] }) => {
    if (!(results === null || results === void 0 ? void 0 : results.length)) {
        return _jsx(CoursewareSearchEmpty, {});
    }
    const baseUrl = `${getConfig().LMS_BASE_URL}`;
    return (_jsx("div", Object.assign({ className: "courseware-search-results", "data-testid": "search-results" }, { children: results.map(({ id, title, type, location, url, contentHits, }) => {
            const key = type.toLowerCase();
            const icon = iconTypeMapping[key] || defaultIcon;
            const isExternal = !url.startsWith('/');
            const linkProps = isExternal ? {
                href: url,
                target: '_blank',
                rel: 'nofollow',
            } : { href: `${baseUrl}${url}` };
            return (_jsxs("a", Object.assign({ className: "courseware-search-results__item" }, linkProps, { children: [_jsx("div", Object.assign({ className: "courseware-search-results__icon" }, { children: _jsx(Icon, { src: icon }) })), _jsxs("div", Object.assign({ className: "courseware-search-results__info" }, { children: [_jsxs("div", Object.assign({ className: "courseware-search-results__title" }, { children: [_jsx("span", { children: title }), contentHits ? (_jsx("em", { children: contentHits })) : null] })), (location === null || location === void 0 ? void 0 : location.length) ? (_jsx("ul", Object.assign({ className: "courseware-search-results__breadcrumbs" }, { children: 
                                // This ignore is necessary because the breadcrumb texts might have duplicates.
                                // The breadcrumbs are not expected to change.
                                // eslint-disable-next-line react/no-array-index-key
                                location.map((breadcrumb, i) => (_jsx("li", { children: _jsx("div", { children: breadcrumb }) }, `${i}:${breadcrumb}`))) }))) : null] }))] }), id));
        }) })));
};
CoursewareSearchResults.propTypes = {
    results: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        type: PropTypes.string,
        location: PropTypes.arrayOf(PropTypes.string),
        url: PropTypes.string,
        contentHits: PropTypes.number,
    })),
};
CoursewareSearchResults.defaultProps = {
    results: [],
};
export default CoursewareSearchResults;
//# sourceMappingURL=CoursewareSearchResults.js.map