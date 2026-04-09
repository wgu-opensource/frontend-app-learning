export function useEnrollmentAlert(courseId: any): {
    clientEnrollmentAlert: React.LazyExoticComponent<{
        ({ payload }: {
            payload: any;
        }): import("react/jsx-runtime").JSX.Element;
        propTypes: {
            payload: import("prop-types").Validator<NonNullable<import("prop-types").InferProps<{
                canEnroll: import("prop-types").Requireable<boolean>;
                courseId: import("prop-types").Requireable<string>;
                extraText: import("prop-types").Requireable<string>;
                isStaff: import("prop-types").Requireable<boolean>;
            }>>>;
        };
    }>;
};
import React from "react";
