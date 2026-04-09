import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useIntl } from '@edx/frontend-platform/i18n';
import CompletionDonutChart from './CompletionDonutChart';
import messages from './messages';
const CourseCompletion = () => {
    const intl = useIntl();
    return (_jsx("section", Object.assign({ className: "text-dark-700 mb-4 rounded raised-card p-4" }, { children: _jsxs("div", Object.assign({ className: "row w-100 m-0" }, { children: [_jsxs("div", Object.assign({ className: "col-12 col-sm-6 col-md-7 p-0" }, { children: [_jsx("h2", { children: intl.formatMessage(messages.courseCompletion) }), _jsx("p", Object.assign({ className: "small" }, { children: intl.formatMessage(messages.completionBody) }))] })), _jsx("div", Object.assign({ className: "col-12 col-sm-6 col-md-5 mt-sm-n3 p-0 text-center" }, { children: _jsx(CompletionDonutChart, {}) }))] })) })));
};
export default CourseCompletion;
//# sourceMappingURL=CourseCompletion.js.map