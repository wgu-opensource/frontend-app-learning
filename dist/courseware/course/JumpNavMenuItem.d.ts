export default JumpNavMenuItem;
declare function JumpNavMenuItem({ title, courseId, currentSequence, currentUnit, sequences, isDefault, onClick, }: {
    title: any;
    courseId: any;
    currentSequence: any;
    currentUnit: any;
    sequences: any;
    isDefault: any;
    onClick: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace JumpNavMenuItem {
    namespace defaultProps {
        const onClick: null;
    }
    namespace propTypes {
        export const title: PropTypes.Validator<string>;
        export const sequences: PropTypes.Validator<(PropTypes.InferProps<{
            id: PropTypes.Validator<string>;
        }> | null | undefined)[]>;
        export const isDefault: PropTypes.Validator<boolean>;
        export const courseId: PropTypes.Validator<string>;
        export const currentSequence: PropTypes.Validator<string>;
        export const currentUnit: PropTypes.Validator<string>;
        const onClick_1: PropTypes.Requireable<(...args: any[]) => any>;
        export { onClick_1 as onClick };
    }
}
import PropTypes from "prop-types";
