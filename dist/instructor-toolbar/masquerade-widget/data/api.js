"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMasqueradeOptions = getMasqueradeOptions;
exports.postMasqueradeOptions = postMasqueradeOptions;

var _frontendPlatform = require("@edx/frontend-platform");

var _auth = require("@edx/frontend-platform/auth");

async function getMasqueradeOptions(courseId) {
  const url = new URL(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/courses/${courseId}/masquerade`);
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().get(url.href, {});
  return (0, _frontendPlatform.camelCaseObject)(data);
}

async function postMasqueradeOptions(courseId, payload) {
  const url = new URL(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/courses/${courseId}/masquerade`);
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().post(url.href, payload);
  return (0, _frontendPlatform.camelCaseObject)(data);
}
//# sourceMappingURL=api.js.map