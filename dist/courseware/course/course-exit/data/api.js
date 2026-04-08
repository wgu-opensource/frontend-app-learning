"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCourseRecommendations = getCourseRecommendations;
exports.postUnsubscribeFromGoalReminders = postUnsubscribeFromGoalReminders;
var _frontendPlatform = require("@edx/frontend-platform");
var _auth = require("@edx/frontend-platform/auth");
function filterRecommendationsList({
  data: {
    uuid,
    recommendations
  }
}, {
  data: enrollments
}) {
  const enrollmentRunIds = enrollments.map(({
    courseDetails: {
      courseId
    }
  }) => courseId);
  return recommendations.filter(({
    uuid: recUuid,
    courseRunKeys
  }) => recUuid !== uuid && courseRunKeys.every(key => !enrollmentRunIds.includes(key)));
}
async function getCourseRecommendations(courseKey) {
  const discoveryApiUrl = (0, _frontendPlatform.getConfig)().DISCOVERY_API_BASE_URL;
  if (!discoveryApiUrl) {
    return [];
  }
  const recommendationsUrl = new URL(`${discoveryApiUrl}/api/v1/course_recommendations/${courseKey}?exclude_utm=true`);
  const enrollmentsUrl = new URL(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/enrollment/v1/enrollment`);
  const [recommendationsResponse, enrollmentsResponse] = await Promise.all([(0, _auth.getAuthenticatedHttpClient)().get(recommendationsUrl), (0, _auth.getAuthenticatedHttpClient)().get(enrollmentsUrl)]);
  return filterRecommendationsList((0, _frontendPlatform.camelCaseObject)(recommendationsResponse), (0, _frontendPlatform.camelCaseObject)(enrollmentsResponse));
}
async function postUnsubscribeFromGoalReminders(courseId) {
  const url = new URL(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/course_home/save_course_goal`);
  return (0, _auth.getAuthenticatedHttpClient)().post(url.href, {
    course_id: courseId,
    subscribed_to_reminders: false
  });
}
//# sourceMappingURL=api.js.map