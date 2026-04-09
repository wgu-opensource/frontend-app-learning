export default CourseTabsNavigation;
declare function CourseTabsNavigation({ activeTabSlug, className, tabs, }: {
    activeTabSlug: any;
    className: any;
    tabs: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace CourseTabsNavigation {
    namespace propTypes {
        const activeTabSlug: PropTypes.Requireable<string>;
        const className: PropTypes.Requireable<string>;
        const tabs: PropTypes.Validator<(PropTypes.InferProps<{
            title: PropTypes.Validator<string>;
            slug: PropTypes.Validator<string>;
            url: PropTypes.Validator<string>;
        }> | null | undefined)[]>;
    }
    namespace defaultProps {
        const activeTabSlug_1: undefined;
        export { activeTabSlug_1 as activeTabSlug };
        const className_1: null;
        export { className_1 as className };
    }
}
import PropTypes from "prop-types";
