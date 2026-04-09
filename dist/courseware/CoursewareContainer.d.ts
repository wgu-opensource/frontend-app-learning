export const checkResumeRedirect: ((courseStatus: any, courseId: any, sequenceId: any, firstSequenceId: any, navigate: any, isPreview: any) => void) & {
    clearCache: () => void;
};
export const checkSectionUnitToUnitRedirect: ((courseStatus: any, courseId: any, sequenceStatus: any, section: any, unitId: any, navigate: any, isPreview: any) => void) & {
    clearCache: () => void;
};
export const checkSectionToSequenceRedirect: ((courseStatus: any, courseId: any, sequenceStatus: any, section: any, unitId: any, navigate: any) => void) & {
    clearCache: () => void;
};
export const checkUnitToSequenceUnitRedirect: ((courseStatus: any, courseId: any, sequenceStatus: any, sequenceMightBeUnit: any, sequenceId: any, section: any, routeUnitId: any, navigate: any, isPreview: any) => void) & {
    clearCache: () => void;
};
export const checkSequenceToSequenceUnitRedirect: ((courseId: any, sequenceStatus: any, sequence: any, unitId: any, navigate: any, isPreview: any) => void) & {
    clearCache: () => void;
};
export const checkSequenceUnitMarkerToSequenceUnitRedirect: ((courseId: any, sequenceStatus: any, sequence: any, unitId: any, navigate: any, isPreview: any) => void) & {
    clearCache: () => void;
};
declare const _default: import("react-redux").ConnectedComponent<(props: any) => import("react/jsx-runtime").JSX.Element, import("react-redux").Omit<any, "sequence" | "courseId" | "course" | "courseStatus" | "sequenceId" | "sequenceMightBeUnit" | "sequenceStatus" | "firstSequenceId" | "sectionViaSequenceId" | "checkBlockCompletion" | "saveSequencePosition" | "fetchCourse" | "fetchSequence" | "previousSequence" | "nextSequence">>;
export default _default;
