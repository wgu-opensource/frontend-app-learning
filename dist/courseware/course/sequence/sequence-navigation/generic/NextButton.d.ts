export default NextButton;
declare function NextButton({ onClickHandler, buttonText, nextLink, variant, buttonStyle, disabled, hasEffortEstimate, isAtTop, }: {
    onClickHandler: any;
    buttonText: any;
    nextLink: any;
    variant: any;
    buttonStyle: any;
    disabled: any;
    hasEffortEstimate: any;
    isAtTop: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace NextButton {
    namespace defaultProps {
        const hasEffortEstimate: boolean;
    }
    namespace propTypes {
        export const onClickHandler: PropTypes.Validator<(...args: any[]) => any>;
        export const buttonText: PropTypes.Validator<string>;
        export const nextLink: PropTypes.Validator<string>;
        export const variant: PropTypes.Validator<string>;
        export const buttonStyle: PropTypes.Validator<string>;
        export const disabled: PropTypes.Validator<boolean>;
        const hasEffortEstimate_1: PropTypes.Requireable<boolean>;
        export { hasEffortEstimate_1 as hasEffortEstimate };
        export const isAtTop: PropTypes.Validator<boolean>;
    }
}
import PropTypes from "prop-types";
