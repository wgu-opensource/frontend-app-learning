export default CelebrationModal;
declare function CelebrationModal({ courseId, isOpen, onClose, ...rest }: {
    [x: string]: any;
    courseId: any;
    isOpen: any;
    onClose: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace CelebrationModal {
    namespace propTypes {
        const courseId: PropTypes.Validator<string>;
        const isOpen: PropTypes.Validator<boolean>;
        const onClose: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
