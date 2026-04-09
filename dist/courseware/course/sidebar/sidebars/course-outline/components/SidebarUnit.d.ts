export default SidebarUnit;
declare function SidebarUnit({ id, courseId, sequenceId, isFirst, unit, isActive, isLocked, activeUnitId, isCompletionTrackingEnabled, }: {
    id: any;
    courseId: any;
    sequenceId: any;
    isFirst: any;
    unit: any;
    isActive: any;
    isLocked: any;
    activeUnitId: any;
    isCompletionTrackingEnabled: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace SidebarUnit {
    namespace propTypes {
        const id: PropTypes.Validator<string>;
        const isFirst: PropTypes.Validator<boolean>;
        const unit: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            complete: PropTypes.Requireable<boolean>;
            icon: PropTypes.Requireable<string>;
            id: PropTypes.Requireable<string>;
            title: PropTypes.Requireable<string>;
            type: PropTypes.Requireable<string>;
        }>>>;
        const isActive: PropTypes.Validator<boolean>;
        const isLocked: PropTypes.Validator<boolean>;
        const courseId: PropTypes.Validator<string>;
        const sequenceId: PropTypes.Validator<string>;
        const activeUnitId: PropTypes.Validator<string>;
        const isCompletionTrackingEnabled: PropTypes.Validator<boolean>;
    }
}
import PropTypes from "prop-types";
