import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { PageWrap } from '@edx/frontend-platform/react';
import PageLoading from '../generic/PageLoading';
import DecodePageRoute from '../decode-page-route';
import { DECODE_ROUTES, REDIRECT_MODES, ROUTES } from '../constants';
import RedirectPage from './RedirectPage';
const CoursewareRedirectLandingPage = () => (_jsxs("div", Object.assign({ className: "flex-grow-1" }, { children: [_jsx(PageLoading, { srMessage: (_jsx(FormattedMessage, { id: "learn.redirect.interstitial.message", description: "The screen-reader message when a page is about to redirect", defaultMessage: "Redirecting..." })) }), _jsxs(Routes, { children: [_jsx(Route, { path: DECODE_ROUTES.REDIRECT_SURVEY, element: _jsx(DecodePageRoute, { children: _jsx(RedirectPage, { pattern: "/courses/:courseId/survey", mode: REDIRECT_MODES.SURVEY_REDIRECT }) }) }), _jsx(Route, { path: ROUTES.DASHBOARD, element: _jsx(PageWrap, { children: _jsx(RedirectPage, { pattern: "/dashboard", mode: REDIRECT_MODES.DASHBOARD_REDIRECT }) }) }), _jsx(Route, { path: ROUTES.ENTERPRISE_LEARNER_DASHBOARD, element: _jsx(PageWrap, { children: _jsx(RedirectPage, { mode: REDIRECT_MODES.ENTERPRISE_LEARNER_DASHBOARD_REDIRECT }) }) }), _jsx(Route, { path: ROUTES.CONSENT, element: _jsx(PageWrap, { children: _jsx(RedirectPage, { mode: REDIRECT_MODES.CONSENT_REDIRECT }) }) }), _jsx(Route, { path: DECODE_ROUTES.REDIRECT_HOME, element: _jsx(DecodePageRoute, { children: _jsx(RedirectPage, { pattern: "/course/:courseId/home", mode: REDIRECT_MODES.HOME_REDIRECT }) }) })] })] })));
export default CoursewareRedirectLandingPage;
//# sourceMappingURL=CoursewareRedirectLandingPage.js.map