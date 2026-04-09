var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Helper, that is used to forcibly finalize all promises
 * in thunk before running matcher against state.
 *
 * TODO: move this to setupTest or testUtils - it's only used in tests.
 */
export const executeThunk = (thunk, dispatch, getState = undefined) => __awaiter(void 0, void 0, void 0, function* () {
    yield thunk(dispatch, getState);
    yield new Promise(setImmediate);
});
/**
 * Utility function for appending the browser timezone to the url
 * Can be used on the backend when the user timezone is not set in the user account
 */
export const appendBrowserTimezoneToUrl = (url) => {
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const urlObject = new URL(url);
    if (browserTimezone) {
        urlObject.searchParams.append('browser_timezone', browserTimezone);
    }
    return urlObject.href;
};
//# sourceMappingURL=utils.js.map