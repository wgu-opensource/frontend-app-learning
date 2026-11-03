"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNotices = void 0;
var _frontendPlatform = require("@edx/frontend-platform");
var _auth = require("@edx/frontend-platform/auth");
var _logging = require("@edx/frontend-platform/logging");
/* eslint-disable import/prefer-default-export */

const getNotices = async () => {
  const authenticatedUser = (0, _auth.getAuthenticatedUser)();
  const url = new URL(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/notices/api/v1/unacknowledged`);
  if (authenticatedUser) {
    try {
      const {
        data
      } = await (0, _auth.getAuthenticatedHttpClient)().get(url.href, {});
      return data;
    } catch (e) {
      // we will just swallow error, as that probably means the notices app is not installed.
      // Notices are not necessary for the rest of courseware to function.
      const {
        customAttributes: {
          httpErrorStatus
        }
      } = e;
      if (httpErrorStatus === 404) {
        (0, _logging.logInfo)(`${e}. This probably happened because the notices plugin is not installed on platform.`);
      } else {
        (0, _logging.logError)(e);
      }
    }
  }
  return null;
};
exports.getNotices = getNotices;
//# sourceMappingURL=api.js.map