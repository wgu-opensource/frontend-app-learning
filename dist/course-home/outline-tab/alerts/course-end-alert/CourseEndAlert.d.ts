export default CourseEndAlert;
declare function CourseEndAlert({ payload }: {
    payload: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace CourseEndAlert {
    namespace propTypes {
        const payload: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            description: PropTypes.Requireable<string>;
            endDate: PropTypes.Requireable<string>;
            userTimezone: PropTypes.Requireable<string>;
        }>>>;
    }
}
import PropTypes from "prop-types";
