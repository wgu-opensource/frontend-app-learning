var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import { initializeTestStore, render, screen } from '../setupTest';
import { TabContainer } from './index';
const mockDispatch = jest.fn();
jest.mock('react-redux', () => (Object.assign(Object.assign({}, jest.requireActual('react-redux')), { useDispatch: () => mockDispatch })));
jest.mock('./TabPage', () => function () {
    return _jsx("div", { "data-testid": "TabPage" });
});
describe('Tab Container', () => {
    let courseId;
    let mockFetch;
    let mockData;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        mockFetch = jest.fn().mockImplementation((x) => x);
        mockData = {
            fetch: mockFetch,
            tab: 'dummy',
            slice: 'courseware',
        };
        const store = yield initializeTestStore({ excludeFetchSequence: true });
        courseId = store.getState().courseware.courseId;
    }));
    it('renders correctly', () => {
        render(_jsx(MemoryRouter, Object.assign({ initialEntries: [`/course/${courseId}`] }, { children: _jsx(Routes, { children: _jsx(Route, { path: "/course/:courseId", element: (_jsxs(TabContainer, Object.assign({}, mockData, { children: ["children=", []] }))) }) }) })));
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(courseId);
        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith(courseId);
        expect(screen.getByTestId('TabPage')).toBeInTheDocument();
    });
    it('Should handle passing in a targetUserId', () => {
        const targetUserId = '1';
        render(_jsx(MemoryRouter, Object.assign({ initialEntries: [`/course/${courseId}/progress/${targetUserId}/`] }, { children: _jsx(Routes, { children: _jsx(Route, { path: "/course/:courseId/progress/:targetUserId/", element: (_jsxs(TabContainer, Object.assign({ fetch: mockFetch, tab: "dummy", slice: "courseHome", isProgressTab: true }, { children: ["children=", []] }))) }) }) })));
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(courseId, targetUserId);
        expect(screen.getByTestId('TabPage')).toBeInTheDocument();
    });
});
//# sourceMappingURL=TabContainer.test.js.map