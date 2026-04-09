import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { APP_INIT_ERROR, APP_READY, subscribe, initialize, mergeConfig, getConfig, } from '@edx/frontend-platform';
import { AppProvider, ErrorPage, PageWrap } from '@edx/frontend-platform/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { fetchDiscussionTab, fetchLiveTab } from './course-home/data/thunks';
import DiscussionTab from './course-home/discussion-tab/DiscussionTab';
import messages from './i18n';
import { UserMessagesProvider } from './generic/user-messages';
import './index.scss';
import OutlineTab from './course-home/outline-tab';
import { CourseExit } from './courseware/course/course-exit';
import CoursewareContainer from './courseware';
import CoursewareRedirectLandingPage from './courseware/CoursewareRedirectLandingPage';
import DatesTab from './course-home/dates-tab';
import GoalUnsubscribe from './course-home/goal-unsubscribe';
import ProgressTab from './course-home/progress-tab/ProgressTab';
import { TabContainer } from './tab-page';
import { fetchDatesTab, fetchOutlineTab, fetchProgressTab } from './course-home/data';
import { fetchCourse } from './courseware/data';
import { store } from './store';
import NoticesProvider from './generic/notices';
import PathFixesProvider from './generic/path-fixes';
import LiveTab from './course-home/live-tab/LiveTab';
import CourseAccessErrorPage from './generic/CourseAccessErrorPage';
import DecodePageRoute from './decode-page-route';
import { DECODE_ROUTES, ROUTES } from './constants';
import PreferencesUnsubscribe from './preferences-unsubscribe';
import PageNotFound from './generic/PageNotFound';
subscribe(APP_READY, () => {
    const root = createRoot(document.getElementById('root'));
    root.render(_jsx(StrictMode, { children: _jsxs(AppProvider, Object.assign({ store: store }, { children: [_jsx(Helmet, { children: _jsx("link", { rel: "shortcut icon", href: getConfig().FAVICON_URL, type: "image/x-icon" }) }), _jsx(PathFixesProvider, { children: _jsx(NoticesProvider, { children: _jsx(UserMessagesProvider, { children: _jsx("div", Object.assign({ className: "app-container" }, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "*", element: _jsx(PageWrap, { children: _jsx(PageNotFound, {}) }) }), _jsx(Route, { path: ROUTES.UNSUBSCRIBE, element: _jsx(PageWrap, { children: _jsx(GoalUnsubscribe, {}) }) }), _jsx(Route, { path: ROUTES.REDIRECT, element: _jsx(PageWrap, { children: _jsx(CoursewareRedirectLandingPage, {}) }) }), _jsx(Route, { path: ROUTES.PREFERENCES_UNSUBSCRIBE, element: _jsx(PageWrap, { children: _jsx(PreferencesUnsubscribe, {}) }) }), _jsx(Route, { path: DECODE_ROUTES.ACCESS_DENIED, element: _jsx(DecodePageRoute, { children: _jsx(CourseAccessErrorPage, {}) }) }), _jsx(Route, { path: DECODE_ROUTES.HOME, element: (_jsx(DecodePageRoute, { children: _jsx(TabContainer, Object.assign({ tab: "outline", fetch: fetchOutlineTab, slice: "courseHome" }, { children: _jsx(OutlineTab, {}) })) })) }), _jsx(Route, { path: DECODE_ROUTES.LIVE, element: (_jsx(DecodePageRoute, { children: _jsx(TabContainer, Object.assign({ tab: "lti_live", fetch: fetchLiveTab, slice: "courseHome" }, { children: _jsx(LiveTab, {}) })) })) }), _jsx(Route, { path: DECODE_ROUTES.DATES, element: (_jsx(DecodePageRoute, { children: _jsx(TabContainer, Object.assign({ tab: "dates", fetch: fetchDatesTab, slice: "courseHome" }, { children: _jsx(DatesTab, {}) })) })) }), _jsx(Route, { path: DECODE_ROUTES.DISCUSSION, element: (_jsx(DecodePageRoute, { children: _jsx(TabContainer, Object.assign({ tab: "discussion", fetch: fetchDiscussionTab, slice: "courseHome" }, { children: _jsx(DiscussionTab, {}) })) })) }), DECODE_ROUTES.PROGRESS.map((route) => (_jsx(Route, { path: route, element: (_jsx(DecodePageRoute, { children: _jsx(TabContainer, Object.assign({ tab: "progress", fetch: fetchProgressTab, slice: "courseHome", isProgressTab: true }, { children: _jsx(ProgressTab, {}) })) })) }, route))), _jsx(Route, { path: DECODE_ROUTES.COURSE_END, element: (_jsx(DecodePageRoute, { children: _jsx(TabContainer, Object.assign({ tab: "courseware", fetch: fetchCourse, slice: "courseware" }, { children: _jsx(CourseExit, {}) })) })) }), DECODE_ROUTES.COURSEWARE.map((route) => (_jsx(Route, { path: route, element: (_jsx(DecodePageRoute, { children: _jsx(CoursewareContainer, {}) })) }, route)))] }) })) }) }) })] })) }));
});
subscribe(APP_INIT_ERROR, (error) => {
    const root = createRoot(document.getElementById('root'));
    root.render(_jsx(StrictMode, { children: _jsx(ErrorPage, { message: error.message }) }));
});
initialize({
    handlers: {
        config: () => {
            /* istanbul ignore next */
            mergeConfig({
                CONTACT_URL: process.env.CONTACT_URL || null,
                CREDENTIALS_BASE_URL: process.env.CREDENTIALS_BASE_URL || null,
                CREDIT_HELP_LINK_URL: process.env.CREDIT_HELP_LINK_URL || null,
                DISCUSSIONS_MFE_BASE_URL: process.env.DISCUSSIONS_MFE_BASE_URL || null,
                DISCOUNT_CODE_INFO_URL: process.env.DISCOUNT_CODE_INFO_URL || null,
                ENTERPRISE_LEARNER_PORTAL_HOSTNAME: process.env.ENTERPRISE_LEARNER_PORTAL_HOSTNAME || null,
                ENTERPRISE_LEARNER_PORTAL_URL: process.env.ENTERPRISE_LEARNER_PORTAL_URL || null,
                ENABLE_JUMPNAV: process.env.ENABLE_JUMPNAV || null,
                ENABLE_NOTICES: process.env.ENABLE_NOTICES || null,
                INSIGHTS_BASE_URL: process.env.INSIGHTS_BASE_URL || null,
                SEARCH_CATALOG_URL: process.env.SEARCH_CATALOG_URL || null,
                SOCIAL_UTM_MILESTONE_CAMPAIGN: process.env.SOCIAL_UTM_MILESTONE_CAMPAIGN || null,
                STUDIO_BASE_URL: process.env.STUDIO_BASE_URL || null,
                SUPPORT_URL: process.env.SUPPORT_URL || null,
                SUPPORT_URL_CALCULATOR_MATH: process.env.SUPPORT_URL_CALCULATOR_MATH || null,
                SUPPORT_URL_ID_VERIFICATION: process.env.SUPPORT_URL_ID_VERIFICATION || null,
                SUPPORT_URL_VERIFIED_CERTIFICATE: process.env.SUPPORT_URL_VERIFIED_CERTIFICATE || null,
                TERMS_OF_SERVICE_URL: process.env.TERMS_OF_SERVICE_URL || null,
                TWITTER_HASHTAG: process.env.TWITTER_HASHTAG || null,
                TWITTER_URL: process.env.TWITTER_URL || null,
                LEGACY_THEME_NAME: process.env.LEGACY_THEME_NAME || null,
                EXAMS_BASE_URL: process.env.EXAMS_BASE_URL || null,
                PROCTORED_EXAM_FAQ_URL: process.env.PROCTORED_EXAM_FAQ_URL || null,
                PROCTORED_EXAM_RULES_URL: process.env.PROCTORED_EXAM_RULES_URL || null,
                CHAT_RESPONSE_URL: process.env.CHAT_RESPONSE_URL || null,
                PRIVACY_POLICY_URL: process.env.PRIVACY_POLICY_URL || null,
                SHOW_UNGRADED_ASSIGNMENT_PROGRESS: process.env.SHOW_UNGRADED_ASSIGNMENT_PROGRESS || false,
                ENABLE_XPERT_AUDIT: process.env.ENABLE_XPERT_AUDIT || false,
            }, 'LearnerAppConfig');
        },
    },
    messages,
});
//# sourceMappingURL=index.js.map