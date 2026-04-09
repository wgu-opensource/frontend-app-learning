export function initializeMockApp(): {
    loggingService: any;
    authService: any;
};
export function loadUnit(message?: {
    type: string;
    payload: {
        height: number;
    };
}): void;
export function logUnhandledRequests(axiosMock: any): void;
export function initializeTestStore(options?: {}, overrideStore?: boolean): Promise<import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<{
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
}, import("redux").AnyAction, [import("@reduxjs/toolkit").ThunkMiddleware<{
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
}, import("redux").AnyAction, undefined>]>>;
export namespace authenticatedUser {
    const userId: string;
    const username: string;
    const roles: never[];
    const administrator: boolean;
}
export namespace messageEvent {
    const type: string;
    namespace payload {
        const height: number;
    }
}
export * from "@testing-library/react";
export function render(ui: any, { store, wrapWithRouter, ...renderOptions }?: {
    store?: null | undefined;
    wrapWithRouter?: boolean | undefined;
}): import("@testing-library/react").RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
