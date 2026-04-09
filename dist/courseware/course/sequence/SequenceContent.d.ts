export default SequenceContent;
declare function SequenceContent({ gated, courseId, sequenceId, unitId, unitLoadedHandler, isOriginalUserStaff, renderUnitNavigation, }: {
    gated: any;
    courseId: any;
    sequenceId: any;
    unitId: any;
    unitLoadedHandler: any;
    isOriginalUserStaff: any;
    renderUnitNavigation: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace SequenceContent {
    namespace propTypes {
        const gated: PropTypes.Validator<boolean>;
        const courseId: PropTypes.Validator<string>;
        const sequenceId: PropTypes.Validator<string>;
        const unitId: PropTypes.Requireable<string>;
        const unitLoadedHandler: PropTypes.Validator<(...args: any[]) => any>;
        const isOriginalUserStaff: PropTypes.Validator<boolean>;
        const renderUnitNavigation: PropTypes.Validator<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const unitId_1: null;
        export { unitId_1 as unitId };
    }
}
import PropTypes from "prop-types";
