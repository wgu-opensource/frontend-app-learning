export default SequenceContainerSlot;
declare function SequenceContainerSlot({ courseId, unitId }: {
    courseId: any;
    unitId: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace SequenceContainerSlot {
    namespace propTypes {
        const courseId: PropTypes.Validator<string>;
        const unitId: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const unitId_1: null;
        export { unitId_1 as unitId };
    }
}
import PropTypes from "prop-types";
