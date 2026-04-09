export default CoursewareSearchForm;
declare function CoursewareSearchForm({ searchTerm, onSubmit, onChange, placeholder, }: {
    searchTerm: any;
    onSubmit: any;
    onChange: any;
    placeholder: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace CoursewareSearchForm {
    namespace propTypes {
        const searchTerm: PropTypes.Requireable<string>;
        const onSubmit: PropTypes.Requireable<(...args: any[]) => any>;
        const onChange: PropTypes.Requireable<(...args: any[]) => any>;
        const placeholder: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const searchTerm_1: undefined;
        export { searchTerm_1 as searchTerm };
        const onSubmit_1: undefined;
        export { onSubmit_1 as onSubmit };
        const onChange_1: undefined;
        export { onChange_1 as onChange };
        const placeholder_1: undefined;
        export { placeholder_1 as placeholder };
    }
}
import PropTypes from "prop-types";
