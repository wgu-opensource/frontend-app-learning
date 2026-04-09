import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getConfig } from '@edx/frontend-platform';
import RedirectPage from './RedirectPage';
import { REDIRECT_MODES } from '../constants';
const BASE_URL = getConfig().LMS_BASE_URL;
jest.mock('react-router-dom', () => (Object.assign(Object.assign({}, jest.requireActual('react-router-dom')), { useParams: () => ({
        courseId: 'course-id-123',
    }), useLocation: () => ({
        search: '?consentPath=/some-path',
    }), useSearchParams: () => [new URLSearchParams('?consentPath=/some-path'), () => { }] })));
describe('RedirectPage component', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'location', {
            writable: true,
            value: { assign: jest.fn() },
        });
        jest.clearAllMocks();
    });
    it('should handle DASHBOARD_REDIRECT correctly', () => {
        render(_jsx(MemoryRouter, { children: _jsx(RedirectPage, { mode: REDIRECT_MODES.DASHBOARD_REDIRECT, pattern: "/dashboard" }) }));
        expect(global.location.assign).toHaveBeenCalledWith(`${BASE_URL}/dashboard?consentPath=/some-path`);
    });
    it('should handle CONSENT_REDIRECT correctly', () => {
        render(_jsx(MemoryRouter, { children: _jsx(RedirectPage, { mode: REDIRECT_MODES.CONSENT_REDIRECT }) }));
        expect(global.location.assign).toHaveBeenCalledWith(`${BASE_URL}/some-path`);
    });
    it('should handle HOME_REDIRECT correctly', () => {
        render(_jsx(MemoryRouter, { children: _jsx(RedirectPage, { mode: REDIRECT_MODES.HOME_REDIRECT, pattern: "/course/:courseId/home" }) }));
        expect(global.location.assign).toHaveBeenCalledWith('/course/course-id-123/home');
    });
    it('should handle the default case correctly', () => {
        render(_jsx(MemoryRouter, { children: _jsx(RedirectPage, { pattern: "/default/:courseId" }) }));
        expect(global.location.assign).toHaveBeenCalledWith(`${BASE_URL}/default/course-id-123`);
    });
});
//# sourceMappingURL=RedirectPage.test.js.map