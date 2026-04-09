export default WeeklyGoalCelebrationModal;
declare function WeeklyGoalCelebrationModal({ courseId, daysPerWeek, isOpen, onClose, ...rest }: {
    [x: string]: any;
    courseId: any;
    daysPerWeek: any;
    isOpen: any;
    onClose: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace WeeklyGoalCelebrationModal {
    namespace propTypes {
        const courseId: PropTypes.Validator<string>;
        const daysPerWeek: PropTypes.Validator<number>;
        const isOpen: PropTypes.Validator<boolean>;
        const onClose: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
