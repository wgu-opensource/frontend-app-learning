"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBlockCompletion = getBlockCompletion;
exports.getCourseDiscussionConfig = getCourseDiscussionConfig;
exports.getCourseMetadata = getCourseMetadata;
exports.getCourseOutline = getCourseOutline;
exports.getCourseTopics = getCourseTopics;
exports.getCoursewareOutlineSidebarToggles = getCoursewareOutlineSidebarToggles;
exports.getLearningSequencesOutline = getLearningSequencesOutline;
exports.getResumeBlock = getResumeBlock;
exports.getSequenceForUnitDeprecated = getSequenceForUnitDeprecated;
exports.getSequenceMetadata = getSequenceMetadata;
exports.postIntegritySignature = postIntegritySignature;
exports.postSequencePosition = postSequencePosition;
exports.sendActivationEmail = sendActivationEmail;
var _frontendPlatform = require("@edx/frontend-platform");
var _auth = require("@edx/frontend-platform/auth");
var _utils = require("../../utils");
var _utils2 = require("./utils");
// Do not add further calls to this API - we don't like making use of the modulestore if we can help it
async function getSequenceForUnitDeprecated(courseId, unitId) {
  const authenticatedUser = (0, _auth.getAuthenticatedUser)();
  const url = new URL(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/courses/v2/blocks/`);
  url.searchParams.append('course_id', courseId);
  url.searchParams.append('username', authenticatedUser ? authenticatedUser.username : '');
  url.searchParams.append('depth', 3);
  url.searchParams.append('requested_fields', 'children,discussions_url');
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().get(url.href, {});
  const parent = Object.values(data.blocks).find(block => block.type === 'sequential' && block.children.includes(unitId));
  return parent?.id;
}
async function getLearningSequencesOutline(courseId) {
  const outlineUrl = new URL(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/learning_sequences/v1/course_outline/${courseId}`);
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().get(outlineUrl.href, {});
  return (0, _utils2.normalizeLearningSequencesData)(data);
}
async function getCourseMetadata(courseId) {
  let url = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/courseware/course/${courseId}`;
  url = (0, _utils.appendBrowserTimezoneToUrl)(url);
  const metadata = await (0, _auth.getAuthenticatedHttpClient)().get(url);
  return (0, _utils2.normalizeMetadata)(metadata);
}
async function getSequenceMetadata(sequenceId) {
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().get(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/courseware/sequence/${sequenceId}`, {});
  return (0, _utils2.normalizeSequenceMetadata)(data);
}
const getSequenceHandlerUrl = (courseId, sequenceId) => `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/courses/${courseId}/xblock/${sequenceId}/handler`;
async function getBlockCompletion(courseId, sequenceId, usageKey) {
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().post(`${getSequenceHandlerUrl(courseId, sequenceId)}/get_completion`, {
    usage_key: usageKey
  });
  return data.complete === true;
}
async function postSequencePosition(courseId, sequenceId, activeUnitIndex) {
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().post(`${getSequenceHandlerUrl(courseId, sequenceId)}/goto_position`,
  // Position is 1-indexed on the server and 0-indexed in this app. Adjust here.
  {
    position: activeUnitIndex + 1
  });
  return data;
}
async function getResumeBlock(courseId) {
  const url = new URL(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/courseware/resume/${courseId}`);
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().get(url.href, {});
  return (0, _frontendPlatform.camelCaseObject)(data);
}
async function postIntegritySignature(courseId) {
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().post(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/agreements/v1/integrity_signature/${courseId}`, {});
  return (0, _frontendPlatform.camelCaseObject)(data);
}
async function sendActivationEmail() {
  const url = new URL(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/send_account_activation_email`);
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().post(url.href, {});
  return data;
}
async function getCourseDiscussionConfig(courseId) {
  const url = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/discussion/v1/courses/${courseId}`;
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().get(url);
  return data;
}
async function getCourseTopics(courseId) {
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().get(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/discussion/v2/course_topics/${courseId}`);
  return (0, _frontendPlatform.camelCaseObject)(data);
}

/**
 * Get course outline structure for the courseware navigation sidebar.
 * @param {string} courseId - The unique identifier for the course.
 * @returns {Promise<{units: {}, sequences: {}, sections: {}}|null>}
 */
async function getCourseOutline(courseId) {
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().get(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/course_home/v1/navigation/${courseId}`);
  return data.blocks ? (0, _utils2.normalizeOutlineBlocks)(courseId, data.blocks) : null;
}

/**
 * Get waffle flag value that enable courseware outline sidebar and always open auxiliary sidebar.
 * @param {string} courseId - The unique identifier for the course.
 * @returns {Promise<{enable_navigation_sidebar: boolean, enable_navigation_sidebar: boolean}>} - The object
 * of boolean values of enabling of the outline sidebar and is always open auxiliary sidebar.
 */
async function getCoursewareOutlineSidebarToggles(courseId) {
  const url = new URL(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/courses/${courseId}/courseware-navigation-sidebar/toggles/`);
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().get(url.href);
  return {
    enable_navigation_sidebar: data.enable_navigation_sidebar || false,
    always_open_auxiliary_sidebar: data.always_open_auxiliary_sidebar || false
  };
}
//# sourceMappingURL=api.js.map