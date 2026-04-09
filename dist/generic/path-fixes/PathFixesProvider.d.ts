export default PathFixesProvider;
/**
 * We have seen evidence of learners hitting MFE pages with spaces instead of plus signs (which are used commonly
 * in our course keys). It's possible something out there is un-escaping our paths before sending learners to them.
 *
 * So this provider fixes those paths up and logs it so that we can try to fix the source.
 *
 * This might be temporary, based on how much we can fix the sources of these urls-with-spaces.
 */
declare function PathFixesProvider({ children }: {
    children: any;
}): any;
declare namespace PathFixesProvider {
    namespace propTypes {
        const children: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
    }
}
import PropTypes from "prop-types";
