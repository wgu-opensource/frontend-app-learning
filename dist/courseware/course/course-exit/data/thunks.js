"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fetchCourseRecommendations;
exports.unsubscribeFromGoalReminders = unsubscribeFromGoalReminders;
var _logging = require("@edx/frontend-platform/logging");
var _slice = require("./slice");
var _api = require("./api");
var _modelStore = require("../../../../generic/model-store");
function fetchCourseRecommendations(courseKey, courseId) {
  return async dispatch => {
    dispatch((0, _slice.fetchCourseRecommendationsRequest)({
      courseId
    }));
    try {
      const recommendations = await (0, _api.getCourseRecommendations)(courseKey);
      dispatch((0, _modelStore.updateModel)({
        modelType: 'coursewareMeta',
        model: {
          id: courseId,
          recommendations
        }
      }));
      dispatch((0, _slice.fetchCourseRecommendationsSuccess)({
        courseId
      }));
    } catch (error) {
      (0, _logging.logError)(error);
      dispatch((0, _slice.fetchCourseRecommendationsFailure)({
        courseId
      }));
    }
  };
}
async function unsubscribeFromGoalReminders(courseId, daysPerWeek, subscribedToReminders) {
  return (0, _api.postUnsubscribeFromGoalReminders)(courseId, daysPerWeek, subscribedToReminders);
}
//# sourceMappingURL=thunks.js.map