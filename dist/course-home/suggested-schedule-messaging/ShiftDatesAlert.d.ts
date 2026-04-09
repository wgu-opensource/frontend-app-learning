export default ShiftDatesAlert;
declare function ShiftDatesAlert({ fetch, model }: {
    fetch: any;
    model: any;
}): import("react/jsx-runtime").JSX.Element | null;
declare namespace ShiftDatesAlert {
    namespace propTypes {
        const fetch: PropTypes.Validator<(...args: any[]) => any>;
        const model: PropTypes.Validator<string>;
    }
}
import PropTypes from "prop-types";
