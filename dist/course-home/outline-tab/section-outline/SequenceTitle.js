import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useIntl } from '@edx/frontend-platform/i18n';
import { Link } from 'react-router-dom';
import { Icon } from '@openedx/paragon';
import { CheckCircleOutline, CheckCircle } from '@openedx/paragon/icons';
import EffortEstimate from '../../../shared/effort-estimate';
import messages from '../messages';
import { useContextId } from '../../../data/hooks';
const SequenceTitle = ({ complete, showLink, title, sequence, id, }) => {
    const intl = useIntl();
    const courseId = useContextId();
    const coursewareUrl = _jsx(Link, Object.assign({ to: `/course/${courseId}/${id}` }, { children: title }));
    const displayTitle = showLink ? coursewareUrl : title;
    return (_jsxs("div", Object.assign({ className: "row w-100 m-0" }, { children: [_jsx("div", Object.assign({ className: "col-auto p-0" }, { children: complete ? (_jsx(Icon, { src: CheckCircle, className: "float-left text-success mt-1", "aria-hidden": complete, svgAttrs: { 'aria-label': intl.formatMessage(messages.completedAssignment) }, size: "sm" })) : (_jsx(Icon, { src: CheckCircleOutline, className: "float-left text-gray-400 mt-1", "aria-hidden": complete, svgAttrs: { 'aria-label': intl.formatMessage(messages.incompleteAssignment) }, size: "sm" })) })), _jsxs("div", Object.assign({ className: "col-10 p-0 ml-3 text-break" }, { children: [_jsx("span", Object.assign({ className: "align-middle" }, { children: displayTitle })), _jsxs("span", Object.assign({ className: "sr-only" }, { children: [", ", intl.formatMessage(complete ? messages.completedAssignment : messages.incompleteAssignment)] })), _jsx(EffortEstimate, { className: "ml-3 align-middle", block: sequence })] }))] })));
};
export default SequenceTitle;
//# sourceMappingURL=SequenceTitle.js.map