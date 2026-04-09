export default PreviousButton;
declare function PreviousButton({ onClick, buttonLabel, previousLink, variant, buttonStyle, isFirstUnit, isAtTop, }: {
    onClick: any;
    buttonLabel: any;
    previousLink: any;
    variant: any;
    buttonStyle: any;
    isFirstUnit: any;
    isAtTop: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace PreviousButton {
    namespace propTypes {
        const onClick: PropTypes.Validator<(...args: any[]) => any>;
        const buttonLabel: PropTypes.Validator<string>;
        const previousLink: PropTypes.Validator<string>;
        const variant: PropTypes.Validator<string>;
        const buttonStyle: PropTypes.Validator<string>;
        const isFirstUnit: PropTypes.Validator<boolean>;
        const isAtTop: PropTypes.Validator<boolean>;
    }
}
import PropTypes from "prop-types";
