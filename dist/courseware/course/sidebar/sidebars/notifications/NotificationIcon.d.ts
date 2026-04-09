export default NotificationIcon;
declare function NotificationIcon({ status, notificationColor, }: {
    status: any;
    notificationColor: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace NotificationIcon {
    namespace defaultProps {
        const status: null;
    }
    namespace propTypes {
        const status_1: PropTypes.Requireable<string>;
        export { status_1 as status };
        export const notificationColor: PropTypes.Validator<string>;
    }
}
import PropTypes from "prop-types";
