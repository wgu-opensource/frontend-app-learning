export default function initializeStore(): import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<{
    models: {};
    courseware: {
        courseId: null;
        courseStatus: string;
        sequenceId: null;
        sequenceMightBeUnit: boolean;
        sequenceStatus: string;
        courseOutline: {};
        coursewareOutlineSidebarSettings: {};
        courseOutlineStatus: string;
        courseOutlineShouldUpdate: boolean;
    };
    courseHome: {
        courseStatus: string;
        courseId: null;
        proctoringPanelStatus: string;
        toastBodyText: null;
        toastBodyLink: null;
        toastHeader: string;
        showSearch: boolean;
    };
    learningAssistant: unknown;
    specialExams: unknown;
    recommendations: {
        recommendationsStatus: string;
    };
    tours: {
        showCoursewareTour: boolean;
        showExistingUserCourseHomeTour: boolean;
        showNewUserCourseHomeModal: boolean;
        showNewUserCourseHomeTour: boolean;
        toursEnabled: boolean;
    };
    plugins: {};
}, import("redux").AnyAction, import("@reduxjs/toolkit").MiddlewareArray<[import("@reduxjs/toolkit").ThunkMiddleware<{
    models: {};
    courseware: {
        courseId: null;
        courseStatus: string;
        sequenceId: null;
        sequenceMightBeUnit: boolean;
        sequenceStatus: string;
        courseOutline: {};
        coursewareOutlineSidebarSettings: {};
        courseOutlineStatus: string;
        courseOutlineShouldUpdate: boolean;
    };
    courseHome: {
        courseStatus: string;
        courseId: null;
        proctoringPanelStatus: string;
        toastBodyText: null;
        toastBodyLink: null;
        toastHeader: string;
        showSearch: boolean;
    };
    learningAssistant: unknown;
    specialExams: unknown;
    recommendations: {
        recommendationsStatus: string;
    };
    tours: {
        showCoursewareTour: boolean;
        showExistingUserCourseHomeTour: boolean;
        showNewUserCourseHomeModal: boolean;
        showNewUserCourseHomeTour: boolean;
        toursEnabled: boolean;
    };
    plugins: {};
}, import("redux").AnyAction, undefined>]>>;
export declare const store: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<{
    models: {};
    courseware: {
        courseId: null;
        courseStatus: string;
        sequenceId: null;
        sequenceMightBeUnit: boolean;
        sequenceStatus: string;
        courseOutline: {};
        coursewareOutlineSidebarSettings: {};
        courseOutlineStatus: string;
        courseOutlineShouldUpdate: boolean;
    };
    courseHome: {
        courseStatus: string;
        courseId: null;
        proctoringPanelStatus: string;
        toastBodyText: null;
        toastBodyLink: null;
        toastHeader: string;
        showSearch: boolean;
    };
    learningAssistant: unknown;
    specialExams: unknown;
    recommendations: {
        recommendationsStatus: string;
    };
    tours: {
        showCoursewareTour: boolean;
        showExistingUserCourseHomeTour: boolean;
        showNewUserCourseHomeModal: boolean;
        showNewUserCourseHomeTour: boolean;
        toursEnabled: boolean;
    };
    plugins: {};
}, import("redux").AnyAction, import("@reduxjs/toolkit").MiddlewareArray<[import("@reduxjs/toolkit").ThunkMiddleware<{
    models: {};
    courseware: {
        courseId: null;
        courseStatus: string;
        sequenceId: null;
        sequenceMightBeUnit: boolean;
        sequenceStatus: string;
        courseOutline: {};
        coursewareOutlineSidebarSettings: {};
        courseOutlineStatus: string;
        courseOutlineShouldUpdate: boolean;
    };
    courseHome: {
        courseStatus: string;
        courseId: null;
        proctoringPanelStatus: string;
        toastBodyText: null;
        toastBodyLink: null;
        toastHeader: string;
        showSearch: boolean;
    };
    learningAssistant: unknown;
    specialExams: unknown;
    recommendations: {
        recommendationsStatus: string;
    };
    tours: {
        showCoursewareTour: boolean;
        showExistingUserCourseHomeTour: boolean;
        showNewUserCourseHomeModal: boolean;
        showNewUserCourseHomeTour: boolean;
        toursEnabled: boolean;
    };
    plugins: {};
}, import("redux").AnyAction, undefined>]>>;
export type RootState = ReturnType<typeof store.getState>;
