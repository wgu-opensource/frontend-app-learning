export default ProblemScoreDrawer;
declare function ProblemScoreDrawer({ problemScores, subsection }: {
    problemScores: any;
    subsection: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace ProblemScoreDrawer {
    namespace propTypes {
        const problemScores: PropTypes.Validator<(PropTypes.InferProps<{
            earned: PropTypes.Validator<number>;
            possible: PropTypes.Validator<number>;
        }> | null | undefined)[]>;
        const subsection: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            learnerHasAccess: PropTypes.Requireable<boolean>;
            hasGradedAssignment: PropTypes.Requireable<boolean>;
        }>>>;
    }
}
import PropTypes from "prop-types";
