export const fetchCourseRecommendationsRequest: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, `recommendations/${string}`> | import("@reduxjs/toolkit").ActionCreatorWithoutPayload<`recommendations/${string}`>;
export const fetchCourseRecommendationsSuccess: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, `recommendations/${string}`> | import("@reduxjs/toolkit").ActionCreatorWithoutPayload<`recommendations/${string}`>;
export const fetchCourseRecommendationsFailure: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, `recommendations/${string}`> | import("@reduxjs/toolkit").ActionCreatorWithoutPayload<`recommendations/${string}`>;
export const reducer: import("redux").Reducer<{
    recommendationsStatus: string;
}, import("redux").AnyAction>;
