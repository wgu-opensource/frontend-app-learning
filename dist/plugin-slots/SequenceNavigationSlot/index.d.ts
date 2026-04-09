export default SequenceNavigationSlot;
declare function SequenceNavigationSlot({ sequenceId, unitId, nextHandler, onNavigate, previousHandler, }: {
    sequenceId: any;
    unitId: any;
    nextHandler: any;
    onNavigate: any;
    previousHandler: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace SequenceNavigationSlot {
    namespace propTypes {
        const sequenceId: PropTypes.Validator<string>;
        const unitId: PropTypes.Validator<string>;
        const nextHandler: PropTypes.Validator<(...args: any[]) => any>;
        const onNavigate: PropTypes.Validator<(...args: any[]) => any>;
        const previousHandler: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
