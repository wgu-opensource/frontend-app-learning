var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { AppProvider } from '@edx/frontend-platform/react';
import { Route, Routes } from 'react-router-dom';
import { history } from '@edx/frontend-platform';
import { initializeMockApp, render, screen, waitFor, } from '../../setupTest';
import { CoursewareSearchResultsFilter } from './CoursewareResultsFilter';
import { useCoursewareSearchParams } from './hooks';
import initializeStore from '../../store';
import { useModel } from '../../generic/model-store';
import searchResultsFactory from './test-data/search-results-factory';
jest.mock('./hooks');
jest.mock('../../generic/model-store', () => ({
    useModel: jest.fn(),
}));
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));
const decodedCourseId = 'course-v1:edX+DemoX+Demo_Course';
const decodedSequenceId = 'block-v1:edX+DemoX+Demo_Course+type@sequential+block@edx_introduction';
const decodedUnitId = 'block-v1:edX+DemoX+Demo_Course+type@vertical+block@vertical_0270f6de40fc';
const pathname = `/course/${decodedCourseId}/${decodedSequenceId}/${decodedUnitId}`;
const intl = {
    formatMessage: (message) => (message === null || message === void 0 ? void 0 : message.defaultMessage) || '',
};
const coursewareSearch = {
    query: '',
    filter: '',
    setQuery: jest.fn(),
    setFilter: jest.fn(),
    clearSearchParams: jest.fn(),
};
function renderComponent(props = {}) {
    const store = initializeStore();
    history.push(pathname);
    const { container } = render(_jsx(AppProvider, Object.assign({ store: store }, { children: _jsx(Routes, { children: _jsx(Route, { path: "/course/:courseId/:sequenceId/:unitId", element: _jsx(CoursewareSearchResultsFilter, Object.assign({ intl: intl }, props)) }) }) })));
    return container;
}
describe('CoursewareSearchResultsFilter', () => {
    beforeAll(initializeMockApp);
    beforeEach(() => {
        useCoursewareSearchParams.mockReturnValue(coursewareSearch);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('when returning full results', () => {
        beforeEach(() => {
            useModel.mockReturnValue(searchResultsFactory());
            renderComponent();
        });
        it('should render without errors', () => __awaiter(void 0, void 0, void 0, function* () {
            yield waitFor(() => {
                expect(useCoursewareSearchParams).toBeCalled();
            });
            expect(screen.queryByTestId('courseware-search-results-tabs')).toBeInTheDocument();
            expect(screen.queryByTestId('courseware-search-results-tabs-all')).toBeInTheDocument();
            expect(screen.queryByTestId('courseware-search-results-tabs-text')).toBeInTheDocument();
            expect(screen.queryByTestId('courseware-search-results-tabs-video')).toBeInTheDocument();
            expect(screen.queryByTestId('courseware-search-results-tabs-sequence')).toBeInTheDocument();
            expect(screen.queryByTestId('courseware-search-results-tabs-other')).toBeInTheDocument();
        }));
    });
    describe('when returning only one result type', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            // Get results for only videos
            const data = searchResultsFactory();
            const onlyVideos = data.results.filter(({ type }) => type === 'video');
            const filteredResults = Object.assign(Object.assign({}, data), { results: onlyVideos });
            useModel.mockReturnValue(filteredResults);
            yield renderComponent();
        }));
        it('should not render', () => __awaiter(void 0, void 0, void 0, function* () {
            yield waitFor(() => {
                expect(useCoursewareSearchParams).toBeCalled();
            });
            expect(screen.queryByTestId('courseware-search-results-tabs')).not.toBeInTheDocument();
        }));
    });
    describe('when there are not results', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            useModel.mockReturnValue(searchResultsFactory('blah', {
                results: [],
                filters: [],
                total: 0,
                maxScore: null,
                ms: 5,
            }));
            yield renderComponent();
        }));
        it('should not render', () => __awaiter(void 0, void 0, void 0, function* () {
            yield waitFor(() => {
                expect(useCoursewareSearchParams).toBeCalled();
            });
            expect(screen.queryByTestId('courseware-search-results-tabs')).not.toBeInTheDocument();
        }));
    });
});
//# sourceMappingURL=CoursewareResultsFilter.test.js.map