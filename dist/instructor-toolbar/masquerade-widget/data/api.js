var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getConfig, camelCaseObject } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
export function getMasqueradeOptions(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URL(`${getConfig().LMS_BASE_URL}/courses/${courseId}/masquerade`);
        const { data } = yield getAuthenticatedHttpClient().get(url.href, {});
        return camelCaseObject(data);
    });
}
export function postMasqueradeOptions(courseId, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URL(`${getConfig().LMS_BASE_URL}/courses/${courseId}/masquerade`);
        const { data } = yield getAuthenticatedHttpClient().post(url.href, payload);
        return camelCaseObject(data);
    });
}
//# sourceMappingURL=api.js.map