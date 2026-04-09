export default LoadedTabPage;
declare function LoadedTabPage({ activeTabSlug, children, courseId, metadataModel, unitId, }: {
    activeTabSlug: any;
    children: any;
    courseId: any;
    metadataModel: any;
    unitId: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace LoadedTabPage {
    namespace propTypes {
        const activeTabSlug: PropTypes.Validator<string>;
        const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        const courseId: PropTypes.Validator<string>;
        const metadataModel: PropTypes.Requireable<string>;
        const unitId: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const children_1: null;
        export { children_1 as children };
        const metadataModel_1: string;
        export { metadataModel_1 as metadataModel };
        const unitId_1: null;
        export { unitId_1 as unitId };
    }
}
import PropTypes from "prop-types";
