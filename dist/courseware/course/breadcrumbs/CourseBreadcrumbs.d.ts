export default CourseBreadcrumbs;
declare function CourseBreadcrumbs({ courseId, sectionId, sequenceId, unitId, isStaff, }: {
    courseId: any;
    sectionId: any;
    sequenceId: any;
    unitId: any;
    isStaff: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace CourseBreadcrumbs {
    namespace propTypes {
        const courseId: PropTypes.Validator<string>;
        const sectionId: PropTypes.Requireable<string>;
        const sequenceId: PropTypes.Requireable<string>;
        const unitId: PropTypes.Requireable<string>;
        const isStaff: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const sectionId_1: null;
        export { sectionId_1 as sectionId };
        const sequenceId_1: null;
        export { sequenceId_1 as sequenceId };
        const unitId_1: null;
        export { unitId_1 as unitId };
        const isStaff_1: null;
        export { isStaff_1 as isStaff };
    }
}
import PropTypes from "prop-types";
