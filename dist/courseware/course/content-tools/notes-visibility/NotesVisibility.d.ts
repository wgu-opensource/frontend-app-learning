export default NotesVisibility;
declare function NotesVisibility({ course }: {
    course: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace NotesVisibility {
    namespace propTypes {
        const course: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            id: PropTypes.Validator<string>;
            notes: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
                visible: PropTypes.Requireable<boolean>;
            }>>>;
        }>>>;
    }
}
import PropTypes from "prop-types";
