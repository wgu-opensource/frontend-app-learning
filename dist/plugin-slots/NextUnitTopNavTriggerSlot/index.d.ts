import React from 'react';
interface Props {
    disabled: boolean;
    buttonText: string | '';
    nextLink: string;
    sequenceId: string;
    onClickHandler: () => void;
    variant: string;
    buttonStyle: string;
    isAtTop: boolean;
}
export declare const NextUnitTopNavTriggerSlot: React.FC<Props>;
export {};
