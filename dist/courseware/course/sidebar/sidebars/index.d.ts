export namespace SIDEBARS {
    namespace NOTIFICATIONS {
        const ID: "NOTIFICATIONS";
        const Sidebar: {
            (): import("react/jsx-runtime").JSX.Element;
            Trigger: {
                ({ onClick, }: {
                    onClick: any;
                }): import("react/jsx-runtime").JSX.Element;
                propTypes: {
                    onClick: import("prop-types").Validator<(...args: any[]) => any>;
                };
            };
            ID: "NOTIFICATIONS";
        };
        const Trigger: {
            ({ onClick, }: {
                onClick: any;
            }): import("react/jsx-runtime").JSX.Element;
            propTypes: {
                onClick: import("prop-types").Validator<(...args: any[]) => any>;
            };
        };
    }
    namespace DISCUSSIONS {
        const ID_1: "DISCUSSIONS";
        export { ID_1 as ID };
        const Sidebar_1: {
            (): import("react/jsx-runtime").JSX.Element | null;
            Trigger: any;
            ID: "DISCUSSIONS";
        };
        export { Sidebar_1 as Sidebar };
        const Trigger_1: {
            ({ onClick, }: {
                onClick: any;
            }): import("react/jsx-runtime").JSX.Element | null;
            propTypes: {
                onClick: import("prop-types").Validator<(...args: any[]) => any>;
            };
        };
        export { Trigger_1 as Trigger };
    }
}
export const SIDEBAR_ORDER: ("DISCUSSIONS" | "NOTIFICATIONS")[];
