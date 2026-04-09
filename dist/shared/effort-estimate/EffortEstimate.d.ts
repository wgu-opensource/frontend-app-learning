export default EffortEstimate;
declare function EffortEstimate(props: any): import("react/jsx-runtime").JSX.Element | null;
declare namespace EffortEstimate {
    namespace defaultProps {
        const className: null;
    }
    namespace propTypes {
        export const block: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            effortActivities: PropTypes.Requireable<number>;
            effortTime: PropTypes.Requireable<number>;
        }>>>;
        const className_1: PropTypes.Requireable<string>;
        export { className_1 as className };
    }
}
import PropTypes from "prop-types";
