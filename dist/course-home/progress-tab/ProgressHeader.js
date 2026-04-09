import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Button } from '@openedx/paragon';
import { useSelector } from 'react-redux';
import { useModel } from '../../generic/model-store';
import messages from './messages';
const ProgressHeader = () => {
    const intl = useIntl();
    const { courseId, targetUserId, } = useSelector(state => state.courseHome);
    const { administrator, userId } = getAuthenticatedUser();
    const { studioUrl, username } = useModel('progress', courseId);
    const viewingOtherStudentsProgressPage = (targetUserId && targetUserId !== userId);
    const pageTitle = viewingOtherStudentsProgressPage
        ? intl.formatMessage(messages.progressHeaderForTargetUser, { username })
        : intl.formatMessage(messages.progressHeader);
    return (_jsxs("div", Object.assign({ className: "row w-100 m-0 mt-3 mb-4 justify-content-between" }, { children: [_jsx("h1", { children: pageTitle }), administrator && studioUrl && (_jsx(Button, Object.assign({ variant: "outline-primary", size: "sm", className: "align-self-center", href: studioUrl }, { children: intl.formatMessage(messages.studioLink) })))] })));
};
export default ProgressHeader;
//# sourceMappingURL=ProgressHeader.js.map