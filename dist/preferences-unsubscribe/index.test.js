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
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { AppProvider } from '@edx/frontend-platform/react';
import { ROUTES } from '../constants';
import { initializeTestStore, initializeMockApp, render, screen, waitFor, } from '../setupTest';
import { getUnsubscribeUrl } from './data/api';
import PreferencesUnsubscribe from './index';
import initializeStore from '../store';
import { UserMessagesProvider } from '../generic/user-messages';
initializeMockApp();
jest.mock('@edx/frontend-platform/analytics');
describe('Notification Preferences One Click Unsubscribe', () => {
    let axiosMock;
    let component;
    let store;
    const userToken = '1234';
    const url = getUnsubscribeUrl(userToken);
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield initializeTestStore();
        axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    }));
    beforeEach(() => {
        sendTrackEvent.mockClear();
        axiosMock.reset();
        store = initializeStore();
        component = (_jsx(AppProvider, Object.assign({ store: store, wrapWithRouter: false }, { children: _jsx(UserMessagesProvider, { children: _jsx(MemoryRouter, Object.assign({ initialEntries: [`${`/preferences-unsubscribe/${userToken}/`}`] }, { children: _jsx(Routes, { children: _jsx(Route, { path: ROUTES.PREFERENCES_UNSUBSCRIBE, element: _jsx(PreferencesUnsubscribe, {}) }) }) })) }) })));
    });
    it('tests UI when unsubscribe is successful', () => __awaiter(void 0, void 0, void 0, function* () {
        axiosMock.onGet(url).reply(200, { result: 'success' });
        render(component);
        yield waitFor(() => expect(axiosMock.history.get).toHaveLength(1));
        expect(sendTrackEvent).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId('heading-text')).toHaveTextContent('Unsubscribe successful');
    }));
    it('tests UI when unsubscribe failed', () => __awaiter(void 0, void 0, void 0, function* () {
        axiosMock.onGet(url).reply(400, { result: 'failed' });
        render(component);
        yield waitFor(() => expect(axiosMock.history.get).toHaveLength(1));
        expect(sendTrackEvent).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId('heading-text')).toHaveTextContent('Error unsubscribing from preference');
        expect(sendTrackEvent).toHaveBeenCalledWith('edx.ui.lms.notifications.preferences.unsubscribe', {
            userToken,
        });
    }));
});
//# sourceMappingURL=index.test.js.map