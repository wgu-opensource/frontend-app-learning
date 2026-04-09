export function fetchTab(courseId: any, tab: any, getTabData: any, targetUserId: any): (dispatch: any) => Promise<void>;
export function fetchDatesTab(courseId: any): (dispatch: any) => Promise<void>;
export function fetchProgressTab(courseId: any, targetUserId: any): (dispatch: any) => Promise<void>;
export function fetchOutlineTab(courseId: any): (dispatch: any) => Promise<void>;
export function fetchLiveTab(courseId: any): (dispatch: any) => Promise<void>;
export function fetchDiscussionTab(courseId: any): (dispatch: any) => Promise<void>;
export function dismissWelcomeMessage(courseId: any): () => Promise<void>;
export function requestCert(courseId: any): () => Promise<void>;
export function resetDeadlines(courseId: any, model: any, getTabData: any): (dispatch: any) => Promise<void>;
export function deprecatedSaveCourseGoal(courseId: any, goalKey: any): Promise<any>;
export function saveWeeklyLearningGoal(courseId: any, daysPerWeek: any, subscribedToReminders: any): Promise<any>;
export function processEvent(eventData: any, getTabData: any): (dispatch: any) => Promise<void>;
export function fetchCoursewareSearchSettings(courseId: any): Promise<{
    enabled: any;
}>;
export function searchCourseContent(courseId: any, searchKeyword: any): (dispatch: any) => Promise<void>;
