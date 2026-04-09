import React from 'react';
import { type SidebarId } from '../SidebarContext';
interface Props {
    title?: string;
    ariaLabel: string;
    sidebarId: SidebarId;
    className?: string;
    children: React.ReactNode;
    showTitleBar?: boolean;
    width?: string;
    allowFullHeight?: boolean;
    showBorder?: boolean;
}
declare const SidebarBase: React.FC<Props>;
export default SidebarBase;
