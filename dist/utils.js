"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeThunk = exports.appendBrowserTimezoneToUrl = void 0;
// Helper, that is used to forcibly finalize all promises
// in thunk before running matcher against state.
const executeThunk = async (thunk, dispatch, getState) => {
  await thunk(dispatch, getState);
  await new Promise(setImmediate);
};

// Utility function for appending the browser timezone to the url
// Can be used on the backend when the user timezone is not set in the user account
exports.executeThunk = executeThunk;
const appendBrowserTimezoneToUrl = url => {
  const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const urlObject = new URL(url);
  if (browserTimezone) {
    urlObject.searchParams.append('browser_timezone', browserTimezone);
  }
  return urlObject.href;
};
exports.appendBrowserTimezoneToUrl = appendBrowserTimezoneToUrl;
//# sourceMappingURL=utils.js.map