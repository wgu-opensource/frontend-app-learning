export default AssignmentTypeCell;
declare function AssignmentTypeCell({ assignmentType, footnoteMarker, footnoteId, locked, }: {
    assignmentType: any;
    footnoteMarker: any;
    footnoteId: any;
    locked: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace AssignmentTypeCell {
    namespace propTypes {
        const assignmentType: PropTypes.Validator<string>;
        const footnoteId: PropTypes.Requireable<string>;
        const footnoteMarker: PropTypes.Requireable<number>;
        const locked: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const footnoteId_1: string;
        export { footnoteId_1 as footnoteId };
        const footnoteMarker_1: null;
        export { footnoteMarker_1 as footnoteMarker };
        const locked_1: boolean;
        export { locked_1 as locked };
    }
}
import PropTypes from "prop-types";
