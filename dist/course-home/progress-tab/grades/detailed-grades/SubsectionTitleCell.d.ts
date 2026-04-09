export default SubsectionTitleCell;
declare function SubsectionTitleCell({ subsection }: {
    subsection: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace SubsectionTitleCell {
    namespace propTypes {
        const subsection: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            blockKey: PropTypes.Validator<string>;
            displayName: PropTypes.Validator<string>;
            learnerHasAccess: PropTypes.Validator<boolean>;
            override: PropTypes.Requireable<PropTypes.InferProps<{
                system: PropTypes.Requireable<string>;
                reason: PropTypes.Requireable<string>;
            }>>;
            problemScores: PropTypes.Validator<(PropTypes.InferProps<{
                earned: PropTypes.Validator<number>;
                possible: PropTypes.Validator<number>;
            }> | null | undefined)[]>;
            url: PropTypes.Requireable<string>;
        }>>>;
    }
}
import PropTypes from "prop-types";
