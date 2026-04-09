export default FormattedPricing;
declare function FormattedPricing(props: any): string | import("react/jsx-runtime").JSX.Element;
declare namespace FormattedPricing {
    namespace defaultProps {
        const inline: boolean;
        const offer: null;
        const verifiedMode: null;
    }
    namespace propTypes {
        const inline_1: PropTypes.Requireable<boolean>;
        export { inline_1 as inline };
        const offer_1: PropTypes.Requireable<PropTypes.InferProps<{
            discountedPrice: PropTypes.Validator<string>;
            originalPrice: PropTypes.Validator<string>;
            upgradeUrl: PropTypes.Validator<string>;
        }>>;
        export { offer_1 as offer };
        const verifiedMode_1: PropTypes.Requireable<PropTypes.InferProps<{
            currencySymbol: PropTypes.Validator<string>;
            price: PropTypes.Validator<number>;
            upgradeUrl: PropTypes.Validator<string>;
        }>>;
        export { verifiedMode_1 as verifiedMode };
    }
}
import PropTypes from "prop-types";
