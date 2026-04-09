export default GradeRangeTooltip;
declare function GradeRangeTooltip({ iconButtonClassName, passingGrade }: {
    iconButtonClassName: any;
    passingGrade: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace GradeRangeTooltip {
    namespace defaultProps {
        const iconButtonClassName: string;
    }
    namespace propTypes {
        const iconButtonClassName_1: PropTypes.Requireable<string>;
        export { iconButtonClassName_1 as iconButtonClassName };
        export const passingGrade: PropTypes.Validator<number>;
    }
}
import PropTypes from "prop-types";
