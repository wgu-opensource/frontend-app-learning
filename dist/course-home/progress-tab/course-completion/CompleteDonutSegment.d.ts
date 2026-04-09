export default CompleteDonutSegment;
declare function CompleteDonutSegment({ completePercentage, lockedPercentage }: {
    completePercentage: any;
    lockedPercentage: any;
}): import("react/jsx-runtime").JSX.Element | null;
declare namespace CompleteDonutSegment {
    namespace propTypes {
        const completePercentage: PropTypes.Validator<number>;
        const lockedPercentage: PropTypes.Validator<number>;
    }
}
import PropTypes from "prop-types";
