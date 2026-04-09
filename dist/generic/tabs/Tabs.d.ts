export default Tabs;
declare function Tabs({ children, className, ...attrs }: {
    [x: string]: any;
    children: any;
    className: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace Tabs {
    namespace propTypes {
        const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        const className: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const children_1: null;
        export { children_1 as children };
        const className_1: undefined;
        export { className_1 as className };
    }
}
import PropTypes from "prop-types";
