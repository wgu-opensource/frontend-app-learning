export default SidebarProvider;
declare function SidebarProvider({ courseId, unitId, children, }: {
    courseId: any;
    unitId: any;
    children: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace SidebarProvider {
    namespace propTypes {
        const courseId: PropTypes.Validator<string>;
        const unitId: PropTypes.Validator<string>;
        const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    }
    namespace defaultProps {
        const children_1: null;
        export { children_1 as children };
    }
}
import PropTypes from "prop-types";
