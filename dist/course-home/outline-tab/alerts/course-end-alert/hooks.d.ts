export function useCourseEndAlert(courseId: any): {
    clientCourseEndAlert: React.LazyExoticComponent<{
        ({ payload }: {
            payload: any;
        }): import("react/jsx-runtime").JSX.Element;
        propTypes: {
            payload: import("prop-types").Validator<NonNullable<import("prop-types").InferProps<{
                description: import("prop-types").Requireable<string>;
                endDate: import("prop-types").Requireable<string>;
                userTimezone: import("prop-types").Requireable<string>;
            }>>>;
        };
    }>;
};
import React from "react";
