export default Unit;
declare function Unit({ courseId, format, onLoaded, id, isOriginalUserStaff, renderUnitNavigation, }: {
    courseId: any;
    format: any;
    onLoaded: any;
    id: any;
    isOriginalUserStaff: any;
    renderUnitNavigation: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace Unit {
    namespace propTypes {
        const courseId: PropTypes.Validator<string>;
        const format: PropTypes.Requireable<string>;
        const id: PropTypes.Validator<string>;
        const onLoaded: PropTypes.Requireable<(...args: any[]) => any>;
        const isOriginalUserStaff: PropTypes.Validator<boolean>;
        const renderUnitNavigation: PropTypes.Validator<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const format_1: null;
        export { format_1 as format };
        const onLoaded_1: undefined;
        export { onLoaded_1 as onLoaded };
    }
}
import PropTypes from "prop-types";
