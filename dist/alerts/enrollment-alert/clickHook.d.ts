export default useEnrollClickHandler;
declare function useEnrollClickHandler(courseId: any, orgId: any, successText: any): {
    enrollClickHandler: () => void;
    loading: boolean;
};
