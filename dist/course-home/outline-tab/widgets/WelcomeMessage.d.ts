export default WelcomeMessage;
declare function WelcomeMessage({ courseId, nextElementRef }: {
    courseId: any;
    nextElementRef: any;
}): import("react/jsx-runtime").JSX.Element | null;
declare namespace WelcomeMessage {
    namespace propTypes {
        const courseId: PropTypes.Validator<string>;
        const nextElementRef: PropTypes.Requireable<PropTypes.InferProps<{
            current: PropTypes.Requireable<HTMLInputElement>;
        }>>;
    }
}
import PropTypes from "prop-types";
