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
import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { appendBrowserTimezoneToUrl } from '../../utils';
import { normalizeLearningSequencesData, normalizeMetadata, normalizeOutlineBlocks, normalizeSequenceMetadata, } from './utils';
// Do not add further calls to this API - we don't like making use of the modulestore if we can help it
export const getSequenceForUnitDeprecatedUrl = (courseId) => {
    const authenticatedUser = getAuthenticatedUser();
    const url = new URL(`${getConfig().LMS_BASE_URL}/api/courses/v2/blocks/`);
    url.searchParams.append('course_id', courseId);
    url.searchParams.append('username', authenticatedUser ? authenticatedUser.username : '');
    url.searchParams.append('depth', 3);
    url.searchParams.append('requested_fields', 'children,discussions_url');
    return url;
};
export function getSequenceForUnitDeprecated(courseId, unitId) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = getSequenceForUnitDeprecatedUrl(courseId);
        const { data } = yield getAuthenticatedHttpClient().get(url.href, {});
        const parent = Object.values(data.blocks).find(block => block.type === 'sequential' && block.children.includes(unitId));
        return parent === null || parent === void 0 ? void 0 : parent.id;
    });
}
export function getLearningSequencesOutline(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const outlineUrl = new URL(`${getConfig().LMS_BASE_URL}/api/learning_sequences/v1/course_outline/${courseId}`);
        const { data } = yield getAuthenticatedHttpClient().get(outlineUrl.href, {});
        return normalizeLearningSequencesData(data);
    });
}
export function getCourseMetadata(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = `${getConfig().LMS_BASE_URL}/api/courseware/course/${courseId}`;
        url = appendBrowserTimezoneToUrl(url);
        const metadata = yield getAuthenticatedHttpClient().get(url);
        return normalizeMetadata(metadata);
    });
}
export function getSequenceMetadata(sequenceId, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield getAuthenticatedHttpClient()
            .get(`${getConfig().LMS_BASE_URL}/api/courseware/sequence/${sequenceId}`, { params });
        return normalizeSequenceMetadata(data);
    });
}
const getSequenceHandlerUrl = (courseId, sequenceId) => `${getConfig().LMS_BASE_URL}/courses/${courseId}/xblock/${sequenceId}/handler`;
export function getBlockCompletion(courseId, sequenceId, usageKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield getAuthenticatedHttpClient().post(`${getSequenceHandlerUrl(courseId, sequenceId)}/get_completion`, { usage_key: usageKey });
        return data.complete === true;
    });
}
export function postSequencePosition(courseId, sequenceId, activeUnitIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield getAuthenticatedHttpClient().post(`${getSequenceHandlerUrl(courseId, sequenceId)}/goto_position`, 
        // Position is 1-indexed on the server and 0-indexed in this app. Adjust here.
        { position: activeUnitIndex + 1 });
        return data;
    });
}
export function getResumeBlock(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URL(`${getConfig().LMS_BASE_URL}/api/courseware/resume/${courseId}`);
        const { data } = yield getAuthenticatedHttpClient().get(url.href, {});
        return camelCaseObject(data);
    });
}
export function postIntegritySignature(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield getAuthenticatedHttpClient().post(`${getConfig().LMS_BASE_URL}/api/agreements/v1/integrity_signature/${courseId}`, {});
        return camelCaseObject(data);
    });
}
export function sendActivationEmail() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URL(`${getConfig().LMS_BASE_URL}/api/send_account_activation_email`);
        const { data } = yield getAuthenticatedHttpClient().post(url.href, {});
        return data;
    });
}
export function getCourseDiscussionConfig(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${getConfig().LMS_BASE_URL}/api/discussion/v1/courses/${courseId}`;
        const { data } = yield getAuthenticatedHttpClient().get(url);
        return data;
    });
}
export function getCourseTopics(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield getAuthenticatedHttpClient()
            .get(`${getConfig().LMS_BASE_URL}/api/discussion/v2/course_topics/${courseId}`);
        return camelCaseObject(data);
    });
}
/**
 * Get course outline structure for the courseware navigation sidebar.
 * @param {string} courseId - The unique identifier for the course.
 * @returns {Promise<{units: {}, sequences: {}, sections: {}}|null>}
 */
export function getCourseOutline(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield getAuthenticatedHttpClient()
            .get(`${getConfig().LMS_BASE_URL}/api/course_home/v1/navigation/${courseId}`);
        return data.blocks ? normalizeOutlineBlocks(courseId, data.blocks) : null;
    });
}
/**
 * Get waffle flag value that enables completion tracking.
 * @param {string} courseId - The unique identifier for the course.
 * @returns {Promise<{enable_completion_tracking: boolean}>} - The object
 * of boolean values of enabling of the completion tracking.
 */
export function getCoursewareOutlineSidebarToggles(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URL(`${getConfig().LMS_BASE_URL}/courses/${courseId}/courseware-navigation-sidebar/toggles/`);
        const { data } = yield getAuthenticatedHttpClient().get(url.href);
        return {
            enable_completion_tracking: data.enable_completion_tracking || false,
        };
    });
}
//# sourceMappingURL=api.js.map