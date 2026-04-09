export default EnrollmentAlert;
declare function EnrollmentAlert({ payload }: {
    payload: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace EnrollmentAlert {
    namespace propTypes {
        const payload: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            canEnroll: PropTypes.Requireable<boolean>;
            courseId: PropTypes.Requireable<string>;
            extraText: PropTypes.Requireable<string>;
            isStaff: PropTypes.Requireable<boolean>;
        }>>>;
    }
}
import PropTypes from "prop-types";
