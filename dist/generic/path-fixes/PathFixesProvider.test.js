import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { MemoryRouter, Route, Routes, useLocation, } from 'react-router-dom';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { initializeMockApp, render } from '../../setupTest';
import PathFixesProvider from '.';
initializeMockApp();
jest.mock('@edx/frontend-platform/analytics');
describe('PathFixesProvider', () => {
    let testLocation;
    beforeAll(() => {
        Object.defineProperty(document, 'referrer', { value: 'https://example.com/foo' });
        testLocation = null;
        sendTrackEvent.mockClear();
    });
    function buildAndRender(path) {
        const LocationComponent = () => {
            testLocation = useLocation();
            return null;
        };
        render(_jsx(MemoryRouter, Object.assign({ initialEntries: [path] }, { children: _jsx(PathFixesProvider, { children: _jsx(Routes, { children: _jsx(Route, { path: "*", element: _jsx(LocationComponent, {}) }) }) }) })));
    }
    it('does not redirect for normal path', () => {
        buildAndRender('/course/course-v1:org+course+run/home');
        expect(testLocation.pathname).toEqual('/course/course-v1:org+course+run/home');
        expect(sendTrackEvent).toHaveBeenCalledTimes(0);
    });
    it('does redirect for path with spaces', () => {
        buildAndRender('/course/course-v1:org course run/home');
        expect(testLocation.pathname).toEqual('/course/course-v1:org+course+run/home');
        expect(sendTrackEvent).toHaveBeenCalledWith('edx.ui.lms.path_fixed', {
            new_path: '/course/course-v1:org+course+run/home',
            old_path: '/course/course-v1:org course run/home',
            referrer: 'https://example.com/foo',
            search: '',
        });
    });
    it('does not change search part of URL', () => {
        buildAndRender('/course/course-v1:org course run/home page?donuts=yes please');
        expect(testLocation.pathname).toEqual('/course/course-v1:org+course+run/home+page');
        expect(testLocation.search).toEqual('?donuts=yes please');
        expect(sendTrackEvent).toHaveBeenCalledWith('edx.ui.lms.path_fixed', {
            new_path: '/course/course-v1:org+course+run/home+page',
            old_path: '/course/course-v1:org course run/home page',
            referrer: 'https://example.com/foo',
            search: '?donuts=yes please',
        });
    });
});
//# sourceMappingURL=PathFixesProvider.test.js.map