export function useCourseStartMasqueradeBanner(courseId: any, tab: any): {
    clientCourseStartMasqueradeBanner: React.LazyExoticComponent<{
        ({ payload }: {
            payload: any;
        }): import("react/jsx-runtime").JSX.Element;
        propTypes: {
            payload: import("prop-types").Validator<NonNullable<import("prop-types").InferProps<{
                courseId: import("prop-types").Validator<string>;
            }>>>;
        };
    }>;
};
export default useCourseStartAlert;
import React from "react";
declare function useCourseStartAlert(courseId: any): {
    clientCourseStartAlert: React.LazyExoticComponent<{
        ({ payload }: {
            payload: any;
        }): import("react/jsx-runtime").JSX.Element;
        propTypes: {
            payload: import("prop-types").Validator<NonNullable<import("prop-types").InferProps<{
                courseId: import("prop-types").Requireable<string>;
            }>>>;
        };
    }>;
};
