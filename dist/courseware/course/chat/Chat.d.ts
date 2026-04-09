export default Chat;
declare function Chat({ enabled, enrollmentMode, isStaff, courseId, contentToolsEnabled, unitId, }: {
    enabled: any;
    enrollmentMode: any;
    isStaff: any;
    courseId: any;
    contentToolsEnabled: any;
    unitId: any;
}): any;
declare namespace Chat {
    namespace propTypes {
        const isStaff: PropTypes.Validator<boolean>;
        const enabled: PropTypes.Validator<boolean>;
        const enrollmentMode: PropTypes.Requireable<string>;
        const courseId: PropTypes.Validator<string>;
        const contentToolsEnabled: PropTypes.Validator<boolean>;
        const unitId: PropTypes.Validator<string>;
    }
    namespace defaultProps {
        const enrollmentMode_1: null;
        export { enrollmentMode_1 as enrollmentMode };
    }
}
import PropTypes from "prop-types";
