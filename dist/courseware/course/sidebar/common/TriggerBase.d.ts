export default SidebarTriggerBase;
declare function SidebarTriggerBase({ onClick, ariaLabel, children, }: {
    onClick: any;
    ariaLabel: any;
    children: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace SidebarTriggerBase {
    namespace propTypes {
        const onClick: PropTypes.Validator<(...args: any[]) => any>;
        const ariaLabel: PropTypes.Validator<string>;
        const children: PropTypes.Validator<PropTypes.ReactElementLike>;
    }
}
import PropTypes from "prop-types";
