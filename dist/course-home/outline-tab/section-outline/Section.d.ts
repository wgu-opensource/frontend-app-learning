import React from 'react';
interface Props {
    defaultOpen: boolean;
    expand: boolean;
    section: {
        complete: boolean;
        sequenceIds: string[];
        title: string;
        hideFromTOC: boolean;
    };
}
declare const Section: React.FC<Props>;
export default Section;
