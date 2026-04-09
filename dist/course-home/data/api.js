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
import { logInfo } from '@edx/frontend-platform/logging';
import { appendBrowserTimezoneToUrl } from '../../utils';
/**
 * Tweak the metadata for consistency
 * @param metadata the data to normalize
 * @param rootSlug either 'courseware' or 'outline' depending on the context
 * @returns {Object} The normalized metadata
 */
function normalizeCourseHomeCourseMetadata(metadata, rootSlug) {
    const data = camelCaseObject(metadata);
    return Object.assign(Object.assign({}, data), { tabs: data.tabs.map(tab => ({
            // The API uses "courseware" as a slug for both courseware and the outline tab.
            // If needed, we switch it to "outline" here for
            // use within the MFE to differentiate between course home and courseware.
            slug: tab.tabId === 'courseware' ? rootSlug : tab.tabId,
            title: tab.title,
            url: tab.url,
        })), isMasquerading: data.originalUserIsStaff && !data.isStaff });
}
export function normalizeOutlineBlocks(courseId, blocks) {
    const models = {
        courses: {},
        sections: {},
        sequences: {},
    };
    Object.values(blocks).forEach(block => {
        switch (block.type) {
            case 'course':
                models.courses[block.id] = {
                    id: courseId,
                    title: block.display_name,
                    sectionIds: block.children || [],
                    hasScheduledContent: block.has_scheduled_content,
                };
                break;
            case 'chapter':
                models.sections[block.id] = {
                    complete: block.complete,
                    id: block.id,
                    title: block.display_name,
                    resumeBlock: block.resume_block,
                    sequenceIds: block.children || [],
                    hideFromTOC: block.hide_from_toc,
                };
                break;
            case 'sequential':
                models.sequences[block.id] = {
                    complete: block.complete,
                    description: block.description,
                    due: block.due,
                    effortActivities: block.effort_activities,
                    effortTime: block.effort_time,
                    icon: block.icon,
                    id: block.id,
                    // The presence of a URL for the sequence indicates that we want this sequence to be a clickable
                    // link in the outline (even though we ignore the given url and use an internal <Link> to ourselves).
                    showLink: !!block.lms_web_url,
                    title: block.display_name,
                    hideFromTOC: block.hide_from_toc,
                    navigationDisabled: block.navigation_disabled,
                };
                break;
            default:
                logInfo(`Unexpected course block type: ${block.type} with ID ${block.id}.  Expected block types are course, chapter, and sequential.`);
        }
    });
    // Next go through each list and use their child lists to decorate those children with a
    // reference back to their parent.
    Object.values(models.courses).forEach(course => {
        if (Array.isArray(course.sectionIds)) {
            course.sectionIds.forEach(sectionId => {
                const section = models.sections[sectionId];
                section.courseId = course.id;
            });
        }
    });
    Object.values(models.sections).forEach(section => {
        if (Array.isArray(section.sequenceIds)) {
            section.sequenceIds.forEach(sequenceId => {
                if (sequenceId in models.sequences) {
                    models.sequences[sequenceId].sectionId = section.id;
                }
                else {
                    logInfo(`Section ${section.id} has child block ${sequenceId}, but that block is not in the list of sequences.`);
                }
            });
        }
    });
    return models;
}
export function getCourseHomeCourseMetadata(courseId, rootSlug) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = `${getConfig().LMS_BASE_URL}/api/course_home/course_metadata/${courseId}`;
        url = appendBrowserTimezoneToUrl(url);
        const { data } = yield getAuthenticatedHttpClient().get(url);
        return normalizeCourseHomeCourseMetadata(data, rootSlug);
    });
}
// For debugging purposes, you might like to see a fully loaded dates tab.
// Just uncomment the next few lines and the immediate 'return' in the function below
// import { Factory } from 'rosie';
// import './__factories__';
export function getDatesTabData(courseId) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // return camelCaseObject(Factory.build('datesTabData'));
        const url = `${getConfig().LMS_BASE_URL}/api/course_home/dates/${courseId}`;
        try {
            const { data } = yield getAuthenticatedHttpClient().get(url);
            return camelCaseObject(data);
        }
        catch (error) {
            const httpErrorStatus = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status;
            if (httpErrorStatus === 401) {
                // The backend sends this for unenrolled and unauthenticated learners, but we handle those cases by examining
                // courseAccess in the metadata call, so just ignore this status for now.
                return {};
            }
            if (httpErrorStatus === 403) {
                // The backend sends this if there is a course access error and the user should be redirected. The redirect
                // info is included in the course metadata request and will be handled there as long as this call returns
                // without an error
                return {};
            }
            throw error;
        }
    });
}
export function getProgressTabData(courseId, targetUserId) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let url = `${getConfig().LMS_BASE_URL}/api/course_home/progress/${courseId}`;
        // If targetUserId is passed in, we will get the progress page data
        // for the user with the provided id, rather than the requesting user.
        if (targetUserId) {
            url += `/${targetUserId}/`;
        }
        try {
            const { data } = yield getAuthenticatedHttpClient().get(url);
            const camelCasedData = camelCaseObject(data);
            // We replace gradingPolicy.gradeRange with the original data to preserve the intended casing for the grade.
            // For example, if a grade range key is "A", we do not want it to be camel cased (i.e. "A" would become "a")
            // in order to preserve a course team's desired grade formatting.
            camelCasedData.gradingPolicy.gradeRange = data.grading_policy.grade_range;
            camelCasedData.gradesFeatureIsFullyLocked = camelCasedData.completionSummary.lockedCount > 0;
            camelCasedData.gradesFeatureIsPartiallyLocked = false;
            if (camelCasedData.gradesFeatureIsFullyLocked) {
                camelCasedData.sectionScores.forEach((chapter) => {
                    chapter.subsections.forEach((subsection) => {
                        // If something is eligible to be gated by content type gating and would show up on the progress page
                        if (subsection.assignmentType !== null && subsection.hasGradedAssignment && subsection.showGrades
                            && (subsection.numPointsPossible > 0 || subsection.numPointsEarned > 0)) {
                            // but the learner still has access to it, then we are in a partially locked, rather than fully locked state
                            // since the learner has access to some (but not all) content that would normally be locked
                            if (subsection.learnerHasAccess) {
                                camelCasedData.gradesFeatureIsPartiallyLocked = true;
                                camelCasedData.gradesFeatureIsFullyLocked = false;
                            }
                        }
                    });
                });
            }
            return camelCasedData;
        }
        catch (error) {
            const httpErrorStatus = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status;
            if (httpErrorStatus === 404) {
                global.location.replace(`${getConfig().LMS_BASE_URL}/courses/${courseId}/progress`);
                return {};
            }
            if (httpErrorStatus === 401) {
                // The backend sends this for unenrolled and unauthenticated learners, but we handle those cases by examining
                // courseAccess in the metadata call, so just ignore this status for now.
                return {};
            }
            if (httpErrorStatus === 403) {
                // The backend sends this if there is a course access error and the user should be redirected. The redirect
                // info is included in the course metadata request and will be handled there as long as this call returns
                // without an error
                return {};
            }
            throw error;
        }
    });
}
export function getProctoringInfoData(courseId, username) {
    return __awaiter(this, void 0, void 0, function* () {
        let url;
        if (!getConfig().EXAMS_BASE_URL) {
            url = `${getConfig().LMS_BASE_URL}/api/edx_proctoring/v1/user_onboarding/status?is_learning_mfe=true&course_id=${encodeURIComponent(courseId)}`;
            if (username) {
                url += `&username=${encodeURIComponent(username)}`;
            }
        }
        else {
            url = `${getConfig().EXAMS_BASE_URL}/api/v1/student/course_id/${encodeURIComponent(courseId)}/onboarding`;
            if (username) {
                url += `?username=${encodeURIComponent(username)}`;
            }
        }
        try {
            const { data } = yield getAuthenticatedHttpClient().get(url);
            return data;
        }
        catch (error) {
            const { httpErrorStatus } = error && error.customAttributes;
            if (httpErrorStatus === 404) {
                return {};
            }
            throw error;
        }
    });
}
export function getLiveTabIframe(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${getConfig().LMS_BASE_URL}/api/course_live/iframe/${courseId}/`;
        try {
            const { data } = yield getAuthenticatedHttpClient().get(url);
            return data;
        }
        catch (error) {
            const { httpErrorStatus } = error && error.customAttributes;
            if (httpErrorStatus === 404) {
                return {};
            }
            throw error;
        }
    });
}
export function getTimeOffsetMillis(headerDate, requestTime, responseTime) {
    // Time offset computation should move down into the HttpClient wrapper to maintain a global time correction reference
    // Requires 'Access-Control-Expose-Headers: Date' on the server response per https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#access-control-expose-headers
    let timeOffsetMillis = 0;
    if (headerDate !== undefined) {
        const headerTime = Date.parse(headerDate);
        const roundTripMillis = requestTime - responseTime;
        const localTime = responseTime - (roundTripMillis / 2); // Roughly compensate for transit time
        timeOffsetMillis = headerTime - localTime;
    }
    return timeOffsetMillis;
}
export function getOutlineTabData(courseId) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${getConfig().LMS_BASE_URL}/api/course_home/outline/${courseId}`;
        const requestTime = Date.now();
        let tabData;
        try {
            tabData = yield getAuthenticatedHttpClient().get(url);
        }
        catch (error) {
            const httpErrorStatus = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status;
            if (httpErrorStatus === 403) {
                // The backend sends this if there is a course access error and the user should be redirected. The redirect
                // info is included in the course metadata request and will be handled there as long as this call returns
                // without an error
                return {};
            }
            throw error;
        }
        const responseTime = Date.now();
        const { data, headers, } = tabData;
        const accessExpiration = camelCaseObject(data.access_expiration);
        const certData = camelCaseObject(data.cert_data);
        const courseBlocks = data.course_blocks ? normalizeOutlineBlocks(courseId, data.course_blocks.blocks) : {};
        const courseGoals = camelCaseObject(data.course_goals);
        const courseTools = camelCaseObject(data.course_tools);
        const datesBannerInfo = camelCaseObject(data.dates_banner_info);
        const datesWidget = camelCaseObject(data.dates_widget);
        const enableProctoredExams = data.enable_proctored_exams;
        const enrollAlert = camelCaseObject(data.enroll_alert);
        const enrollmentMode = data.enrollment_mode;
        const handoutsHtml = data.handouts_html;
        const hasScheduledContent = data.has_scheduled_content;
        const hasEnded = data.has_ended;
        const offer = camelCaseObject(data.offer);
        const resumeCourse = camelCaseObject(data.resume_course);
        const timeOffsetMillis = getTimeOffsetMillis(headers && headers.date, requestTime, responseTime);
        const userHasPassingGrade = data.user_has_passing_grade;
        const verifiedMode = camelCaseObject(data.verified_mode);
        const welcomeMessageHtml = data.welcome_message_html || '';
        return {
            accessExpiration,
            certData,
            courseBlocks,
            courseGoals,
            courseTools,
            datesBannerInfo,
            datesWidget,
            enrollAlert,
            enrollmentMode,
            enableProctoredExams,
            handoutsHtml,
            hasScheduledContent,
            hasEnded,
            offer,
            resumeCourse,
            timeOffsetMillis,
            userHasPassingGrade,
            verifiedMode,
            welcomeMessageHtml,
        };
    });
}
export function postCourseDeadlines(courseId, model) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URL(`${getConfig().LMS_BASE_URL}/api/course_experience/v1/reset_course_deadlines`);
        return getAuthenticatedHttpClient().post(url.href, {
            course_key: courseId,
            research_event_data: { location: `${model}-tab` },
        });
    });
}
export function deprecatedPostCourseGoals(courseId, goalKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URL(`${getConfig().LMS_BASE_URL}/api/course_home/save_course_goal`);
        return getAuthenticatedHttpClient().post(url.href, { course_id: courseId, goal_key: goalKey });
    });
}
export function postWeeklyLearningGoal(courseId, daysPerWeek, subscribedToReminders) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URL(`${getConfig().LMS_BASE_URL}/api/course_home/save_course_goal`);
        return getAuthenticatedHttpClient().post(url.href, {
            course_id: courseId,
            days_per_week: daysPerWeek,
            subscribed_to_reminders: subscribedToReminders,
        });
    });
}
export function postDismissWelcomeMessage(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URL(`${getConfig().LMS_BASE_URL}/api/course_home/dismiss_welcome_message`);
        yield getAuthenticatedHttpClient().post(url.href, { course_id: courseId });
    });
}
export function postRequestCert(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URL(`${getConfig().LMS_BASE_URL}/courses/${courseId}/generate_user_cert`);
        yield getAuthenticatedHttpClient().post(url.href);
    });
}
export function executePostFromPostEvent(postData, researchEventData) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URL(postData.url);
        return getAuthenticatedHttpClient().post(url.href, {
            course_key: postData.bodyParams.courseId,
            research_event_data: researchEventData,
        });
    });
}
export function unsubscribeFromCourseGoal(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URL(`${getConfig().LMS_BASE_URL}/api/course_home/unsubscribe_from_course_goal/${token}`);
        return getAuthenticatedHttpClient().post(url.href)
            .then(res => camelCaseObject(res));
    });
}
export function getCoursewareSearchEnabled(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URL(`${getConfig().LMS_BASE_URL}/courses/${courseId}/courseware-search/enabled/`);
        const { data } = yield getAuthenticatedHttpClient().get(url.href);
        return { enabled: data.enabled || false };
    });
}
export function searchCourseContentFromAPI(courseId, searchKeyword, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const defaults = { page: 0, limit: 20 };
        const { page, limit } = Object.assign(Object.assign({}, defaults), options);
        const url = new URL(`${getConfig().LMS_BASE_URL}/search/${courseId}`);
        const formData = `search_string=${searchKeyword}&page_size=${limit}&page_index=${page}`;
        const response = yield getAuthenticatedHttpClient().post(url.href, formData);
        return camelCaseObject(response);
    });
}
//# sourceMappingURL=api.js.map