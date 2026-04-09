import React from 'react';
interface Props {
    id: string;
    first: boolean;
    sequence: {
        complete: boolean;
        description: string;
        due: string;
        showLink: boolean;
        title: string;
        hideFromTOC: boolean;
    };
}
declare const SequenceLink: React.FC<Props>;
export default SequenceLink;
