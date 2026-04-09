export default TabPage;
declare function TabPage(props: any): import("react/jsx-runtime").JSX.Element;
declare namespace TabPage {
    namespace defaultProps {
        const courseId: null;
        const unitId: null;
    }
    namespace propTypes {
        export const activeTabSlug: PropTypes.Validator<string>;
        const courseId_1: PropTypes.Requireable<string>;
        export { courseId_1 as courseId };
        export const courseStatus: PropTypes.Validator<string>;
        export const metadataModel: PropTypes.Validator<string>;
        const unitId_1: PropTypes.Requireable<string>;
        export { unitId_1 as unitId };
    }
}
import PropTypes from "prop-types";
