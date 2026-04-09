export default UpgradeFootnote;
declare function UpgradeFootnote({ deadline, href }: {
    deadline: any;
    href: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace UpgradeFootnote {
    namespace propTypes {
        const deadline: PropTypes.Validator<Date>;
        const href: PropTypes.Validator<string>;
    }
}
import PropTypes from "prop-types";
