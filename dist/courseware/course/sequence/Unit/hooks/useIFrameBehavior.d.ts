import React from 'react';
export declare const iframeBehaviorState: {
    readonly iframeHeight: (val: any) => [number, React.Dispatch<React.SetStateAction<number>>];
    readonly hasLoaded: (val: any) => [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    readonly showError: (val: any) => [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    readonly windowTopOffset: (val: any) => [number | null, React.Dispatch<React.SetStateAction<number | null>>];
};
declare const useIFrameBehavior: ({ elementId, id, iframeUrl, onLoaded, }: {
    elementId: any;
    id: any;
    iframeUrl: any;
    onLoaded: any;
}) => {
    iframeHeight: number;
    handleIFrameLoad: () => void;
    showError: boolean;
    hasLoaded: boolean;
};
export default useIFrameBehavior;
