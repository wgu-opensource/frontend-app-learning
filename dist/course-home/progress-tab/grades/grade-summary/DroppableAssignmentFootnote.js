import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useContextId } from '../../../../data/hooks';
import messages from '../messages';
import { useModel } from '../../../../generic/model-store';
const DroppableAssignmentFootnote = ({ footnotes }) => {
    const intl = useIntl();
    const courseId = useContextId();
    const { gradesFeatureIsFullyLocked, } = useModel('progress', courseId);
    return (_jsxs(_Fragment, { children: [_jsx("span", Object.assign({ id: "grade-summary-footnote-label", className: "sr-only" }, { children: intl.formatMessage(messages.footnotesTitle) })), _jsx("ul", Object.assign({ className: "list-unstyled mt-2" }, { children: footnotes.map((footnote, index) => (_jsxs("li", Object.assign({ id: `${footnote.id}-footnote`, className: "x-small mt-1" }, { children: [_jsx("sup", { children: index + 1 }), intl.formatMessage(messages.droppableAssignmentsText, {
                            numDroppable: footnote.numDroppable,
                            assignmentType: footnote.assignmentType,
                        }), _jsx("a", Object.assign({ className: "sr-only", href: `#${footnote.id}-ref`, tabIndex: gradesFeatureIsFullyLocked ? '-1' : '0' }, { children: intl.formatMessage(messages.backToContent) }))] }), footnote.id))) }))] }));
};
DroppableAssignmentFootnote.propTypes = {
    footnotes: PropTypes.arrayOf(PropTypes.shape({
        assignmentType: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        numDroppable: PropTypes.number.isRequired,
    })).isRequired,
};
export default DroppableAssignmentFootnote;
//# sourceMappingURL=DroppableAssignmentFootnote.js.map