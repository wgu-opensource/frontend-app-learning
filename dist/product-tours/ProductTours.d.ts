export default ProductTours;
declare function ProductTours({ activeTab, courseId, isStreakCelebrationOpen, org, }: {
    activeTab: any;
    courseId: any;
    isStreakCelebrationOpen: any;
    org: any;
}): import("react/jsx-runtime").JSX.Element | null;
declare namespace ProductTours {
    namespace propTypes {
        const activeTab: PropTypes.Validator<string>;
        const courseId: PropTypes.Validator<string>;
        const isStreakCelebrationOpen: PropTypes.Validator<boolean>;
        const org: PropTypes.Validator<string>;
    }
}
import PropTypes from "prop-types";
