import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Locked } from '@openedx/paragon/icons';
import { Icon, Hyperlink } from '@openedx/paragon';
import { useContextId } from '../../../../data/hooks';
import { useModel } from '../../../../generic/model-store';
import { showUngradedAssignments } from '../../utils';
import DetailedGradesTable from './DetailedGradesTable';
import messages from '../messages';
const DetailedGrades = () => {
    const intl = useIntl();
    const { administrator } = getAuthenticatedUser();
    const courseId = useContextId();
    const { org, tabs, } = useModel('courseHomeMeta', courseId);
    const { gradesFeatureIsFullyLocked, gradesFeatureIsPartiallyLocked, sectionScores, } = useModel('progress', courseId);
    const hasSectionScores = sectionScores.length > 0;
    const emptyTableMsg = showUngradedAssignments()
        ? messages.detailedGradesEmpty : messages.detailedGradesEmptyOnlyGraded;
    const logOutlineLinkClick = () => {
        sendTrackEvent('edx.ui.lms.course_progress.detailed_grades.course_outline_link.clicked', {
            org_key: org,
            courserun_key: courseId,
            is_staff: administrator,
        });
    };
    const overviewTab = tabs.find(tab => tab.slug === 'outline');
    const overviewTabUrl = overviewTab && overviewTab.url;
    const outlineLink = overviewTabUrl && (_jsx(Hyperlink, Object.assign({ variant: "muted", isInline: true, destination: overviewTabUrl, onClick: logOutlineLinkClick, tabIndex: gradesFeatureIsFullyLocked ? '-1' : '0' }, { children: intl.formatMessage(messages.courseOutline) })));
    return (_jsxs("section", Object.assign({ className: "text-dark-700" }, { children: [_jsx("h3", Object.assign({ className: "h4" }, { children: intl.formatMessage(messages.detailedGrades) })), _jsxs("ul", Object.assign({ className: "micro mb-3 pl-3 text-gray-700" }, { children: [_jsxs("li", { children: [_jsxs("b", { children: [intl.formatMessage(messages.practiceScoreLabel), " "] }), intl.formatMessage(messages.practiceScoreInfoText)] }), _jsxs("li", { children: [_jsxs("b", { children: [intl.formatMessage(messages.gradedScoreLabel), " "] }), intl.formatMessage(messages.gradedScoreInfoText)] })] })), gradesFeatureIsPartiallyLocked && (_jsxs("div", Object.assign({ className: "mb-3 small ml-0 d-inline" }, { children: [_jsx(Icon, { className: "mr-1 mt-1 d-inline-flex", style: { height: '1rem', width: '1rem' }, src: Locked, "data-testid": "locked-icon" }), intl.formatMessage(messages.gradeSummaryLimitedAccessExplanation, { upgradeLink: '' })] }))), hasSectionScores && (_jsx(DetailedGradesTable, {})), !hasSectionScores && (_jsx("p", Object.assign({ className: "small" }, { children: intl.formatMessage(emptyTableMsg) }))), overviewTabUrl && !showUngradedAssignments() && (_jsx("p", Object.assign({ className: "x-small m-0" }, { children: intl.formatMessage(messages.ungradedAlert, { outlineLink }) })))] })));
};
export default DetailedGrades;
//# sourceMappingURL=DetailedGrades.js.map