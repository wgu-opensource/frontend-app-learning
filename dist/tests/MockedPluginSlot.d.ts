export default MockedPluginSlot;
declare function MockedPluginSlot({ children, id }: {
    children: any;
    id: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace MockedPluginSlot {
    const displayName: string;
    namespace propTypes {
        const children: PropTypes.Requireable<NonNullable<PropTypes.ReactNodeLike>>;
        const id: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const children_1: undefined;
        export { children_1 as children };
        const id_1: undefined;
        export { id_1 as id };
    }
}
import PropTypes from "prop-types";
