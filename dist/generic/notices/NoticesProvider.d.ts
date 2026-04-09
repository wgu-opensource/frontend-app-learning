export default NoticesProvider;
/**
 * This component uses the platform-plugin-notices plugin to function.
 * If the user has an unacknowledged notice, they will be rerouted off
 * course home and onto a full-screen notice page. If the plugin is not
 * installed, or there are no notices, we just passthrough this component.
 */
declare function NoticesProvider({ children }: {
    children: any;
}): any;
declare namespace NoticesProvider {
    namespace propTypes {
        const children: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
    }
}
import PropTypes from "prop-types";
