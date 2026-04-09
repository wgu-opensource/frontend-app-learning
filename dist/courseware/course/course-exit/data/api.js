var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getConfig, camelCaseObject } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
function filterRecommendationsList({ data: { uuid, recommendations, }, }, { data: enrollments, }) {
    const enrollmentRunIds = enrollments.map(({ courseDetails: { courseId, }, }) => courseId);
    return recommendations.filter(({ uuid: recUuid, courseRunKeys }) => (recUuid !== uuid && courseRunKeys.every((key) => !enrollmentRunIds.includes(key))));
}
export function getCourseRecommendations(courseKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const discoveryApiUrl = getConfig().DISCOVERY_API_BASE_URL;
        if (!discoveryApiUrl) {
            return [];
        }
        const recommendationsUrl = new URL(`${discoveryApiUrl}/api/v1/course_recommendations/${courseKey}?exclude_utm=true`);
        const enrollmentsUrl = new URL(`${getConfig().LMS_BASE_URL}/api/enrollment/v1/enrollment`);
        const [recommendationsResponse, enrollmentsResponse] = yield Promise.all([
            getAuthenticatedHttpClient().get(recommendationsUrl),
            getAuthenticatedHttpClient().get(enrollmentsUrl),
        ]);
        return filterRecommendationsList(camelCaseObject(recommendationsResponse), camelCaseObject(enrollmentsResponse));
    });
}
export function postUnsubscribeFromGoalReminders(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URL(`${getConfig().LMS_BASE_URL}/api/course_home/save_course_goal`);
        return getAuthenticatedHttpClient().post(url.href, {
            course_id: courseId,
            subscribed_to_reminders: false,
        });
    });
}
//# sourceMappingURL=api.js.map