export default CourseLicense;
declare function CourseLicense({ license, }: {
    license: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace CourseLicense {
    namespace propTypes {
        const license: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const license_1: string;
        export { license_1 as license };
    }
}
import PropTypes from "prop-types";
