import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { OkayButtonFormattedMessage } from './GenericTourFormattedMessages';
const coursewareTour = ({ enabled, onEnd }) => ({
    checkpoints: [{
            body: _jsx(FormattedMessage, { id: "tours.sequenceNavigationCheckpoint.body", defaultMessage: "The top bar within your course allows you to easily jump to different sections and shows you what\u2019s coming up." }),
            placement: 'bottom',
            target: '#courseware-sequence-navigation',
        }],
    enabled,
    endButtonText: _jsx(OkayButtonFormattedMessage, {}),
    onEnd,
    onEscape: onEnd,
    tourId: 'coursewareTour',
});
export default coursewareTour;
//# sourceMappingURL=CoursewareTour.js.map