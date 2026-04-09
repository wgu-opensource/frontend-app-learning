export default PassingGradeTooltip;
declare function PassingGradeTooltip({ passingGrade, tooltipClassName }: {
    passingGrade: any;
    tooltipClassName: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace PassingGradeTooltip {
    namespace defaultProps {
        const tooltipClassName: string;
    }
    namespace propTypes {
        export const passingGrade: PropTypes.Validator<number>;
        const tooltipClassName_1: PropTypes.Requireable<string>;
        export { tooltipClassName_1 as tooltipClassName };
    }
}
import PropTypes from "prop-types";
