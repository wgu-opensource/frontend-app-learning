export namespace COURSE_EXIT_MODES {
    const disabled: number;
    const celebration: number;
    const nonPassing: number;
    const inProgress: number;
    const entranceExamFail: number;
}
export function getCourseExitMode(certificateData: any, hasScheduledContent: any, isEnrolled: any, userHasPassingGrade: any, courseExitPageIsActive?: null, canImmediatelyViewCertificate?: boolean, entranceExamPassed?: null): number;
export function GetCourseExitNavigation(courseId: any, intl: any): {
    exitActive: boolean;
    exitText: any;
};
export function logClick(org: any, courseId: any, administrator: any, event: any, extraProperties: any): void;
export function logVisit(org: any, courseId: any, administrator: any, variant: any): void;
