import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { CheckCircle, WarningFilled, WatchFilled } from '@openedx/paragon/icons';
import { Hyperlink, Icon } from '@openedx/paragon';
import { useContextId } from '../../../data/hooks';
import { useModel } from '../../../generic/model-store';
import { DashboardLink } from '../../../shared/links';
import messages from './messages';
const CreditInformation = () => {
    const intl = useIntl();
    const courseId = useContextId();
    const { creditCourseRequirements, } = useModel('progress', courseId);
    if (!creditCourseRequirements) {
        return null;
    }
    let eligibilityStatus;
    let requirementStatus;
    const requirements = [];
    const dashboardLink = _jsx(DashboardLink, {});
    const creditLink = (_jsx(Hyperlink, Object.assign({ variant: "muted", isInline: true, destination: getConfig().CREDIT_HELP_LINK_URL }, { children: intl.formatMessage(messages.courseCredit) })));
    switch (creditCourseRequirements.eligibilityStatus) {
        case 'not_eligible':
            eligibilityStatus = intl.formatMessage(messages.creditNotEligibleStatus, { creditLink });
            break;
        case 'eligible':
            eligibilityStatus = intl.formatMessage(messages.creditEligibleStatus, { dashboardLink, creditLink });
            break;
        case 'partial_eligible':
            eligibilityStatus = intl.formatMessage(messages.creditPartialEligibleStatus, { creditLink });
            break;
        default:
            break;
    }
    creditCourseRequirements.requirements.forEach(requirement => {
        switch (requirement.status) {
            case 'submitted':
                requirementStatus = (_jsxs(_Fragment, { children: [intl.formatMessage(messages.verificationSubmitted), " ", _jsx(Icon, { src: CheckCircle, className: "text-success-500 d-inline-flex align-bottom" })] }));
                break;
            case 'failed':
            case 'declined':
                requirementStatus = (_jsxs(_Fragment, { children: [intl.formatMessage(messages.verificationFailed), " ", _jsx(Icon, { src: WarningFilled, className: "d-inline-flex align-bottom" })] }));
                break;
            case 'satisfied':
                requirementStatus = (_jsxs(_Fragment, { children: [intl.formatMessage(messages.completed), " ", _jsx(Icon, { src: CheckCircle, className: "text-success-500 d-inline-flex align-bottom" })] }));
                break;
            default:
                requirementStatus = (_jsxs(_Fragment, { children: [intl.formatMessage(messages.upcoming), " ", _jsx(Icon, { src: WatchFilled, className: "text-gray-500 d-inline-flex align-bottom" })] }));
        }
        requirements.push((_jsxs("div", Object.assign({ className: "row w-100 m-0 small" }, { children: [_jsx("p", Object.assign({ className: "font-weight-bold" }, { children: requirement.namespace === 'grade'
                        ? `${intl.formatMessage(messages.minimumGrade, { minGrade: Number(requirement.criteria.minGrade) * 100 })}:`
                        : `${requirement.displayName}:` })), _jsx("div", Object.assign({ className: "ml-1" }, { children: requirementStatus }))] }), `requirement-${requirement.order}`)));
    });
    return (_jsxs(_Fragment, { children: [_jsx("h3", Object.assign({ className: "h4 col-12 p-0" }, { children: intl.formatMessage(messages.requirementsHeader) })), _jsx("p", Object.assign({ className: "small" }, { children: eligibilityStatus })), requirements] }));
};
export default CreditInformation;
//# sourceMappingURL=CreditInformation.js.map