import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';
const SuggestedScheduleHeader = () => {
    const intl = useIntl();
    return (_jsx("p", Object.assign({ className: "large" }, { children: intl.formatMessage(messages.suggestedSchedule) })));
};
export default SuggestedScheduleHeader;
//# sourceMappingURL=SuggestedScheduleHeader.js.map