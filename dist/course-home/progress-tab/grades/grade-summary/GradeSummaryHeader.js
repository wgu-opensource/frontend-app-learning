import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Hyperlink, Icon, OverlayTrigger, Stack, Tooltip, } from '@openedx/paragon';
import { InfoOutline, Locked } from '@openedx/paragon/icons';
import { useContextId } from '../../../../data/hooks';
import messages from '../messages';
import { useModel } from '../../../../generic/model-store';
const GradeSummaryHeader = ({ allOfSomeAssignmentTypeIsLocked }) => {
    const intl = useIntl();
    const courseId = useContextId();
    const { verifiedMode, gradesFeatureIsFullyLocked, } = useModel('progress', courseId);
    return (_jsxs(Stack, Object.assign({ gap: 2, className: "mb-3" }, { children: [_jsxs(Stack, Object.assign({ direction: "horizontal", gap: 2 }, { children: [_jsx("h3", Object.assign({ className: "h4 m-0" }, { children: intl.formatMessage(messages.gradeSummary) })), _jsx(OverlayTrigger, Object.assign({ trigger: "hover", placement: "top", overlay: (_jsx(Tooltip, { children: intl.formatMessage(messages.gradeSummaryTooltipBody) })) }, { children: _jsx(Icon, { alt: intl.formatMessage(messages.gradeSummaryTooltipAlt), src: InfoOutline, size: "sm" }) }))] })), !gradesFeatureIsFullyLocked && allOfSomeAssignmentTypeIsLocked && (_jsxs(Stack, Object.assign({ direction: "horizontal", className: "small", gap: 2 }, { children: [_jsx(Icon, { size: "sm", src: Locked, "data-testid": "locked-icon" }), _jsx("span", { children: intl.formatMessage(messages.gradeSummaryLimitedAccessExplanation, {
                            upgradeLink: verifiedMode && (_jsxs(Hyperlink, Object.assign({ destination: verifiedMode.upgradeUrl }, { children: [intl.formatMessage(messages.courseGradePreviewUpgradeButton), "."] }))),
                        }) })] })))] })));
};
GradeSummaryHeader.propTypes = {
    allOfSomeAssignmentTypeIsLocked: PropTypes.bool.isRequired,
};
export default GradeSummaryHeader;
//# sourceMappingURL=GradeSummaryHeader.js.map