"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCourseRecommendations = getCourseRecommendations;
exports.postUnsubscribeFromGoalReminders = postUnsubscribeFromGoalReminders;
var _frontendPlatform = require("@edx/frontend-platform");
var _auth = require("@edx/frontend-platform/auth");
function filterRecommendationsList(_ref, _ref2) {
  let {
    data: {
      uuid,
      recommendations
    }
  } = _ref;
  let {
    data: enrollments
  } = _ref2;
  const enrollmentRunIds = enrollments.map(_ref3 => {
    let {
      courseDetails: {
        courseId
      }
    } = _ref3;
    return courseId;
  });
  return recommendations.filter(_ref4 => {
    let {
      uuid: recUuid,
      courseRunKeys
    } = _ref4;
    return recUuid !== uuid && courseRunKeys.every(key => !enrollmentRunIds.includes(key));
  });
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