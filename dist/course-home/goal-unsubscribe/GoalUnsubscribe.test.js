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
import { MemoryRouter, Route, Routes, } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { AppProvider } from '@edx/frontend-platform/react';
import { render, screen } from '@testing-library/react';
import GoalUnsubscribe from './GoalUnsubscribe';
import { act, initializeMockApp } from '../../setupTest';
import initializeStore from '../../store';
import { UserMessagesProvider } from '../../generic/user-messages';
initializeMockApp();
jest.mock('@edx/frontend-platform/analytics');
describe('GoalUnsubscribe', () => {
    let axiosMock;
    let store;
    let component;
    const unsubscribeUrl = `${getConfig().LMS_BASE_URL}/api/course_home/unsubscribe_from_course_goal/TOKEN`;
    beforeEach(() => {
        axiosMock = new MockAdapter(getAuthenticatedHttpClient());
        store = initializeStore();
        component = (_jsx(AppProvider, Object.assign({ store: store, wrapWithRouter: false }, { children: _jsx(UserMessagesProvider, { children: _jsx(MemoryRouter, Object.assign({ initialEntries: ['/goal-unsubscribe/TOKEN'] }, { children: _jsx(Routes, { children: _jsx(Route, { path: "/goal-unsubscribe/:token", element: _jsx(GoalUnsubscribe, {}) }) }) })) }) })));
    });
    it('starts with a spinner', () => {
        render(component);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });
    it('loads a real token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = { course_title: 'My Sample Course' };
        axiosMock.onPost(unsubscribeUrl).reply(200, response);
        yield act(() => __awaiter(void 0, void 0, void 0, function* () { return render(component); }));
        expect(screen.getByText('You’ve unsubscribed from goal reminders')).toBeInTheDocument();
        expect(screen.getByText(/your goal for My Sample Course/)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Go to dashboard' }))
            .toHaveAttribute('href', 'http://localhost:18000/dashboard');
    }));
    it('loads a bad token with an error page', () => __awaiter(void 0, void 0, void 0, function* () {
        axiosMock.onPost(unsubscribeUrl).reply(404, {});
        yield act(() => __awaiter(void 0, void 0, void 0, function* () { return render(component); }));
        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Go to dashboard' }))
            .toHaveAttribute('href', 'http://localhost:18000/dashboard');
        expect(screen.getByRole('link', { name: 'contact support' }))
            .toHaveAttribute('href', 'http://localhost:18000/contact');
    }));
});
//# sourceMappingURL=GoalUnsubscribe.test.js.map