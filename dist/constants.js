"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WIDGETS = exports.VERIFIED_MODES = exports.ROUTES = exports.REDIRECT_MODES = exports.DECODE_ROUTES = void 0;
const DECODE_ROUTES = exports.DECODE_ROUTES = {
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
const ROUTES = exports.ROUTES = {
  UNSUBSCRIBE: '/goal-unsubscribe/:token',
  REDIRECT: '/redirect/*',
  DASHBOARD: 'dashboard',
  ENTERPRISE_LEARNER_DASHBOARD: 'enterprise-learner-dashboard',
  CONSENT: 'consent'
};
const REDIRECT_MODES = exports.REDIRECT_MODES = {
  DASHBOARD_REDIRECT: 'dashboard-redirect',
  ENTERPRISE_LEARNER_DASHBOARD_REDIRECT: 'enterprise-learner-dashboard-redirect',
  CONSENT_REDIRECT: 'consent-redirect',
  HOME_REDIRECT: 'home-redirect',
  SURVEY_REDIRECT: 'survey-redirect'
};
const VERIFIED_MODES = exports.VERIFIED_MODES = ['professional', 'verified', 'no-id-professional', 'credit', 'masters', 'executive-education', 'paid-executive-education', 'paid-bootcamp'];
const WIDGETS = exports.WIDGETS = {
  DISCUSSIONS: 'DISCUSSIONS',
  NOTIFICATIONS: 'NOTIFICATIONS'
};
//# sourceMappingURL=constants.js.map