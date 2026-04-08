"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUnsubscribeUrl = void 0;
exports.unsubscribeNotificationPreferences = unsubscribeNotificationPreferences;
var _frontendPlatform = require("@edx/frontend-platform");
var _auth = require("@edx/frontend-platform/auth");
const getUnsubscribeUrl = userToken => `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/notifications/preferences/update/${userToken}/`;
exports.getUnsubscribeUrl = getUnsubscribeUrl;
async function unsubscribeNotificationPreferences(userToken) {
  const url = getUnsubscribeUrl(userToken);
  return (0, _auth.getAuthenticatedHttpClient)().get(url);
}
//# sourceMappingURL=api.js.map