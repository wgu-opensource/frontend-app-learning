export default UpgradeNowButton;
declare function UpgradeNowButton(props: any): import("react/jsx-runtime").JSX.Element;
declare namespace UpgradeNowButton {
    namespace defaultProps {
        const offer: null;
        const onClick: null;
        const variant: string;
    }
    namespace propTypes {
        const offer_1: PropTypes.Requireable<PropTypes.InferProps<{
            upgradeUrl: PropTypes.Validator<string>;
        }>>;
        export { offer_1 as offer };
        const onClick_1: PropTypes.Requireable<(...args: any[]) => any>;
        export { onClick_1 as onClick };
        export const verifiedMode: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            upgradeUrl: PropTypes.Validator<string>;
        }>>>;
        const variant_1: PropTypes.Requireable<string>;
        export { variant_1 as variant };
    }
}
import PropTypes from "prop-types";
