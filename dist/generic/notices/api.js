var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable import/prefer-default-export */
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { logError, logInfo } from '@edx/frontend-platform/logging';
export const getNotices = () => __awaiter(void 0, void 0, void 0, function* () {
    const authenticatedUser = getAuthenticatedUser();
    const url = new URL(`${getConfig().LMS_BASE_URL}/notices/api/v1/unacknowledged`);
    if (authenticatedUser) {
        try {
            const { data } = yield getAuthenticatedHttpClient().get(url.href, {});
            return data;
        }
        catch (e) {
            // we will just swallow error, as that probably means the notices app is not installed.
            // Notices are not necessary for the rest of courseware to function.
            const { customAttributes: { httpErrorStatus } } = e;
            if (httpErrorStatus === 404) {
                logInfo(`${e}. This probably happened because the notices plugin is not installed on platform.`);
            }
            else {
                logError(e);
            }
        }
    }
    return null;
});
//# sourceMappingURL=api.js.map