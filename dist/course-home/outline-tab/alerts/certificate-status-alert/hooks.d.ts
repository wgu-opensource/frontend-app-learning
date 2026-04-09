export default useCertificateStatusAlert;
declare function useCertificateStatusAlert(courseId: any): {
    clientCertificateStatusAlert: React.LazyExoticComponent<{
        ({ payload }: {
            payload: any;
        }): import("react/jsx-runtime").JSX.Element;
        propTypes: {
            payload: import("prop-types").Validator<NonNullable<import("prop-types").InferProps<{
                certificateAvailableDate: import("prop-types").Requireable<string>;
                certStatus: import("prop-types").Requireable<string>;
                courseEndDate: import("prop-types").Requireable<string>;
                courseId: import("prop-types").Requireable<string>;
                certURL: import("prop-types").Requireable<string>;
                userTimezone: import("prop-types").Requireable<string>;
                org: import("prop-types").Requireable<string>;
                notPassingCourseEnded: import("prop-types").Requireable<boolean>;
                tabs: import("prop-types").Requireable<(import("prop-types").InferProps<{
                    tab_id: import("prop-types").Requireable<string>;
                    title: import("prop-types").Requireable<string>;
                    url: import("prop-types").Requireable<string>;
                }> | null | undefined)[]>;
            }>>>;
        };
    }>;
};
import React from "react";
