/**
 * Helper, that is used to forcibly finalize all promises
 * in thunk before running matcher against state.
 *
 * TODO: move this to setupTest or testUtils - it's only used in tests.
 */
export declare const executeThunk: (thunk: any, dispatch: any, getState?: undefined) => Promise<void>;
/**
 * Utility function for appending the browser timezone to the url
 * Can be used on the backend when the user timezone is not set in the user account
 */
export declare const appendBrowserTimezoneToUrl: (url: string) => string;
