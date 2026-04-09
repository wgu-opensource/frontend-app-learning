export function normalizeLearningSequencesData(learningSequencesData: any): {
    courses: {};
    sections: {};
    sequences: {};
};
export function normalizeMetadata(metadata: any): {
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
};
export function normalizeSequenceMetadata(sequence: any): {
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
};
/**
 * Normalizes outline blocks for a given course.
 * @param {string} courseId - The unique identifier for the course.
 * @param {Object} blocks - An object containing different blocks of the course outline.
 * @returns {Object} - An object with normalized sections, sequences, and units.
 */
export function normalizeOutlineBlocks(courseId: string, blocks: any): any;
