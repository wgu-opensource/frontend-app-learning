export default ContentTools;
declare function ContentTools({ course, }: {
    course: any;
}): false | import("react/jsx-runtime").JSX.Element;
declare namespace ContentTools {
    namespace propTypes {
        const course: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            notes: PropTypes.Requireable<PropTypes.InferProps<{
                enabled: PropTypes.Requireable<boolean>;
            }>>;
            showCalculator: PropTypes.Requireable<boolean>;
        }>>>;
    }
}
import PropTypes from "prop-types";
