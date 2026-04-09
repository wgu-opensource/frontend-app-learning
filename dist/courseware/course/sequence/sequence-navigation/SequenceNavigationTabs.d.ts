export default SequenceNavigationTabs;
declare function SequenceNavigationTabs({ unitIds, unitId, showCompletion, onNavigate, }: {
    unitIds: any;
    unitId: any;
    showCompletion: any;
    onNavigate: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace SequenceNavigationTabs {
    namespace propTypes {
        const unitId: PropTypes.Validator<string>;
        const onNavigate: PropTypes.Validator<(...args: any[]) => any>;
        const showCompletion: PropTypes.Validator<boolean>;
        const unitIds: PropTypes.Validator<(string | null | undefined)[]>;
    }
}
import PropTypes from "prop-types";
