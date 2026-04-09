export default useScheduledContentAlert;
declare function useScheduledContentAlert(courseId: any): {
    ScheduledContentAlert: React.LazyExoticComponent<{
        ({ payload }: {
            payload: any;
        }): import("react/jsx-runtime").JSX.Element;
        propTypes: {
            payload: import("prop-types").Validator<NonNullable<import("prop-types").InferProps<{
                datesTabLink: import("prop-types").Requireable<string>;
            }>>>;
        };
    }>;
};
import React from "react";
