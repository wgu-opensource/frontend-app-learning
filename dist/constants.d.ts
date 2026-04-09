export declare const DECODE_ROUTES: {
    readonly ACCESS_DENIED: "/course/:courseId/access-denied";
    readonly HOME: "/course/:courseId/home";
    readonly LIVE: "/course/:courseId/live";
    readonly DATES: "/course/:courseId/dates";
    readonly DISCUSSION: "/course/:courseId/discussion/:path/*";
    readonly PROGRESS: readonly ["/course/:courseId/progress/:targetUserId/", "/course/:courseId/progress"];
    readonly COURSE_END: "/course/:courseId/course-end";
    readonly COURSEWARE: readonly ["/course/:courseId/:sequenceId/:unitId", "/course/:courseId/:sequenceId", "/course/:courseId", "/preview/course/:courseId/:sequenceId/:unitId", "/preview/course/:courseId/:sequenceId"];
    readonly REDIRECT_HOME: "home/:courseId";
    readonly REDIRECT_SURVEY: "survey/:courseId";
};
export declare const ROUTES: {
    readonly UNSUBSCRIBE: "/goal-unsubscribe/:token";
    readonly PREFERENCES_UNSUBSCRIBE: "/preferences-unsubscribe/:userToken/:updatePatch?";
    readonly REDIRECT: "/redirect/*";
    readonly DASHBOARD: "dashboard";
    readonly ENTERPRISE_LEARNER_DASHBOARD: "enterprise-learner-dashboard";
    readonly CONSENT: "consent";
};
export declare const REDIRECT_MODES: {
    readonly DASHBOARD_REDIRECT: "dashboard-redirect";
    readonly ENTERPRISE_LEARNER_DASHBOARD_REDIRECT: "enterprise-learner-dashboard-redirect";
    readonly CONSENT_REDIRECT: "consent-redirect";
    readonly HOME_REDIRECT: "home-redirect";
    readonly SURVEY_REDIRECT: "survey-redirect";
};
export declare const VERIFIED_MODES: readonly ["professional", "verified", "no-id-professional", "credit", "masters", "executive-education", "paid-executive-education", "paid-bootcamp"];
export declare const AUDIT_MODES: readonly ["audit", "honor", "unpaid-executive-education", "unpaid-bootcamp"];
export declare const ALLOW_UPSELL_MODES: readonly ["audit", "honor"];
export declare const WIDGETS: {
    readonly DISCUSSIONS: "DISCUSSIONS";
    readonly NOTIFICATIONS: "NOTIFICATIONS";
};
export declare const LOADING = "loading";
export declare const LOADED = "loaded";
export declare const FAILED = "failed";
export declare const DENIED = "denied";
export type StatusValue = typeof LOADING | typeof LOADED | typeof FAILED | typeof DENIED;
