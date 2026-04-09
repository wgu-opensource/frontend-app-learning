export const fetchProctoringInfoResolved: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"course-home/fetchProctoringInfoResolved">;
export const fetchTabDenied: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "course-home/fetchTabDenied">;
export const fetchTabFailure: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "course-home/fetchTabFailure">;
export const fetchTabRequest: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "course-home/fetchTabRequest">;
export const fetchTabSuccess: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "course-home/fetchTabSuccess">;
export const setCallToActionToast: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "course-home/setCallToActionToast">;
export const setShowSearch: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "course-home/setShowSearch">;
export const reducer: import("redux").Reducer<{
    courseStatus: string;
    courseId: null;
    proctoringPanelStatus: string;
    toastBodyText: null;
    toastBodyLink: null;
    toastHeader: string;
    showSearch: boolean;
}, import("redux").AnyAction>;
