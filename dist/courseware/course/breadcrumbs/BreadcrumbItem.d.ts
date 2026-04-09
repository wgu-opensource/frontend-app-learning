import React from 'react';
interface Props {
    content: {
        default: boolean;
        id: string;
        label: string;
        sequences: {
            id: string;
        }[];
    }[];
    withSeparator: boolean | false;
    separator: string | '';
    courseId: string;
    sequenceId: string | '';
    unitId: string | '';
    isStaff: boolean | false;
}
declare const BreadcrumbItem: React.FC<Props>;
export default BreadcrumbItem;
