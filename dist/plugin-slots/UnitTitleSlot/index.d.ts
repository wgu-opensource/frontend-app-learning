export default UnitTitleSlot;
declare function UnitTitleSlot({ unitId, unit, renderUnitNavigation, }: {
    unitId: any;
    unit: any;
    renderUnitNavigation: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace UnitTitleSlot {
    namespace propTypes {
        const unitId: PropTypes.Validator<string>;
        const unit: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            id: PropTypes.Validator<string>;
            bookmarked: PropTypes.Validator<boolean>;
            title: PropTypes.Validator<string>;
            bookmarkedUpdateState: PropTypes.Validator<string>;
        }>>>;
        const renderUnitNavigation: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
