export default TabContainer;
declare function TabContainer(props: any): import("react/jsx-runtime").JSX.Element;
declare namespace TabContainer {
    namespace propTypes {
        const children: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        const fetch: PropTypes.Validator<(...args: any[]) => any>;
        const slice: PropTypes.Validator<string>;
        const tab: PropTypes.Validator<string>;
        const isProgressTab: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const isProgressTab_1: boolean;
        export { isProgressTab_1 as isProgressTab };
    }
}
import PropTypes from "prop-types";
