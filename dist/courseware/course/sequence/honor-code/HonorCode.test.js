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
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import MockAdapter from 'axios-mock-adapter';
import { Factory } from 'rosie';
import { authenticatedUser, fireEvent, initializeMockApp, initializeTestStore, render, screen, waitFor, } from '../../../../setupTest';
import HonorCode from './HonorCode';
const mockNavigate = jest.fn();
initializeMockApp();
jest.mock('react-router-dom', () => (Object.assign(Object.assign({}, jest.requireActual('react-router-dom')), { useNavigate: () => mockNavigate })));
describe('Honor Code', () => {
    let axiosMock;
    let store;
    let honorCodePostUrl;
    const mockData = {};
    function setupStoreState(courseHomeMetaOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (courseHomeMetaOptions) {
                const courseHomeMetadata = Factory.build('courseHomeMetadata', courseHomeMetaOptions);
                store = yield initializeTestStore({ courseHomeMetadata });
            }
            else {
                store = yield initializeTestStore();
            }
            const storeState = store.getState();
            axiosMock = new MockAdapter(getAuthenticatedHttpClient());
            mockData.courseId = storeState.courseware.courseId;
            honorCodePostUrl = `${getConfig().LMS_BASE_URL}/api/agreements/v1/integrity_signature/${mockData.courseId}`;
        });
    }
    it('cancel button links to course home ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield setupStoreState();
        render(_jsx(HonorCode, Object.assign({}, mockData)), { wrapWithRouter: true });
        const cancelButton = screen.getByText('Cancel');
        fireEvent.click(cancelButton);
        expect(mockNavigate).toHaveBeenCalledWith(`/course/${mockData.courseId}/home`);
    }));
    it('calls to save integrity_signature when agreeing', () => __awaiter(void 0, void 0, void 0, function* () {
        yield setupStoreState({ username: authenticatedUser.username });
        render(_jsx(HonorCode, Object.assign({}, mockData)), { wrapWithRouter: true });
        const agreeButton = screen.getByText('I agree');
        fireEvent.click(agreeButton);
        yield waitFor(() => {
            expect(axiosMock.history.post.length).toBe(1);
            expect(axiosMock.history.post[0].url).toBe(honorCodePostUrl);
        });
    }));
    it('still calls to save integrity_signature if masquerading', () => __awaiter(void 0, void 0, void 0, function* () {
        yield setupStoreState({
            is_staff: false,
            original_user_is_staff: true,
            username: authenticatedUser.username,
        });
        render(_jsx(HonorCode, Object.assign({}, mockData)), { wrapWithRouter: true });
        const agreeButton = screen.getByText('I agree');
        fireEvent.click(agreeButton);
        yield waitFor(() => {
            expect(axiosMock.history.post.length).toBe(1);
            expect(axiosMock.history.post[0].url).toBe(honorCodePostUrl);
        });
    }));
    it('will not call to save integrity_signature if masquerading a specific student', () => __awaiter(void 0, void 0, void 0, function* () {
        yield setupStoreState({
            is_staff: false,
            original_user_is_staff: true,
            username: 'otheruser',
        });
        render(_jsx(HonorCode, Object.assign({}, mockData)), { wrapWithRouter: true });
        const agreeButton = screen.getByText('I agree');
        fireEvent.click(agreeButton);
        yield waitFor(() => {
            expect(axiosMock.history.post.length).toBe(0);
        });
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        axiosMock.resetHistory();
    }));
});
//# sourceMappingURL=HonorCode.test.js.map