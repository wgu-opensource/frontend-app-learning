"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postCourseEnrollment = postCourseEnrollment;

var _auth = require("@edx/frontend-platform/auth");

var _frontendPlatform = require("@edx/frontend-platform");

/* eslint-disable import/prefer-default-export */
async function postCourseEnrollment(courseId) {
  const url = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/enrollment/v1/enrollment`;
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().post(url, {
    course_details: {
      course_id: courseId
    }
  });
  return data;
}
//# sourceMappingURL=api.js.map