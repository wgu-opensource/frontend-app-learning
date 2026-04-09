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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { sendTrackingLogEvent } from '@edx/frontend-platform/analytics';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Alert, Button, Icon, Spinner, } from '@openedx/paragon';
import { Close, } from '@openedx/paragon/icons';
import { setShowSearch } from '../data/slice';
import { useCoursewareSearchParams, useElementBoundingBox, useLockScroll } from './hooks';
import messages from './messages';
import CoursewareSearchForm from './CoursewareSearchForm';
import CoursewareSearchResultsFilterContainer from './CoursewareResultsFilter';
import { updateModel, useModel } from '../../generic/model-store';
import { searchCourseContent } from '../data/thunks';
const CoursewareSearch = (_a) => {
    var sectionProps = __rest(_a, []);
    const { formatMessage } = useIntl();
    const { courseId } = useParams();
    const { query: searchKeyword, setQuery, clearSearchParams } = useCoursewareSearchParams();
    const dispatch = useDispatch();
    const { org } = useModel('courseHomeMeta', courseId);
    const { loading, searchKeyword: lastSearchKeyword, errors, total, } = useModel('contentSearchResults', courseId);
    const dialogRef = useRef();
    useLockScroll();
    const info = useElementBoundingBox('courseTabsNavigation');
    const top = info ? `${Math.floor(info.top)}px` : 0;
    const clearSearch = () => {
        clearSearchParams();
        dispatch(updateModel({
            modelType: 'contentSearchResults',
            model: {
                id: courseId,
                searchKeyword: '',
                results: [],
                errors: undefined,
                loading: false,
            },
        }));
    };
    const handleSubmit = (value) => {
        if (!value) {
            clearSearch();
            return;
        }
        sendTrackingLogEvent('edx.course.home.courseware_search.submit', {
            org_key: org,
            courserun_key: courseId,
            event_type: 'searchKeyword',
            keyword: value,
        });
        dispatch(searchCourseContent(courseId, value));
        setQuery(value);
    };
    const handleOnChange = (value) => {
        if (value === searchKeyword) {
            return;
        }
        if (!value) {
            clearSearch();
        }
    };
    const close = () => {
        clearSearch();
        dispatch(setShowSearch(false));
    };
    const handlePopState = () => close();
    const handleBackdropClick = function (event) {
        if (event.target === dialogRef.current) {
            dialogRef.current.close();
        }
    };
    useEffect(() => {
        // We need this to keep the dialog reference when unmounting.
        const dialog = dialogRef.current;
        // Open the dialog as a modal on render to confine focus within it.
        dialogRef.current.showModal();
        if (searchKeyword) {
            handleSubmit(searchKeyword); // In case it's opened with a search link, we run the search.
        }
        const controller = new AbortController();
        const { signal } = controller;
        window.addEventListener('popstate', handlePopState, { signal });
        dialog.addEventListener('click', handleBackdropClick, { signal });
        return () => controller.abort(); // Removes event listeners.
    }, []);
    const handleSearchClose = () => close();
    let status = 'idle';
    if (loading) {
        status = 'loading';
    }
    else if (errors) {
        status = 'error';
    }
    else if (lastSearchKeyword) {
        status = 'results';
    }
    return (_jsx("dialog", Object.assign({ ref: dialogRef, className: "courseware-search", style: { '--modal-top-position': top }, "data-testid": "courseware-search-dialog", onClose: handleSearchClose }, sectionProps, { children: _jsx("div", Object.assign({ className: "courseware-search__outer-content" }, { children: _jsxs("div", Object.assign({ className: "courseware-search__content", "data-testid": "courseware-search-content" }, { children: [_jsxs("div", Object.assign({ className: "courseware-search__form" }, { children: [_jsx("h1", Object.assign({ className: "h2" }, { children: formatMessage(messages.searchModuleTitle) })), _jsx(CoursewareSearchForm, { searchTerm: searchKeyword, onSubmit: handleSubmit, onChange: handleOnChange, placeholder: formatMessage(messages.searchBarPlaceholderText) }), _jsx("div", Object.assign({ className: "courseware-search__close" }, { children: _jsx(Button, Object.assign({ variant: "tertiary", className: "p-1", "aria-label": formatMessage(messages.searchCloseAction), onClick: () => dialogRef.current.close(), "data-testid": "courseware-search-close-button" }, { children: _jsx(Icon, { src: Close }) })) }))] })), _jsxs("div", Object.assign({ className: "courseware-search__results", "aria-live": "polite", "data-testid": "courseware-search-results" }, { children: [status === 'loading' ? (_jsx("div", Object.assign({ className: "courseware-search__spinner", "data-testid": "courseware-search-spinner" }, { children: _jsx(Spinner, { animation: "border", variant: "light", screenReaderText: formatMessage(messages.loading) }) }))) : null, status === 'error' && (_jsx(Alert, Object.assign({ className: "mt-4", variant: "danger", "data-testid": "courseware-search-error" }, { children: formatMessage(messages.searchResultsError) }))), status === 'results' ? (_jsxs(_Fragment, { children: [total > 0 ? (_jsx("div", Object.assign({ className: "courseware-search__results-summary", "aria-relevant": "all", "aria-atomic": "true", "data-testid": "courseware-search-summary" }, { children: formatMessage(messages.searchResultsLabel, { total, keyword: lastSearchKeyword }) }))) : null, _jsx(CoursewareSearchResultsFilterContainer, {})] })) : null] }))] })) })) })));
};
export default CoursewareSearch;
//# sourceMappingURL=CoursewareSearch.js.map