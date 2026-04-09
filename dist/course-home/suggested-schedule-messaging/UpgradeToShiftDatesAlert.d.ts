export default UpgradeToShiftDatesAlert;
declare function UpgradeToShiftDatesAlert({ logUpgradeLinkClick, model }: {
    logUpgradeLinkClick: any;
    model: any;
}): import("react/jsx-runtime").JSX.Element | null;
declare namespace UpgradeToShiftDatesAlert {
    namespace propTypes {
        const logUpgradeLinkClick: PropTypes.Requireable<(...args: any[]) => any>;
        const model: PropTypes.Validator<string>;
    }
    namespace defaultProps {
        export function logUpgradeLinkClick_1(): void;
        export { logUpgradeLinkClick_1 as logUpgradeLinkClick };
    }
}
import PropTypes from "prop-types";
