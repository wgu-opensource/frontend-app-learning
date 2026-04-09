export default SequenceNavigationDropdown;
declare function SequenceNavigationDropdown({ unitId, onNavigate, showCompletion, unitIds, }: {
    unitId: any;
    onNavigate: any;
    showCompletion: any;
    unitIds: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace SequenceNavigationDropdown {
    namespace propTypes {
        const unitId: PropTypes.Validator<string>;
        const onNavigate: PropTypes.Validator<(...args: any[]) => any>;
        const showCompletion: PropTypes.Validator<boolean>;
        const unitIds: PropTypes.Validator<(string | null | undefined)[]>;
    }
}
import PropTypes from "prop-types";
