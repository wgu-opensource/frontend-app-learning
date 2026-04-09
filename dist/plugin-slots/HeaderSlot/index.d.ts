export default HeaderSlot;
declare function HeaderSlot({ courseOrg, courseNumber, courseTitle, showUserDropdown, }: {
    courseOrg: any;
    courseNumber: any;
    courseTitle: any;
    showUserDropdown: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace HeaderSlot {
    namespace propTypes {
        const courseOrg: PropTypes.Requireable<string>;
        const courseNumber: PropTypes.Requireable<string>;
        const courseTitle: PropTypes.Requireable<string>;
        const showUserDropdown: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const courseOrg_1: null;
        export { courseOrg_1 as courseOrg };
        const courseNumber_1: null;
        export { courseNumber_1 as courseNumber };
        const courseTitle_1: null;
        export { courseTitle_1 as courseTitle };
        const showUserDropdown_1: boolean;
        export { showUserDropdown_1 as showUserDropdown };
    }
}
import PropTypes from "prop-types";
