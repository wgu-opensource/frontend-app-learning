var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { camelCaseObject, getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
export function getTourData(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${getConfig().LMS_BASE_URL}/api/user_tours/v1/${username}`;
        try {
            const { data } = yield getAuthenticatedHttpClient().get(url);
            return Object.assign({ toursEnabled: true }, camelCaseObject(data));
        }
        catch (error) {
            const { httpErrorStatus } = error && error.customAttributes;
            /** The API will return a
             *    401 if the user is not authenticated
             *    403 if the tour waffle flag is inactive
             *    404 if no User Tour objects exist for the given username
             */
            if (httpErrorStatus === 401 || httpErrorStatus === 403 || httpErrorStatus === 404) {
                return { toursEnabled: false };
            }
            throw error;
        }
    });
}
export function patchTourData(username, tourData) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${getConfig().LMS_BASE_URL}/api/user_tours/v1/${username}`;
        return getAuthenticatedHttpClient().patch(url, tourData);
    });
}
//# sourceMappingURL=api.js.map