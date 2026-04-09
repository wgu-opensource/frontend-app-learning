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
import { act, fireEvent, initializeMockApp, render, screen, waitFor, } from '../../setupTest';
import { fetchCoursewareSearchSettings } from '../data/thunks';
import { setShowSearch } from '../data/slice';
import { CoursewareSearchToggle } from './index';
const mockDispatch = jest.fn();
const mockCoursewareSearchParams = jest.fn();
jest.mock('../data/thunks');
jest.mock('../data/slice');
jest.mock('react-redux', () => (Object.assign(Object.assign({}, jest.requireActual('react-redux')), { useDispatch: () => mockDispatch })));
jest.mock('./hooks', () => (Object.assign(Object.assign({}, jest.requireActual('./hooks')), { useCoursewareSearchParams: () => mockCoursewareSearchParams })));
const coursewareSearch = {
    query: '',
    filter: '',
    setQuery: jest.fn(),
    setFilter: jest.fn(),
    clearSearchParams: jest.fn(),
};
const mockSearchParams = ((props = coursewareSearch) => {
    mockCoursewareSearchParams.mockReturnValue(props);
});
function renderComponent() {
    const { container } = render(_jsx(CoursewareSearchToggle, {}));
    return container;
}
describe('CoursewareSearchToggle', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        initializeMockApp();
    }));
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('Should not render when the waffle flag is disabled', () => __awaiter(void 0, void 0, void 0, function* () {
        fetchCoursewareSearchSettings.mockImplementation(() => Promise.resolve({ enabled: false }));
        mockSearchParams();
        yield act(() => __awaiter(void 0, void 0, void 0, function* () { return renderComponent(); }));
        yield waitFor(() => {
            expect(fetchCoursewareSearchSettings).toHaveBeenCalledTimes(1);
            expect(screen.queryByTestId('courseware-search-open-button')).not.toBeInTheDocument();
        });
    }));
    it('Should render when the waffle flag is enabled', () => __awaiter(void 0, void 0, void 0, function* () {
        fetchCoursewareSearchSettings.mockImplementation(() => Promise.resolve({ enabled: true }));
        mockSearchParams();
        yield act(() => __awaiter(void 0, void 0, void 0, function* () { return renderComponent(); }));
        yield waitFor(() => {
            expect(fetchCoursewareSearchSettings).toHaveBeenCalledTimes(1);
            expect(screen.queryByTestId('courseware-search-open-button')).toBeInTheDocument();
        });
    }));
    it('Should dispatch setShowSearch(true) when clicking the search button', () => __awaiter(void 0, void 0, void 0, function* () {
        fetchCoursewareSearchSettings.mockImplementation(() => Promise.resolve({ enabled: true }));
        mockSearchParams();
        yield act(() => __awaiter(void 0, void 0, void 0, function* () { return renderComponent(); }));
        const button = yield screen.findByTestId('courseware-search-open-button');
        fireEvent.click(button);
        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(setShowSearch).toHaveBeenCalledTimes(1);
        expect(setShowSearch).toHaveBeenCalledWith(true);
    }));
});
//# sourceMappingURL=CoursewareSearchToggle.test.js.map