export default CompletionIcon;
declare function CompletionIcon({ completionStat: { completed, total }, enabled }: {
    completionStat: {
        completed?: number | undefined;
        total?: number | undefined;
    };
    enabled: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace CompletionIcon {
    namespace propTypes {
        const completionStat: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            completed: PropTypes.Requireable<number>;
            total: PropTypes.Requireable<number>;
        }>>>;
        const enabled: PropTypes.Validator<boolean>;
    }
}
import PropTypes from "prop-types";
