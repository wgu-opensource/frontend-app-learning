export default SocialIcons;
declare function SocialIcons({ analyticsId, className, courseId, emailBody, emailSubject, hashtags, socialMessage, }: {
    analyticsId: any;
    className: any;
    courseId: any;
    emailBody: any;
    emailSubject: any;
    hashtags: any;
    socialMessage: any;
}): import("react/jsx-runtime").JSX.Element | null;
declare namespace SocialIcons {
    namespace defaultProps {
        const analyticsId: string;
        const className: string;
        const emailBody: {
            id: string;
            defaultMessage: string;
            description: string;
        };
        const emailSubject: null;
        const hashtags: any[];
        const socialMessage: null;
    }
    namespace propTypes {
        const analyticsId_1: PropTypes.Requireable<string>;
        export { analyticsId_1 as analyticsId };
        const className_1: PropTypes.Requireable<string>;
        export { className_1 as className };
        export const courseId: PropTypes.Validator<string>;
        const emailBody_1: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        export { emailBody_1 as emailBody };
        const emailSubject_1: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        export { emailSubject_1 as emailSubject };
        const hashtags_1: PropTypes.Requireable<(string | null | undefined)[]>;
        export { hashtags_1 as hashtags };
        const socialMessage_1: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        export { socialMessage_1 as socialMessage };
    }
}
import PropTypes from "prop-types";
