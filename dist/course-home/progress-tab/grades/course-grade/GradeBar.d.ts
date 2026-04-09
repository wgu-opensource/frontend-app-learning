export default GradeBar;
declare function GradeBar({ passingGrade }: {
    passingGrade: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace GradeBar {
    namespace propTypes {
        const passingGrade: PropTypes.Validator<number>;
    }
}
import PropTypes from "prop-types";
