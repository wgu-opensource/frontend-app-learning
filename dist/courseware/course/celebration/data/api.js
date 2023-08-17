"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postCelebrationComplete = postCelebrationComplete;

var _frontendPlatform = require("@edx/frontend-platform");

var _auth = require("@edx/frontend-platform/auth");

/* eslint-disable import/prefer-default-export */
// Does not block on answer
function postCelebrationComplete(courseId, data) {
  const url = new URL(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/courseware/celebration/${courseId}`);
  (0, _auth.getAuthenticatedHttpClient)().post(url.href, data);
}
//# sourceMappingURL=api.js.map