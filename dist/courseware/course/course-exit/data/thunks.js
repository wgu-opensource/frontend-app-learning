var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { logError } from '@edx/frontend-platform/logging';
import { fetchCourseRecommendationsFailure, fetchCourseRecommendationsRequest, fetchCourseRecommendationsSuccess, } from './slice';
import { getCourseRecommendations, postUnsubscribeFromGoalReminders, } from './api';
import { updateModel } from '../../../../generic/model-store';
export default function fetchCourseRecommendations(courseKey, courseId) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        dispatch(fetchCourseRecommendationsRequest({ courseId }));
        try {
            const recommendations = yield getCourseRecommendations(courseKey);
            dispatch(updateModel({
                modelType: 'coursewareMeta',
                model: {
                    id: courseId,
                    recommendations,
                },
            }));
            dispatch(fetchCourseRecommendationsSuccess({ courseId }));
        }
        catch (error) {
            logError(error);
            dispatch(fetchCourseRecommendationsFailure({ courseId }));
        }
    });
}
export function unsubscribeFromGoalReminders(courseId, daysPerWeek, subscribedToReminders) {
    return __awaiter(this, void 0, void 0, function* () {
        return postUnsubscribeFromGoalReminders(courseId, daysPerWeek, subscribedToReminders);
    });
}
//# sourceMappingURL=thunks.js.map