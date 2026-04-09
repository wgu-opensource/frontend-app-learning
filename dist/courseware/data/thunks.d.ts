export function fetchCourse(courseId: any): (dispatch: any) => Promise<void>;
export function fetchSequence(sequenceId: any, isPreview: any): (dispatch: any) => Promise<void>;
export function checkBlockCompletion(courseId: any, sequenceId: any, unitId: any): (dispatch: any, getState: any) => Promise<{}>;
export function saveSequencePosition(courseId: any, sequenceId: any, activeUnitIndex: any): (dispatch: any, getState: any) => Promise<void>;
export function saveIntegritySignature(courseId: any, isMasquerading: any): (dispatch: any) => Promise<void>;
export function getCourseDiscussionTopics(courseId: any): (dispatch: any) => Promise<void>;
export function getCourseOutlineStructure(courseId: any): (dispatch: any) => Promise<void>;
