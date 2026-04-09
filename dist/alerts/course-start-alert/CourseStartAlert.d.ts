export default CourseStartAlert;
declare function CourseStartAlert({ payload }: {
    payload: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace CourseStartAlert {
    namespace propTypes {
        const payload: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            courseId: PropTypes.Requireable<string>;
        }>>>;
    }
}
import PropTypes from "prop-types";
