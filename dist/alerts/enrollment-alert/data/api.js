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
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';
export function postCourseEnrollment(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${getConfig().LMS_BASE_URL}/api/enrollment/v1/enrollment`;
        const { data } = yield getAuthenticatedHttpClient().post(url, { course_details: { course_id: courseId } });
        return data;
    });
}
//# sourceMappingURL=api.js.map