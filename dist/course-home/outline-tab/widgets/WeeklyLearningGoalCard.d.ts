export default WeeklyLearningGoalCard;
declare function WeeklyLearningGoalCard({ daysPerWeek, subscribedToReminders, }: {
    daysPerWeek: any;
    subscribedToReminders: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace WeeklyLearningGoalCard {
    namespace propTypes {
        const daysPerWeek: PropTypes.Requireable<number>;
        const subscribedToReminders: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const daysPerWeek_1: null;
        export { daysPerWeek_1 as daysPerWeek };
        const subscribedToReminders_1: boolean;
        export { subscribedToReminders_1 as subscribedToReminders };
    }
}
import PropTypes from "prop-types";
