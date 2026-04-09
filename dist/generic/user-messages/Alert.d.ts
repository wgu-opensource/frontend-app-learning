export default Alert;
declare function Alert({ type, dismissible, children, onDismiss, stacked, }: {
    type: any;
    dismissible: any;
    children: any;
    onDismiss: any;
    stacked: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace Alert {
    namespace propTypes {
        const type: PropTypes.Validator<string>;
        const dismissible: PropTypes.Requireable<boolean>;
        const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        const onDismiss: PropTypes.Requireable<(...args: any[]) => any>;
        const stacked: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const dismissible_1: boolean;
        export { dismissible_1 as dismissible };
        const children_1: undefined;
        export { children_1 as children };
        const onDismiss_1: null;
        export { onDismiss_1 as onDismiss };
        const stacked_1: boolean;
        export { stacked_1 as stacked };
    }
}
import PropTypes from "prop-types";
