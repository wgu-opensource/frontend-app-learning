"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBookmark = createBookmark;
exports.deleteBookmark = deleteBookmark;

var _frontendPlatform = require("@edx/frontend-platform");

var _auth = require("@edx/frontend-platform/auth");

const bookmarksBaseUrl = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/bookmarks/v1/bookmarks/`;

async function createBookmark(usageId) {
  return (0, _auth.getAuthenticatedHttpClient)().post(bookmarksBaseUrl, {
    usage_id: usageId
  });
}

async function deleteBookmark(usageId) {
  const {
    username
  } = (0, _auth.getAuthenticatedUser)();
  return (0, _auth.getAuthenticatedHttpClient)().delete(`${bookmarksBaseUrl}${username},${usageId}/`);
}
//# sourceMappingURL=api.js.map