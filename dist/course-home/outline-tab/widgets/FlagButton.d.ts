export default FlagButton;
declare function FlagButton({ buttonIcon, title, text, handleSelect, isSelected, }: {
    buttonIcon: any;
    title: any;
    text: any;
    handleSelect: any;
    isSelected: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace FlagButton {
    namespace propTypes {
        const buttonIcon: PropTypes.Validator<PropTypes.ReactElementLike>;
        const title: PropTypes.Validator<string>;
        const text: PropTypes.Validator<string>;
        const handleSelect: PropTypes.Validator<(...args: any[]) => any>;
        const isSelected: PropTypes.Validator<boolean>;
    }
}
import PropTypes from "prop-types";
