export declare const iframeParams: {
    show_title: number;
    show_bookmark: number;
    recheck_access: number;
};
interface Props {
    id: string;
    view: string;
    format?: string | null;
    examAccess: {
        blockAccess: boolean;
        accessToken?: string;
    };
    jumpToId?: string;
    preview: boolean;
}
export declare const getIFrameUrl: ({ id, view, format, examAccess, jumpToId, preview, }: Props) => string;
declare const _default: {
    getIFrameUrl: ({ id, view, format, examAccess, jumpToId, preview, }: Props) => string;
};
export default _default;
