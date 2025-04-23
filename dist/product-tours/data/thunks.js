"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeNewUserCourseHomeModal = closeNewUserCourseHomeModal;
exports.endCourseHomeTour = endCourseHomeTour;
exports.endCoursewareTour = endCoursewareTour;
exports.fetchTourData = fetchTourData;
var _logging = require("@edx/frontend-platform/logging");
var _api = require("./api");
var _slice = require("./slice");
function closeNewUserCourseHomeModal() {
  return async dispatch => dispatch((0, _slice.disableNewUserCourseHomeModal)());
}
function endCourseHomeTour(username) {
  return async dispatch => {
    try {
      await (0, _api.patchTourData)(username, {
        course_home_tour_status: 'no-tour'
      });
      dispatch((0, _slice.disableCourseHomeTour)());
    } catch (error) {
      (0, _logging.logError)(error);
    }
  };
}
function endCoursewareTour(username) {
  return async dispatch => {
    try {
      await (0, _api.patchTourData)(username, {
        show_courseware_tour: false
      });
      dispatch((0, _slice.disableCoursewareTour)());
    } catch (error) {
      (0, _logging.logError)(error);
    }
  };
}
function fetchTourData(username) {
  return async dispatch => {
    try {
      const data = await (0, _api.getTourData)(username);
      dispatch((0, _slice.setTourData)(data));
    } catch (error) {
      (0, _logging.logError)(error);
    }
  };
}
//# sourceMappingURL=thunks.js.map