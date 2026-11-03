"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUnsubscribeUrl = void 0;
exports.unsubscribeNotificationPreferences = unsubscribeNotificationPreferences;
var _frontendPlatform = require("@edx/frontend-platform");
var _auth = require("@edx/frontend-platform/auth");
const getUnsubscribeUrl = (userToken, updatePatch) => `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/notifications/preferences/update/${userToken}/${updatePatch}/`;
exports.getUnsubscribeUrl = getUnsubscribeUrl;
async function unsubscribeNotificationPreferences(userToken, updatePatch) {
  const url = getUnsubscribeUrl(userToken, updatePatch);
  return (0, _auth.getAuthenticatedHttpClient)().get(url);
}
//# sourceMappingURL=api.js.map