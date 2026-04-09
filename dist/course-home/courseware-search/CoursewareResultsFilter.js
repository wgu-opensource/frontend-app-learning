var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useMemo } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Tabs, Tab } from '@openedx/paragon';
import { useParams } from 'react-router';
import CoursewareSearchResults from './CoursewareSearchResults';
import messages from './messages';
import { useCoursewareSearchParams } from './hooks';
import { useModel } from '../../generic/model-store';
const filterAll = 'all';
const filterTypes = ['text', 'video', 'sequence'];
const filterOther = 'other';
const validFilters = [filterAll, ...filterTypes, filterOther];
export const CoursewareSearchResultsFilter = () => {
    const intl = useIntl();
    const { courseId } = useParams();
    const lastSearch = useModel('contentSearchResults', courseId);
    const { filter: filterKeyword, setFilter } = useCoursewareSearchParams();
    if (!lastSearch) {
        return null;
    }
    const { results: data = [] } = lastSearch;
    // If there's no data, we show an empty result.
    if (!data.length) {
        return _jsx(CoursewareSearchResults, {});
    }
    const results = useMemo(() => {
        // This reducer distributes the data into different groups to make it easy to
        // use on the filters.
        // All results are added to the "all" key and then to its proper group key as well.
        const grouped = data.reduce((acc, _a) => {
            var { type } = _a, rest = __rest(_a, ["type"]);
            const resultType = filterTypes.includes(type) ? type : filterOther;
            acc[filterAll].push(Object.assign({ type: resultType }, rest));
            acc[resultType] = [...(acc[resultType] || []), Object.assign({ type: resultType }, rest)];
            return acc;
        }, { [filterAll]: [] });
        // This is just to format the output object with the expected tab order.
        const output = {};
        validFilters.forEach(key => { if (grouped[key]) {
            output[key] = grouped[key];
        } });
        return output;
    }, [lastSearch]);
    const tabKeys = Object.keys(results);
    // Filter has no use if it has only 2 tabs (The "all" tab and another one with the same items).
    if (tabKeys.length < 3) {
        return _jsx(CoursewareSearchResults, { results: results[filterAll] });
    }
    const filters = useMemo(() => tabKeys.map((key) => ({
        key,
        label: intl.formatMessage(messages[`filter:${key}`]),
        count: results[key].length,
    })), [results]);
    const activeKey = validFilters.includes(filterKeyword) ? filterKeyword : filterAll;
    return (_jsx(Tabs, Object.assign({ id: "courseware-search-results-tabs", className: "courseware-search-results-tabs", "data-testid": "courseware-search-results-tabs", variant: "tabs", activeKey: activeKey, onSelect: setFilter }, { children: filters.filter(({ count }) => (count > 0)).map(({ key, label }) => (_jsx(Tab, Object.assign({ eventKey: key, title: label, "data-testid": `courseware-search-results-tabs-${key}` }, { children: _jsx(CoursewareSearchResults, { results: results[key] }) }), key))) })));
};
export default CoursewareSearchResultsFilter;
//# sourceMappingURL=CoursewareResultsFilter.js.map