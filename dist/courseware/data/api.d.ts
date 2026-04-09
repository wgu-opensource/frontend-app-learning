export function getSequenceForUnitDeprecated(courseId: any, unitId: any): Promise<any>;
export function getLearningSequencesOutline(courseId: any): Promise<{
    courses: {};
    sections: {};
    sequences: {};
}>;
export function getCourseMetadata(courseId: any): Promise<{
    accessExpiration: any;
    contentTypeGatingEnabled: any;
    courseGoals: any;
    id: any;
    title: any;
    offer: any;
    enrollmentStart: any;
    enrollmentEnd: any;
    end: any;
    start: any;
    enrollmentMode: any;
    isEnrolled: any;
    license: any;
    userTimezone: any;
    showCalculator: any;
    notes: any;
    marketingUrl: any;
    celebrations: any;
    userHasPassingGrade: any;
    courseExitPageIsActive: any;
    certificateData: any;
    entranceExamData: any;
    language: any;
    timeOffsetMillis: number;
    verifyIdentityUrl: any;
    verificationStatus: any;
    linkedinAddToProfileUrl: any;
    relatedPrograms: any;
    userNeedsIntegritySignature: any;
    canAccessProctoredExams: any;
    learningAssistantEnabled: any;
}>;
export function getSequenceMetadata(sequenceId: any, params: any): Promise<{
    sequence: {
        id: any;
        blockType: any;
        unitIds: any;
        bannerText: any;
        format: any;
        title: any;
        gatedContent: any;
        isTimeLimited: any;
        isProctored: any;
        isHiddenAfterDue: any;
        activeUnitIndex: number;
        saveUnitPosition: any;
        showCompletion: any;
        allowProctoringOptOut: any;
        navigationDisabled: any;
    };
    units: any;
}>;
export function getBlockCompletion(courseId: any, sequenceId: any, usageKey: any): Promise<boolean>;
export function postSequencePosition(courseId: any, sequenceId: any, activeUnitIndex: any): Promise<any>;
export function getResumeBlock(courseId: any): Promise<any>;
export function postIntegritySignature(courseId: any): Promise<any>;
export function sendActivationEmail(): Promise<any>;
export function getCourseDiscussionConfig(courseId: any): Promise<any>;
export function getCourseTopics(courseId: any): Promise<any>;
/**
 * Get course outline structure for the courseware navigation sidebar.
 * @param {string} courseId - The unique identifier for the course.
 * @returns {Promise<{units: {}, sequences: {}, sections: {}}|null>}
 */
export function getCourseOutline(courseId: string): Promise<{
    units: {};
    sequences: {};
    sections: {};
} | null>;
/**
 * Get waffle flag value that enables completion tracking.
 * @param {string} courseId - The unique identifier for the course.
 * @returns {Promise<{enable_completion_tracking: boolean}>} - The object
 * of boolean values of enabling of the completion tracking.
 */
export function getCoursewareOutlineSidebarToggles(courseId: string): Promise<{
    enable_completion_tracking: boolean;
}>;
export function getSequenceForUnitDeprecatedUrl(courseId: any): URL;
