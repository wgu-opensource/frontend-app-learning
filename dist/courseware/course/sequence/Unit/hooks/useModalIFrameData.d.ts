export const DEFAULT_HEIGHT: "100%";
export default useModalIFrameData;
declare function useModalIFrameData(): {
    handleModalClose: () => void;
    modalOptions: {
        height: string;
        isOpen: boolean;
    };
};
