export default LmsHtmlFragment;
declare function LmsHtmlFragment({ className, html, title, ...rest }: {
    [x: string]: any;
    className: any;
    html: any;
    title: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace LmsHtmlFragment {
    namespace defaultProps {
        const className: string;
    }
    namespace propTypes {
        const className_1: PropTypes.Requireable<string>;
        export { className_1 as className };
        export const html: PropTypes.Validator<string>;
        export const title: PropTypes.Validator<string>;
    }
}
import PropTypes from "prop-types";
