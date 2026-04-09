export default AlertList;
declare function AlertList({ topic, className, customAlerts, customProps, }: {
    topic: any;
    className: any;
    customAlerts: any;
    customProps: any;
}): import("react/jsx-runtime").JSX.Element | null;
declare namespace AlertList {
    namespace propTypes {
        const className: PropTypes.Requireable<string>;
        const topic: PropTypes.Requireable<string>;
        const customAlerts: PropTypes.Requireable<{
            [x: string]: NonNullable<object | PropTypes.ReactNodeLike> | null | undefined;
        }>;
        const customProps: PropTypes.Requireable<object>;
    }
    namespace defaultProps {
        const topic_1: null;
        export { topic_1 as topic };
        const className_1: null;
        export { className_1 as className };
        const customAlerts_1: {};
        export { customAlerts_1 as customAlerts };
        const customProps_1: {};
        export { customProps_1 as customProps };
    }
}
import PropTypes from "prop-types";
