export default PrivateCourseAlert;
declare function PrivateCourseAlert({ payload }: {
    payload: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace PrivateCourseAlert {
    namespace propTypes {
        const payload: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            anonymousUser: PropTypes.Requireable<boolean>;
            canEnroll: PropTypes.Requireable<boolean>;
            courseId: PropTypes.Requireable<string>;
        }>>>;
    }
}
import PropTypes from "prop-types";
