export default LearningGoalButton;
declare function LearningGoalButton({ level, isSelected, handleSelect, }: {
    level: any;
    isSelected: any;
    handleSelect: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace LearningGoalButton {
    namespace propTypes {
        const level: PropTypes.Validator<string>;
        const isSelected: PropTypes.Validator<boolean>;
        const handleSelect: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
