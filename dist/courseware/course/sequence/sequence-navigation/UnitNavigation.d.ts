export default UnitNavigation;
declare function UnitNavigation({ sequenceId, unitId, onClickPrevious, onClickNext, isAtTop, courseId, }: {
    sequenceId: any;
    unitId: any;
    onClickPrevious: any;
    onClickNext: any;
    isAtTop: any;
    courseId: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace UnitNavigation {
    namespace propTypes {
        const courseId: PropTypes.Validator<string>;
        const sequenceId: PropTypes.Validator<string>;
        const unitId: PropTypes.Requireable<string>;
        const onClickPrevious: PropTypes.Validator<(...args: any[]) => any>;
        const onClickNext: PropTypes.Validator<(...args: any[]) => any>;
        const isAtTop: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const unitId_1: null;
        export { unitId_1 as unitId };
        const isAtTop_1: boolean;
        export { isAtTop_1 as isAtTop };
    }
}
import PropTypes from "prop-types";
