export default SequenceNavigation;
declare function SequenceNavigation({ unitId, sequenceId, className, onNavigate, nextHandler, previousHandler, }: {
    unitId: any;
    sequenceId: any;
    className: any;
    onNavigate: any;
    nextHandler: any;
    previousHandler: any;
}): import("react/jsx-runtime").JSX.Element | null;
declare namespace SequenceNavigation {
    namespace propTypes {
        const sequenceId: PropTypes.Validator<string>;
        const unitId: PropTypes.Requireable<string>;
        const className: PropTypes.Requireable<string>;
        const onNavigate: PropTypes.Validator<(...args: any[]) => any>;
        const nextHandler: PropTypes.Validator<(...args: any[]) => any>;
        const previousHandler: PropTypes.Validator<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const className_1: null;
        export { className_1 as className };
        const unitId_1: null;
        export { unitId_1 as unitId };
    }
}
import PropTypes from "prop-types";
