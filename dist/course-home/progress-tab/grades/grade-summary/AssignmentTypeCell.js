import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Locked } from '@openedx/paragon/icons';
import { Icon } from '@openedx/paragon';
import { useContextId } from '../../../../data/hooks';
import { useModel } from '../../../../generic/model-store';
import messages from '../messages';
const AssignmentTypeCell = ({ assignmentType, footnoteMarker, footnoteId, locked, }) => {
    const intl = useIntl();
    const courseId = useContextId();
    const { gradesFeatureIsFullyLocked, } = useModel('progress', courseId);
    const lockedIcon = locked ? _jsx(Icon, { id: `assignmentTypeBlockedIcon${assignmentType}`, "aria-label": intl.formatMessage(messages.noAccessToAssignmentType, { assignmentType }), className: "mr-1 mt-1 d-inline-flex", style: { height: '1rem', width: '1rem' }, src: Locked, "data-testid": "locked-icon" }) : '';
    return (_jsxs("div", Object.assign({ className: "d-flex small" }, { children: [_jsx("div", Object.assign({ className: "d-flex" }, { children: lockedIcon })), _jsxs("div", { children: [assignmentType, "\u00A0", footnoteId && footnoteMarker && (_jsx("sup", { children: _jsx("a", Object.assign({ id: `${footnoteId}-ref`, className: "muted-link", href: `#${footnoteId}-footnote`, "aria-describedby": "grade-summary-footnote-label", tabIndex: gradesFeatureIsFullyLocked ? '-1' : '0', "aria-labelledby": `assignmentTypeBlockedIcon${assignmentType}` }, { children: footnoteMarker })) }))] })] })));
};
AssignmentTypeCell.propTypes = {
    assignmentType: PropTypes.string.isRequired,
    footnoteId: PropTypes.string,
    footnoteMarker: PropTypes.number,
    locked: PropTypes.bool,
};
AssignmentTypeCell.defaultProps = {
    footnoteId: '',
    footnoteMarker: null,
    locked: false,
};
export default AssignmentTypeCell;
//# sourceMappingURL=AssignmentTypeCell.js.map