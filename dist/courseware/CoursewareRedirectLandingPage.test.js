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
import { MemoryRouter as Router } from 'react-router-dom';
import { mergeConfig } from '@edx/frontend-platform';
import { render, initializeMockApp } from '../setupTest';
import CoursewareRedirectLandingPage from './CoursewareRedirectLandingPage';
const redirectUrl = jest.fn();
jest.mock('@edx/frontend-platform/analytics');
jest.mock('../decode-page-route', () => jest.fn(({ children }) => _jsx("div", { children: children })));
describe('CoursewareRedirectLandingPage', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield initializeMockApp();
        mergeConfig({
            ENTERPRISE_LEARNER_PORTAL_URL: 'http://localhost:8734',
        }, 'Add configs for URLs');
        delete global.location;
        global.location = { assign: redirectUrl };
    }));
    it('Redirects to correct consent URL', () => {
        render(_jsx(Router, Object.assign({ initialEntries: ['/consent/?consentPath=%2Fgrant_data_sharing_consent'] }, { children: _jsx(CoursewareRedirectLandingPage, {}) })));
        expect(redirectUrl).toHaveBeenCalledWith('http://localhost:18000/grant_data_sharing_consent');
    });
    it('Redirects to correct consent URL', () => {
        render(_jsx(Router, Object.assign({ initialEntries: ['/home/course-v1:edX+DemoX+Demo_Course'] }, { children: _jsx(CoursewareRedirectLandingPage, {}) })));
        expect(redirectUrl).toHaveBeenCalledWith('/course/course-v1:edX+DemoX+Demo_Course/home');
    });
    it('Redirects to correct enterprise dashboard URL', () => {
        render(_jsx(Router, Object.assign({ initialEntries: ['/enterprise-learner-dashboard'] }, { children: _jsx(CoursewareRedirectLandingPage, {}) })));
        expect(redirectUrl).toHaveBeenCalledWith('http://localhost:8734');
    });
});
//# sourceMappingURL=CoursewareRedirectLandingPage.test.js.map