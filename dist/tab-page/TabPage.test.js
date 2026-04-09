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
import { getConfig } from '@edx/frontend-platform';
import MockAdapter from 'axios-mock-adapter';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { initializeTestStore, logUnhandledRequests, render, screen, } from '../setupTest';
import { TabPage } from './index';
import { executeThunk } from '../utils';
import * as thunks from '../course-home/data/thunks';
// We should not test `LoadedTabPage` page here, as `TabPage` is used only for passing `passthroughProps`.
jest.mock('./LoadedTabPage', () => function () {
    return _jsx("div", { "data-testid": "LoadedTabPage" });
});
describe('Tab Page', () => {
    const mockData = {
        courseStatus: 'loaded',
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield initializeTestStore({ excludeFetchCourse: true, excludeFetchSequence: true });
    }));
    it('displays loading message', () => {
        render(_jsx(TabPage, Object.assign({}, mockData, { courseStatus: "loading" })));
        expect(screen.getByText('Loading course page…')).toBeInTheDocument();
    });
    it('displays loading failure message', () => {
        render(_jsx(TabPage, Object.assign({}, mockData, { courseStatus: "other" })));
        expect(screen.getByText('There was an error loading this course.')).toBeInTheDocument();
    });
    it('displays Learning Toast', () => __awaiter(void 0, void 0, void 0, function* () {
        const testStore = yield initializeTestStore({ excludeFetchCourse: true, excludeFetchSequence: true }, false);
        render(_jsx(TabPage, Object.assign({}, mockData)), { store: testStore });
        const resetUrl = `${getConfig().LMS_BASE_URL}/api/course_experience/v1/reset_course_deadlines`;
        const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
        axiosMock.onPost(resetUrl).reply(201, {
            link: 'test-toast-link',
            link_text: 'test-toast-body',
            header: 'test-toast-header',
        });
        logUnhandledRequests(axiosMock);
        const getTabDataMock = jest.fn(() => ({
            type: 'MOCK_ACTION',
        }));
        const model = 'outline';
        yield executeThunk(thunks.resetDeadlines('courseId', model, getTabDataMock), testStore.dispatch);
        expect(screen.getByText('test-toast-header')).toBeInTheDocument();
        expect(screen.getByText('test-toast-body')).toBeInTheDocument();
    }));
    it('displays Loaded Tab Page', () => {
        render(_jsx(TabPage, Object.assign({}, mockData)));
        expect(screen.getByTestId('LoadedTabPage')).toBeInTheDocument();
    });
});
//# sourceMappingURL=TabPage.test.js.map