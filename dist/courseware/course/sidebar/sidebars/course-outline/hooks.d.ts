export function useCourseOutlineSidebar(): {
    courseId: string | undefined;
    unitId: any;
    currentSidebar: any;
    shouldDisplayFullScreen: any;
    isEnabledCompletionTracking: any;
    isOpen: boolean;
    setIsOpen: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    handleToggleCollapse: () => void;
    isActiveEntranceExam: any;
    courseOutlineStatus: any;
    activeSequenceId: any;
    sections: any;
    sequences: any;
    units: any;
    handleUnitClick: ({ sequenceId, activeUnitId, id }: {
        sequenceId: any;
        activeUnitId: any;
        id: any;
    }) => void;
    sequenceStatus: any;
};
