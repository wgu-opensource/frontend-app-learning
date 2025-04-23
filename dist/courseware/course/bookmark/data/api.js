"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBookmark = createBookmark;
exports.deleteBookmark = deleteBookmark;
exports.getBookmarksBaseUrl = void 0;
var _frontendPlatform = require("@edx/frontend-platform");
var _auth = require("@edx/frontend-platform/auth");
const getBookmarksBaseUrl = () => `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/bookmarks/v1/bookmarks/`;
exports.getBookmarksBaseUrl = getBookmarksBaseUrl;
async function createBookmark(usageId) {
  return (0, _auth.getAuthenticatedHttpClient)().post(getBookmarksBaseUrl(), {
    usage_id: usageId
  });
}
async function deleteBookmark(usageId) {
  const {
    username
  } = (0, _auth.getAuthenticatedUser)();
  return (0, _auth.getAuthenticatedHttpClient)().delete(`${getBookmarksBaseUrl()}${username},${usageId}/`);
}
//# sourceMappingURL=api.js.map