export default ProgramCompletion;
declare function ProgramCompletion({ progress, title, type, url, }: {
    progress: any;
    title: any;
    type: any;
    url: any;
}): import("react/jsx-runtime").JSX.Element | null;
declare namespace ProgramCompletion {
    namespace propTypes {
        const progress: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            completed: PropTypes.Validator<number>;
            inProgress: PropTypes.Validator<number>;
            notStarted: PropTypes.Validator<number>;
        }>>>;
        const title: PropTypes.Validator<string>;
        const type: PropTypes.Validator<string>;
        const url: PropTypes.Validator<string>;
    }
}
import PropTypes from "prop-types";
