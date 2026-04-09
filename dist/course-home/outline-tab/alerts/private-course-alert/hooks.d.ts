export function usePrivateCourseAlert(courseId: any): {
    clientPrivateCourseAlert: React.LazyExoticComponent<{
        ({ payload }: {
            payload: any;
        }): import("react/jsx-runtime").JSX.Element;
        propTypes: {
            payload: import("prop-types").Validator<NonNullable<import("prop-types").InferProps<{
                anonymousUser: import("prop-types").Requireable<boolean>;
                canEnroll: import("prop-types").Requireable<boolean>;
                courseId: import("prop-types").Requireable<string>;
            }>>>;
        };
    }>;
};
import React from "react";
