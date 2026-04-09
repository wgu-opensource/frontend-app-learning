export default BookmarkButton;
declare function BookmarkButton({ isBookmarked, isProcessing, unitId, }: {
    isBookmarked: any;
    isProcessing: any;
    unitId: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace BookmarkButton {
    namespace propTypes {
        const unitId: PropTypes.Validator<string>;
        const isBookmarked: PropTypes.Requireable<boolean>;
        const isProcessing: PropTypes.Validator<boolean>;
    }
    namespace defaultProps {
        const isBookmarked_1: boolean;
        export { isBookmarked_1 as isBookmarked };
    }
}
import PropTypes from "prop-types";
