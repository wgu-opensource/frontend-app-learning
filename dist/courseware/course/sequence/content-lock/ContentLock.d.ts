export default ContentLock;
declare function ContentLock({ courseId, prereqSectionName, prereqId, sequenceTitle, }: {
    courseId: any;
    prereqSectionName: any;
    prereqId: any;
    sequenceTitle: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace ContentLock {
    namespace propTypes {
        const courseId: PropTypes.Validator<string>;
        const prereqSectionName: PropTypes.Validator<string>;
        const prereqId: PropTypes.Validator<string>;
        const sequenceTitle: PropTypes.Validator<string>;
    }
}
import PropTypes from "prop-types";
