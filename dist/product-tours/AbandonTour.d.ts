export default abandonTour;
declare function abandonTour({ enabled, onEnd }: {
    enabled: any;
    onEnd: any;
}): {
    checkpoints: {
        body: import("react/jsx-runtime").JSX.Element;
        placement: string;
        target: string;
    }[];
    enabled: any;
    endButtonText: import("react/jsx-runtime").JSX.Element;
    onEnd: any;
    onEscape: any;
    tourId: string;
};
