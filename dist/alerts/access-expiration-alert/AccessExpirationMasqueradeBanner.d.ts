export default AccessExpirationMasqueradeBanner;
declare function AccessExpirationMasqueradeBanner({ payload }: {
    payload: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace AccessExpirationMasqueradeBanner {
    namespace propTypes {
        const payload: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            expirationDate: PropTypes.Validator<string>;
            userTimezone: PropTypes.Validator<string>;
        }>>>;
    }
}
import PropTypes from "prop-types";
