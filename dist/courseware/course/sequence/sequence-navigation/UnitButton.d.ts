declare const _default: import("react-redux").ConnectedComponent<{
    ({ onClick, title, contentType, isActive, bookmarked, complete, showCompletion, unitId, className, showTitle, }: {
        onClick: any;
        title: any;
        contentType: any;
        isActive: any;
        bookmarked: any;
        complete: any;
        showCompletion: any;
        unitId: any;
        className: any;
        showTitle: any;
    }): import("react/jsx-runtime").JSX.Element;
    propTypes: {
        bookmarked: PropTypes.Requireable<boolean>;
        className: PropTypes.Requireable<string>;
        complete: PropTypes.Requireable<boolean>;
        contentType: PropTypes.Validator<string>;
        isActive: PropTypes.Requireable<boolean>;
        onClick: PropTypes.Validator<(...args: any[]) => any>;
        showCompletion: PropTypes.Requireable<boolean>;
        showTitle: PropTypes.Requireable<boolean>;
        title: PropTypes.Validator<string>;
        unitId: PropTypes.Validator<string>;
    };
    defaultProps: {
        className: undefined;
        isActive: boolean;
        bookmarked: boolean;
        complete: boolean;
        showTitle: boolean;
        showCompletion: boolean;
    };
}, any>;
export default _default;
import PropTypes from "prop-types";
