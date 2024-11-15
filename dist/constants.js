"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROUTES = exports.REDIRECT_MODES = exports.DECODE_ROUTES = void 0;
const DECODE_ROUTES = {
  ACCESS_DENIED: '/course/:courseId/access-denied',
  HOME: '/course/:courseId/home',
  LIVE: '/course/:courseId/live',
  DATES: '/course/:courseId/dates',
  DISCUSSION: '/course/:courseId/discussion/:path/*',
  PROGRESS: ['/course/:courseId/progress/:targetUserId/', '/course/:courseId/progress'],
  COURSE_END: '/course/:courseId/course-end',
  COURSEWARE: ['/course/:courseId/:sequenceId/:unitId', '/course/:courseId/:sequenceId', '/course/:courseId'],
  REDIRECT_HOME: 'home/:courseId',
  REDIRECT_SURVEY: 'survey/:courseId'
};
exports.DECODE_ROUTES = DECODE_ROUTES;
const ROUTES = {
  UNSUBSCRIBE: '/goal-unsubscribe/:token',
  REDIRECT: '/redirect/*',
  DASHBOARD: 'dashboard',
  CONSENT: 'consent'
};
exports.ROUTES = ROUTES;
const REDIRECT_MODES = {
  DASHBOARD_REDIRECT: 'dashboard-redirect',
  CONSENT_REDIRECT: 'consent-redirect',
  HOME_REDIRECT: 'home-redirect',
  SURVEY_REDIRECT: 'survey-redirect'
};
exports.REDIRECT_MODES = REDIRECT_MODES;
//# sourceMappingURL=constants.js.map