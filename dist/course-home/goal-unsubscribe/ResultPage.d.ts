export default ResultPage;
declare function ResultPage({ courseTitle, error }: {
    courseTitle: any;
    error: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace ResultPage {
    namespace defaultProps {
        const courseTitle: null;
        const error: boolean;
    }
    namespace propTypes {
        const courseTitle_1: PropTypes.Requireable<string>;
        export { courseTitle_1 as courseTitle };
        const error_1: PropTypes.Requireable<boolean>;
        export { error_1 as error };
    }
}
import PropTypes from "prop-types";
