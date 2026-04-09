export namespace CERT_STATUS_TYPE {
    const EARNED_NOT_AVAILABLE: string;
    const DOWNLOADABLE: string;
    const REQUESTING: string;
    const UNVERIFIED: string;
}
export default CertificateStatusAlert;
declare function CertificateStatusAlert({ payload }: {
    payload: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace CertificateStatusAlert {
    namespace propTypes {
        const payload: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            certificateAvailableDate: PropTypes.Requireable<string>;
            certStatus: PropTypes.Requireable<string>;
            courseEndDate: PropTypes.Requireable<string>;
            courseId: PropTypes.Requireable<string>;
            certURL: PropTypes.Requireable<string>;
            userTimezone: PropTypes.Requireable<string>;
            org: PropTypes.Requireable<string>;
            notPassingCourseEnded: PropTypes.Requireable<boolean>;
            tabs: PropTypes.Requireable<(PropTypes.InferProps<{
                tab_id: PropTypes.Requireable<string>;
                title: PropTypes.Requireable<string>;
                url: PropTypes.Requireable<string>;
            }> | null | undefined)[]>;
        }>>>;
    }
}
import PropTypes from "prop-types";
