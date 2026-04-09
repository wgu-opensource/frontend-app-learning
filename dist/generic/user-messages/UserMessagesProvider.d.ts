export namespace ALERT_TYPES {
    const ERROR: string;
    const DANGER: string;
    const SUCCESS: string;
    const INFO: string;
    const WELCOME: string;
}
export default UserMessagesProvider;
declare function UserMessagesProvider({ children }: {
    children: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace UserMessagesProvider {
    namespace propTypes {
        const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    }
    namespace defaultProps {
        const children_1: null;
        export { children_1 as children };
    }
}
import PropTypes from "prop-types";
