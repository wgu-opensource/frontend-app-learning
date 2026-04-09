export namespace UNIT_ICON_TYPES {
    const video: string;
    const problem: string;
    const vertical: string;
    const lock: string;
    const other: string;
}
export default UnitIcon;
declare function UnitIcon({ type, isCompleted, ...props }: {
    [x: string]: any;
    type: any;
    isCompleted: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace UnitIcon {
    namespace propTypes {
        const type: PropTypes.Validator<string>;
        const isCompleted: PropTypes.Validator<boolean>;
    }
}
import PropTypes from "prop-types";
