export function useCoursewareSearchFeatureFlag(): boolean;
export function useCoursewareSearchState(): {
    show: any;
};
export function useElementBoundingBox(elementId: any): undefined;
export function useLockScroll(): void;
export function useCoursewareSearchParams(): {
    query: string | null;
    filter: string | undefined;
    setQuery: (q: any) => void;
    setFilter: (f: any) => void;
    clearSearchParams: () => void;
};
