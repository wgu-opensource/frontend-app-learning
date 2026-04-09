export default SidebarSequence;
declare function SidebarSequence({ courseId, defaultOpen, sequence, activeUnitId, }: {
    courseId: any;
    defaultOpen: any;
    sequence: any;
    activeUnitId: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace SidebarSequence {
    namespace propTypes {
        const courseId: PropTypes.Validator<string>;
        const defaultOpen: PropTypes.Validator<boolean>;
        const sequence: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            complete: PropTypes.Requireable<boolean>;
            id: PropTypes.Requireable<string>;
            title: PropTypes.Requireable<string>;
            type: PropTypes.Requireable<string>;
            specialExamInfo: PropTypes.Requireable<string>;
            unitIds: PropTypes.Requireable<(string | null | undefined)[]>;
            completionStat: PropTypes.Requireable<PropTypes.InferProps<{
                completed: PropTypes.Requireable<number>;
                total: PropTypes.Requireable<number>;
            }>>;
        }>>>;
        const activeUnitId: PropTypes.Validator<string>;
    }
}
import PropTypes from "prop-types";
