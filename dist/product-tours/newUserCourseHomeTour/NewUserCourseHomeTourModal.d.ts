export default NewUserCourseHomeTourModal;
declare function NewUserCourseHomeTourModal({ isOpen, onDismiss, onStartTour, }: {
    isOpen: any;
    onDismiss: any;
    onStartTour: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace NewUserCourseHomeTourModal {
    namespace propTypes {
        const isOpen: PropTypes.Validator<boolean>;
        const onDismiss: PropTypes.Validator<(...args: any[]) => any>;
        const onStartTour: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
