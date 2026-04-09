export default function useActiveEnterpriseAlert(courseId: any): {
    clientActiveEnterpriseAlert: React.LazyExoticComponent<{
        ({ payload }: {
            payload: any;
        }): import("react/jsx-runtime").JSX.Element;
        propTypes: {
            payload: import("prop-types").Validator<NonNullable<import("prop-types").InferProps<{
                text: import("prop-types").Requireable<string>;
                courseId: import("prop-types").Requireable<string>;
            }>>>;
        };
    }>;
};
import React from "react";
