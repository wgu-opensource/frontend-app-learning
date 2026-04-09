import React from 'react';
import { ActiveMasqueradeData } from './data/api';
interface Payload {
    role?: string;
    user_name?: string;
    group_id?: number;
    user_partition_id?: number;
}
interface Props {
    groupId?: number;
    groupName: string;
    onSubmit: (payload: Payload) => Promise<Record<string, any>>;
    role?: string;
    selected?: ActiveMasqueradeData;
    userName?: string;
    userNameInputToggle?: (show: boolean, groupId: number | null, groupName: string, role: string | null, userName: string, userPartitionId: number | null) => void;
    userPartitionId?: number;
}
export declare const MasqueradeWidgetOption: React.FC<Props>;
export {};
