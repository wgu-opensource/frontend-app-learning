export default ActiveEnterpriseAlert;
declare function ActiveEnterpriseAlert({ payload }: {
    payload: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace ActiveEnterpriseAlert {
    namespace propTypes {
        const payload: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            text: PropTypes.Requireable<string>;
            courseId: PropTypes.Requireable<string>;
        }>>>;
    }
}
import PropTypes from "prop-types";
