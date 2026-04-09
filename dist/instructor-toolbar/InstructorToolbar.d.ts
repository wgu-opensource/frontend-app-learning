export default InstructorToolbar;
declare function InstructorToolbar(props: any): import("react/jsx-runtime").JSX.Element | null;
declare namespace InstructorToolbar {
    namespace propTypes {
        const courseId: PropTypes.Requireable<string>;
        const unitId: PropTypes.Requireable<string>;
        const isStudioButtonVisible: PropTypes.Requireable<boolean>;
        const tab: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const courseId_1: undefined;
        export { courseId_1 as courseId };
        const unitId_1: undefined;
        export { unitId_1 as unitId };
        const isStudioButtonVisible_1: boolean;
        export { isStudioButtonVisible_1 as isStudioButtonVisible };
        const tab_1: string;
        export { tab_1 as tab };
    }
}
import PropTypes from "prop-types";
