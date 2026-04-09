/// <reference types="prop-types" />
export declare const SIDEBARS: {
    readonly DISCUSSIONS_NOTIFICATIONS: {
        readonly ID: "DISCUSSIONS_NOTIFICATIONS";
        readonly Sidebar: () => import("react/jsx-runtime").JSX.Element;
        readonly Trigger: {
            ({ onClick }: {
                onClick: any;
            }): import("react/jsx-runtime").JSX.Element | null;
            propTypes: {
                onClick: import("prop-types").Validator<(...args: any[]) => any>;
            };
        };
    };
};
export declare const SIDEBAR_ORDER: readonly ["DISCUSSIONS_NOTIFICATIONS"];
