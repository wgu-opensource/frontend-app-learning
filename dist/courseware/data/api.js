"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBlockCompletion = getBlockCompletion;
exports.getCourseDiscussionConfig = getCourseDiscussionConfig;
exports.getCourseMetadata = getCourseMetadata;
exports.getCourseTopics = getCourseTopics;
exports.getLearningSequencesOutline = getLearningSequencesOutline;
exports.getResumeBlock = getResumeBlock;
exports.getSequenceForUnitDeprecated = getSequenceForUnitDeprecated;
exports.getSequenceMetadata = getSequenceMetadata;
exports.normalizeLearningSequencesData = normalizeLearningSequencesData;
exports.postIntegritySignature = postIntegritySignature;
exports.postSequencePosition = postSequencePosition;
exports.sendActivationEmail = sendActivationEmail;

var _frontendPlatform = require("@edx/frontend-platform");

var _auth = require("@edx/frontend-platform/auth");

var _api = require("../../course-home/data/api");

var _utils = require("../../utils");

function normalizeLearningSequencesData(learningSequencesData) {
  const models = {
    courses: {},
    sections: {},
    sequences: {}
  };
  const now = new Date();

  function isReleased(block) {
    // We check whether the backend marks this as accessible because staff users are granted access anyway.
    // Note that sections don't have the `accessible` field and will just be checking `effective_start`.
    return block.accessible || !block.effective_start || now >= Date.parse(block.effective_start);
  } // Sequences


  Object.entries(learningSequencesData.outline.sequences).forEach(_ref => {
    let [seqId, sequence] = _ref;

    if (!isReleased(sequence)) {
      return; // Don't let the learner see unreleased sequences
    }

    models.sequences[seqId] = {
      id: seqId,
      title: sequence.title
    };
  }); // Sections

  learningSequencesData.outline.sections.forEach(section => {
    // Filter out any ignored sequences (e.g. unreleased sequences)
    const availableSequenceIds = section.sequence_ids.filter(seqId => seqId in models.sequences); // If we are unreleased and already stripped out all our children, just don't show us at all.
    // (We check both release date and children because children will exist for an unreleased section even for staff,
    // so we still want to show this section.)

    if (!isReleased(section) && availableSequenceIds.length === 0) {
      return;
    }

    models.sections[section.id] = {
      id: section.id,
      title: section.title,
      sequenceIds: availableSequenceIds,
      courseId: learningSequencesData.course_key
    }; // Add back-references to this section for all child sequences.

    availableSequenceIds.forEach(childSeqId => {
      models.sequences[childSeqId].sectionId = section.id;
    });
  }); // Course

  models.courses[learningSequencesData.course_key] = {
    id: learningSequencesData.course_key,
    title: learningSequencesData.title,
    sectionIds: Object.entries(models.sections).map(_ref2 => {
      let [sectionId] = _ref2;
      return sectionId;
    }),
    // Scan through all the sequences and look for ones that aren't released yet.
    hasScheduledContent: Object.values(learningSequencesData.outline.sequences).some(seq => !isReleased(seq))
  };
  return models;
} // Do not add further calls to this API - we don't like making use of the modulestore if we can help it


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
  return normalizeLearningSequencesData(data);
}

function normalizeMetadata(metadata) {
  const requestTime = Date.now();
  const responseTime = requestTime;
  const {
    data,
    headers
  } = metadata;
  return {
    accessExpiration: (0, _frontendPlatform.camelCaseObject)(data.access_expiration),
    canShowUpgradeSock: data.can_show_upgrade_sock,
    contentTypeGatingEnabled: data.content_type_gating_enabled,
    courseGoals: (0, _frontendPlatform.camelCaseObject)(data.course_goals),
    id: data.id,
    title: data.name,
    offer: (0, _frontendPlatform.camelCaseObject)(data.offer),
    enrollmentStart: data.enrollment_start,
    enrollmentEnd: data.enrollment_end,
    end: data.end,
    start: data.start,
    enrollmentMode: data.enrollment.mode,
    isEnrolled: data.enrollment.is_active,
    license: data.license,
    userTimezone: data.user_timezone,
    showCalculator: data.show_calculator,
    notes: (0, _frontendPlatform.camelCaseObject)(data.notes),
    marketingUrl: data.marketing_url,
    celebrations: (0, _frontendPlatform.camelCaseObject)(data.celebrations),
    userHasPassingGrade: data.user_has_passing_grade,
    courseExitPageIsActive: data.course_exit_page_is_active,
    certificateData: (0, _frontendPlatform.camelCaseObject)(data.certificate_data),
    entranceExamData: (0, _frontendPlatform.camelCaseObject)(data.entrance_exam_data),
    timeOffsetMillis: (0, _api.getTimeOffsetMillis)(headers && headers.date, requestTime, responseTime),
    verifyIdentityUrl: data.verify_identity_url,
    verificationStatus: data.verification_status,
    linkedinAddToProfileUrl: data.linkedin_add_to_profile_url,
    relatedPrograms: (0, _frontendPlatform.camelCaseObject)(data.related_programs),
    userNeedsIntegritySignature: data.user_needs_integrity_signature,
    canAccessProctoredExams: data.can_access_proctored_exams
  };
}

async function getCourseMetadata(courseId) {
  let url = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/courseware/course/${courseId}`;
  url = (0, _utils.appendBrowserTimezoneToUrl)(url);
  const metadata = await (0, _auth.getAuthenticatedHttpClient)().get(url);
  return normalizeMetadata(metadata);
}

function normalizeSequenceMetadata(sequence) {
  return {
    sequence: {
      id: sequence.item_id,
      blockType: sequence.tag,
      unitIds: sequence.items.map(unit => unit.id),
      bannerText: sequence.banner_text,
      format: sequence.format,
      title: sequence.display_name,

      /*
      Example structure of gated_content when prerequisites exist:
      {
        prereq_id: 'id of the prereq section',
        prereq_url: 'unused by this frontend',
        prereq_section_name: 'Name of the prerequisite section',
        gated: true,
        gated_section_name: 'Name of this gated section',
      */
      gatedContent: (0, _frontendPlatform.camelCaseObject)(sequence.gated_content),
      isTimeLimited: sequence.is_time_limited,
      isProctored: sequence.is_proctored,
      isHiddenAfterDue: sequence.is_hidden_after_due,
      // Position comes back from the server 1-indexed. Adjust here.
      activeUnitIndex: sequence.position ? sequence.position - 1 : 0,
      saveUnitPosition: sequence.save_position,
      showCompletion: sequence.show_completion,
      allowProctoringOptOut: sequence.allow_proctoring_opt_out
    },
    units: sequence.items.map(unit => ({
      id: unit.id,
      sequenceId: sequence.item_id,
      bookmarked: unit.bookmarked,
      complete: unit.complete,
      title: unit.page_title,
      contentType: unit.type,
      graded: unit.graded,
      containsContentTypeGatedContent: unit.contains_content_type_gated_content
    }))
  };
}

async function getSequenceMetadata(sequenceId) {
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().get(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/courseware/sequence/${sequenceId}`, {});
  return normalizeSequenceMetadata(data);
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
  } = await (0, _auth.getAuthenticatedHttpClient)().post(`${getSequenceHandlerUrl(courseId, sequenceId)}/goto_position`, // Position is 1-indexed on the server and 0-indexed in this app. Adjust here.
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
//# sourceMappingURL=api.js.map