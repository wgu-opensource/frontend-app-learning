export default Sequence;
declare function Sequence({ unitId, sequenceId, courseId, unitNavigationHandler, nextSequenceHandler, previousSequenceHandler, }: {
    unitId: any;
    sequenceId: any;
    courseId: any;
    unitNavigationHandler: any;
    nextSequenceHandler: any;
    previousSequenceHandler: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace Sequence {
    namespace propTypes {
        const unitId: PropTypes.Requireable<string>;
        const sequenceId: PropTypes.Requireable<string>;
        const courseId: PropTypes.Validator<string>;
        const unitNavigationHandler: PropTypes.Validator<(...args: any[]) => any>;
        const nextSequenceHandler: PropTypes.Validator<(...args: any[]) => any>;
        const previousSequenceHandler: PropTypes.Validator<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const sequenceId_1: null;
        export { sequenceId_1 as sequenceId };
        const unitId_1: null;
        export { unitId_1 as unitId };
    }
}
import PropTypes from "prop-types";
