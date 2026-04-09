export function useSequenceNavigationMetadata(currentSequenceId: any, currentUnitId: any): {
    isFirstUnit: boolean;
    isLastUnit: boolean;
    navigationDisabledNextSequence: boolean;
    navigationDisabledPrevSequence: boolean;
    nextLink?: undefined;
    previousLink?: undefined;
} | {
    isFirstUnit: boolean;
    isLastUnit: boolean;
    nextLink: string | undefined;
    previousLink: string | undefined;
    navigationDisabledNextSequence: any;
    navigationDisabledPrevSequence: any;
};
export function useIsOnMediumDesktop(): boolean;
export function useIsOnLargeDesktop(): boolean;
export function useIsOnXLDesktop(): boolean;
export function useIsSidebarOpen(unitId: any): boolean;
