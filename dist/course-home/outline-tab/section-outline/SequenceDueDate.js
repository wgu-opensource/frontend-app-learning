import { jsx as _jsx } from "react/jsx-runtime";
import { FormattedTime, useIntl } from '@edx/frontend-platform/i18n';
import { useModel } from '../../../generic/model-store';
import { useContextId } from '../../../data/hooks';
import messages from '../messages';
const SequenceDueDate = ({ due, id, description, }) => {
    const intl = useIntl();
    const courseId = useContextId();
    let dueDateMessage = intl.formatMessage(messages.sequenceNoDueDate, { description: description || '' });
    const { userTimezone, } = useModel('outline', courseId);
    if (due) {
        const timezoneFormatArgs = userTimezone ? { timeZone: userTimezone } : {};
        dueDateMessage = intl.formatMessage(messages.sequenceDueDate, {
            assignmentDue: (_jsx(FormattedTime, Object.assign({ day: "numeric", month: "short", year: "numeric", timeZoneName: "short", value: due }, timezoneFormatArgs), `${id}-due`)),
            description: description || '',
        });
    }
    return (_jsx("div", Object.assign({ className: "row w-100 m-0 ml-3 pl-3" }, { children: _jsx("small", Object.assign({ className: "text-body pl-2" }, { children: dueDateMessage })) })));
};
export default SequenceDueDate;
//# sourceMappingURL=SequenceDueDate.js.map