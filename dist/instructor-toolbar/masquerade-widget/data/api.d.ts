export type Role = 'staff' | 'student';
export interface ActiveMasqueradeData {
    courseKey: string;
    role: Role;
    userName: string | null;
    userPartitionId: number | null;
    groupId: number | null;
    groupName: string | null;
}
export interface MasqueradeOption {
    name: string;
    role: Role;
    userName?: string;
    groupId?: number;
    userPartitionId?: number;
}
export interface MasqueradeStatus {
    success: boolean;
    error?: string;
    active: ActiveMasqueradeData;
    available: MasqueradeOption[];
}
export interface Payload {
    role?: Role;
    user_name?: string;
    group_id?: number;
    user_partition_id?: number;
}
export declare function getMasqueradeOptions(courseId: string): Promise<MasqueradeStatus>;
export declare function postMasqueradeOptions(courseId: string, payload: Payload): Promise<MasqueradeStatus>;
