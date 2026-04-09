export const disableCourseHomeTour: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"tours/disableCourseHomeTour">;
export const disableCoursewareTour: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"tours/disableCoursewareTour">;
export const disableNewUserCourseHomeModal: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"tours/disableNewUserCourseHomeModal">;
export const launchCourseHomeTour: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"tours/launchCourseHomeTour">;
export const setTourData: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "tours/setTourData">;
export const reducer: import("redux").Reducer<{
    showCoursewareTour: boolean;
    showExistingUserCourseHomeTour: boolean;
    showNewUserCourseHomeModal: boolean;
    showNewUserCourseHomeTour: boolean;
    toursEnabled: boolean;
}, import("redux").AnyAction>;
