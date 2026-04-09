export default DroppableAssignmentFootnote;
declare function DroppableAssignmentFootnote({ footnotes }: {
    footnotes: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace DroppableAssignmentFootnote {
    namespace propTypes {
        const footnotes: PropTypes.Validator<(PropTypes.InferProps<{
            assignmentType: PropTypes.Validator<string>;
            id: PropTypes.Validator<string>;
            numDroppable: PropTypes.Validator<number>;
        }> | null | undefined)[]>;
    }
}
import PropTypes from "prop-types";
