export default SidebarBase;
declare function SidebarBase({ title, ariaLabel, sidebarId, className, children, showTitleBar, width, }: {
    title: any;
    ariaLabel: any;
    sidebarId: any;
    className: any;
    children: any;
    showTitleBar: any;
    width: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace SidebarBase {
    namespace propTypes {
        const title: PropTypes.Validator<string>;
        const ariaLabel: PropTypes.Validator<string>;
        const sidebarId: PropTypes.Validator<string>;
        const className: PropTypes.Validator<string>;
        const children: PropTypes.Validator<PropTypes.ReactElementLike>;
        const showTitleBar: PropTypes.Requireable<boolean>;
        const width: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const width_1: string;
        export { width_1 as width };
        const showTitleBar_1: boolean;
        export { showTitleBar_1 as showTitleBar };
    }
}
import PropTypes from "prop-types";
