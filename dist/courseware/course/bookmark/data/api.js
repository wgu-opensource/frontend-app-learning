var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';
export const getBookmarksBaseUrl = () => `${getConfig().LMS_BASE_URL}/api/bookmarks/v1/bookmarks/`;
export function createBookmark(usageId) {
    return __awaiter(this, void 0, void 0, function* () {
        return getAuthenticatedHttpClient().post(getBookmarksBaseUrl(), { usage_id: usageId });
    });
}
export function deleteBookmark(usageId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username } = getAuthenticatedUser();
        return getAuthenticatedHttpClient().delete(`${getBookmarksBaseUrl()}${username},${usageId}/`);
    });
}
//# sourceMappingURL=api.js.map