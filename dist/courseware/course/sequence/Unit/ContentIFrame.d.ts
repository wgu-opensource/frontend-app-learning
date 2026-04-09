/**
 * Feature policy for iframe, allowing access to certain courseware-related media.
 *
 * We must use the wildcard (*) origin for each feature, as courseware content
 * may be embedded in external iframes. Notably, xblock-lti-consumer is a popular
 * block that iframes external course content.

 * This policy was selected in conference with the edX Security Working Group.
 * Changes to it should be vetted by them (security@edx.org).
 */
export const IFRAME_FEATURE_POLICY: "microphone *; camera *; midi *; geolocation *; encrypted-media *; clipboard-write *; autoplay *";
export namespace testIDs {
    const contentIFrame: string;
    const modalIFrame: string;
}
export default ContentIFrame;
declare function ContentIFrame({ iframeUrl, shouldShowContent, loadingMessage, id, elementId, onLoaded, title, courseId, }: {
    iframeUrl: any;
    shouldShowContent: any;
    loadingMessage: any;
    id: any;
    elementId: any;
    onLoaded: any;
    title: any;
    courseId: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace ContentIFrame {
    namespace propTypes {
        const iframeUrl: PropTypes.Requireable<string>;
        const id: PropTypes.Validator<string>;
        const shouldShowContent: PropTypes.Validator<boolean>;
        const loadingMessage: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        const elementId: PropTypes.Validator<string>;
        const onLoaded: PropTypes.Requireable<(...args: any[]) => any>;
        const title: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        const courseId: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const iframeUrl_1: null;
        export { iframeUrl_1 as iframeUrl };
        export function onLoaded_1(): {};
        export { onLoaded_1 as onLoaded };
        const courseId_1: string;
        export { courseId_1 as courseId };
    }
}
import PropTypes from "prop-types";
