export default Footnote;
declare function Footnote({ icon, text }: {
    icon: any;
    text: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace Footnote {
    namespace propTypes {
        const icon: PropTypes.Validator<NonNullable<PropTypes.InferProps<{}>>>;
        const text: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
    }
}
import PropTypes from "prop-types";
