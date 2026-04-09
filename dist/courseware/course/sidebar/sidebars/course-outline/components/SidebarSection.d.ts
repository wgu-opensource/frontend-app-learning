export default SidebarSection;
declare function SidebarSection({ section, handleSelectSection }: {
    section: any;
    handleSelectSection: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace SidebarSection {
    namespace propTypes {
        const section: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            complete: PropTypes.Requireable<boolean>;
            id: PropTypes.Requireable<string>;
            title: PropTypes.Requireable<string>;
            sequenceIds: PropTypes.Requireable<(string | null | undefined)[]>;
            completionStat: PropTypes.Requireable<PropTypes.InferProps<{
                completed: PropTypes.Requireable<number>;
                total: PropTypes.Requireable<number>;
            }>>;
        }>>>;
        const handleSelectSection: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
