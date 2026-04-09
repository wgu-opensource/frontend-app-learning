import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useIntl } from '@edx/frontend-platform/i18n';
import { Icon } from '@openedx/paragon';
import { CheckCircle, CheckCircleOutline, DisabledVisible } from '@openedx/paragon/icons';
import messages from '../messages';
const SectionTitle = ({ complete, hideFromTOC, title }) => {
    const intl = useIntl();
    return (_jsxs("div", Object.assign({ className: "d-flex row w-100 m-0" }, { children: [_jsx("div", Object.assign({ className: "col-auto p-0" }, { children: complete ? (_jsx(Icon, { src: CheckCircle, className: "float-left mt-1 text-success", "aria-hidden": "true", svgAttrs: { 'aria-label': intl.formatMessage(messages.completedSection) }, size: "sm" })) : (_jsx(Icon, { src: CheckCircleOutline, className: "float-left mt-1 text-gray-400", "aria-hidden": "true", svgAttrs: { 'aria-label': intl.formatMessage(messages.incompleteSection) }, size: "sm" })) })), _jsxs("div", Object.assign({ className: "col-7 ml-3 p-0 font-weight-bold text-dark-500" }, { children: [_jsx("span", Object.assign({ className: "align-middle col-6" }, { children: title })), _jsxs("span", Object.assign({ className: "sr-only" }, { children: [", ", intl.formatMessage(complete ? messages.completedSection : messages.incompleteSection)] }))] })), hideFromTOC && (_jsx("div", Object.assign({ className: "row" }, { children: hideFromTOC && (_jsxs("span", Object.assign({ className: "small d-flex align-content-end" }, { children: [_jsx(Icon, { className: "mr-2", src: DisabledVisible, "data-testid": "hide-from-toc-section-icon" }), _jsx("span", Object.assign({ "data-testid": "hide-from-toc-section-text" }, { children: intl.formatMessage(messages.hiddenSection) }))] }))) })))] })));
};
export default SectionTitle;
//# sourceMappingURL=SectionTitle.js.map