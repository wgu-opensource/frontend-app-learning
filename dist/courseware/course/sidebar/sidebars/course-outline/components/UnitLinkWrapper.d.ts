import React from 'react';
interface Props {
    courseId: string;
    sequenceId: string;
    activeUnitId: string;
    id: string;
    children?: React.ReactNode;
}
declare const UnitLinkWrapper: React.FC<Props>;
export default UnitLinkWrapper;
