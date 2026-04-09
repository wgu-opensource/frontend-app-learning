export default DateSummary;
declare function DateSummary({ dateBlock, userTimezone, }: {
    dateBlock: any;
    userTimezone: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace DateSummary {
    namespace propTypes {
        const dateBlock: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            date: PropTypes.Validator<string>;
            dateType: PropTypes.Requireable<string>;
            description: PropTypes.Requireable<string>;
            link: PropTypes.Requireable<string>;
            linkText: PropTypes.Requireable<string>;
            title: PropTypes.Validator<string>;
            learnerHasAccess: PropTypes.Requireable<boolean>;
        }>>>;
        const userTimezone: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const userTimezone_1: null;
        export { userTimezone_1 as userTimezone };
    }
}
import PropTypes from "prop-types";
