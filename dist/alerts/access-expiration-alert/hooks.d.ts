export function useAccessExpirationMasqueradeBanner(courseId: any, tab: any): {
    clientAccessExpirationMasqueradeBanner: React.LazyExoticComponent<{
        ({ payload }: {
            payload: any;
        }): import("react/jsx-runtime").JSX.Element;
        propTypes: {
            payload: import("prop-types").Validator<NonNullable<import("prop-types").InferProps<{
                expirationDate: import("prop-types").Validator<string>;
                userTimezone: import("prop-types").Validator<string>;
            }>>>;
        };
    }>;
};
export default useAccessExpirationAlert;
import React from "react";
declare function useAccessExpirationAlert(accessExpiration: any, courseId: any, org: any, userTimezone: any, topic: any, analyticsPageName: any): {
    clientAccessExpirationAlert: React.LazyExoticComponent<{
        ({ payload }: {
            payload: any;
        }): import("react/jsx-runtime").JSX.Element | null;
        propTypes: {
            payload: import("prop-types").Validator<NonNullable<import("prop-types").InferProps<{
                accessExpiration: import("prop-types").Validator<NonNullable<import("prop-types").InferProps<{
                    expirationDate: import("prop-types").Validator<string>;
                    masqueradingExpiredCourse: import("prop-types").Validator<boolean>;
                    upgradeDeadline: import("prop-types").Requireable<string>;
                    upgradeUrl: import("prop-types").Requireable<string>;
                }>>>;
                courseId: import("prop-types").Validator<string>;
                org: import("prop-types").Validator<string>;
                userTimezone: import("prop-types").Validator<string>;
                analyticsPageName: import("prop-types").Validator<string>;
            }>>>;
        };
    }>;
};
