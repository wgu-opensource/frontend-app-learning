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
import { initializeTestStore, render, screen, waitFor, getByText, logUnhandledRequests, } from '../setupTest';
import InstructorToolbar from './index';
const originalConfig = jest.requireActual('@edx/frontend-platform').getConfig();
jest.mock('@edx/frontend-platform', () => (Object.assign(Object.assign({}, jest.requireActual('@edx/frontend-platform')), { getConfig: jest.fn() })));
getConfig.mockImplementation(() => originalConfig);
describe('Instructor Toolbar', () => {
    let courseware;
    let models;
    let mockData;
    let axiosMock;
    let masqueradeUrl;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const store = yield initializeTestStore();
        courseware = store.getState().courseware;
        models = store.getState().models;
        axiosMock = new MockAdapter(getAuthenticatedHttpClient());
        masqueradeUrl = `${getConfig().LMS_BASE_URL}/courses/${courseware.courseId}/masquerade`;
    }));
    beforeEach(() => {
        mockData = {
            courseId: courseware.courseId,
            unitId: Object.values(models.units)[0].id,
        };
        axiosMock.reset();
        axiosMock.onGet(masqueradeUrl).reply(200, { success: true });
        logUnhandledRequests(axiosMock);
    });
    it('sends query to masquerade and does not display alerts by default', () => __awaiter(void 0, void 0, void 0, function* () {
        render(_jsx(InstructorToolbar, Object.assign({}, mockData)));
        yield waitFor(() => expect(axiosMock.history.get).toHaveLength(1));
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    }));
    it('displays masquerade error', () => __awaiter(void 0, void 0, void 0, function* () {
        axiosMock.reset();
        axiosMock.onGet(masqueradeUrl).reply(200, { success: false });
        render(_jsx(InstructorToolbar, Object.assign({}, mockData)));
        yield waitFor(() => expect(axiosMock.history.get).toHaveLength(1));
        expect(screen.getByRole('alert')).toHaveTextContent('Unable to get masquerade options');
    }));
    it('displays links to view course in available services', () => {
        const config = Object.assign({}, originalConfig);
        config.INSIGHTS_BASE_URL = 'http://localhost:18100';
        getConfig.mockImplementation(() => config);
        render(_jsx(InstructorToolbar, Object.assign({}, mockData)));
        const linksContainer = screen.getByText('View course in:').parentElement;
        ['Studio', 'Insights'].forEach(service => {
            expect(getByText(linksContainer, service).getAttribute('href')).toMatch(/http.*/);
        });
    });
    it('does not display links if there are no services available', () => {
        const config = Object.assign({}, originalConfig);
        config.STUDIO_BASE_URL = undefined;
        getConfig.mockImplementation(() => config);
        render(_jsx(InstructorToolbar, Object.assign({}, mockData, { unitId: null })));
        expect(screen.queryByText('View course in:')).not.toBeInTheDocument();
    });
});
//# sourceMappingURL=InstructorToolbar.test.js.map