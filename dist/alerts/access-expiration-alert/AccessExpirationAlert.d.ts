export default AccessExpirationAlert;
declare function AccessExpirationAlert({ payload }: {
    payload: any;
}): import("react/jsx-runtime").JSX.Element | null;
declare namespace AccessExpirationAlert {
    namespace propTypes {
        const payload: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            accessExpiration: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
                expirationDate: PropTypes.Validator<string>;
                masqueradingExpiredCourse: PropTypes.Validator<boolean>;
                upgradeDeadline: PropTypes.Requireable<string>;
                upgradeUrl: PropTypes.Requireable<string>;
            }>>>;
            courseId: PropTypes.Validator<string>;
            org: PropTypes.Validator<string>;
            userTimezone: PropTypes.Validator<string>;
            analyticsPageName: PropTypes.Validator<string>;
        }>>>;
    }
}
import PropTypes from "prop-types";
