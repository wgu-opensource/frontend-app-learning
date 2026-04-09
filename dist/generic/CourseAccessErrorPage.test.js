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
import { history } from '@edx/frontend-platform';
import { Routes, Route } from 'react-router-dom';
import { initializeTestStore, render, screen } from '../setupTest';
import CourseAccessErrorPage from './CourseAccessErrorPage';
const mockDispatch = jest.fn();
const mockNavigate = jest.fn();
let mockCourseStatus;
jest.mock('react-redux', () => (Object.assign(Object.assign({}, jest.requireActual('react-redux')), { useDispatch: () => mockDispatch, useSelector: () => ({ courseStatus: mockCourseStatus }) })));
jest.mock('./PageLoading', () => function () {
    return _jsx("div", { "data-testid": "page-loading" });
});
jest.mock('react-router-dom', () => (Object.assign(Object.assign({}, (jest.requireActual('react-router-dom'))), { useNavigate: () => mockNavigate })));
describe('CourseAccessErrorPage', () => {
    let courseId;
    let accessDeniedUrl;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const store = yield initializeTestStore({ excludeFetchSequence: true });
        courseId = store.getState().courseware.courseId;
        accessDeniedUrl = `/course/${courseId}/access-denied`;
        history.push(accessDeniedUrl);
    }));
    it('Displays loading in start on page rendering', () => {
        mockCourseStatus = 'loading';
        render(_jsx(Routes, { children: _jsx(Route, { path: "/course/:courseId/access-denied", element: _jsx(CourseAccessErrorPage, {}) }) }), { wrapWithRouter: true });
        expect(screen.getByTestId('page-loading')).toBeInTheDocument();
        expect(window.location.pathname).toBe(accessDeniedUrl);
    });
    it('Redirect user to homepage if user has access', () => {
        mockCourseStatus = 'loaded';
        render(_jsx(Routes, { children: _jsx(Route, { path: "/course/:courseId/access-denied", element: _jsx(CourseAccessErrorPage, {}) }) }), { wrapWithRouter: true });
        expect(window.location.pathname).toBe('/redirect/home/course-v1:edX+DemoX+Demo_Course');
    });
    it('For access denied it should render access denied page', () => {
        mockCourseStatus = 'denied';
        render(_jsx(Routes, { children: _jsx(Route, { path: "/course/:courseId/access-denied", element: _jsx(CourseAccessErrorPage, {}) }) }), { wrapWithRouter: true });
        expect(screen.getByTestId('access-denied-main')).toBeInTheDocument();
        expect(window.location.pathname).toBe(accessDeniedUrl);
    });
});
//# sourceMappingURL=CourseAccessErrorPage.test.js.map