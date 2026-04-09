import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Button, Card } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useSelector } from 'react-redux';
import { sendTrackingLogEvent } from '@edx/frontend-platform/analytics';
import messages from '../messages';
import { useModel } from '../../../generic/model-store';
const StartOrResumeCourseCard = () => {
    const intl = useIntl();
    const { courseId, } = useSelector(state => state.courseHome);
    const { org, } = useModel('courseHomeMeta', courseId);
    const eventProperties = {
        org_key: org,
        courserun_key: courseId,
    };
    const { resumeCourse: { hasVisitedCourse, url: resumeCourseUrl, }, } = useModel('outline', courseId);
    if (!resumeCourseUrl) {
        return null;
    }
    const logResumeCourseClick = () => {
        sendTrackingLogEvent('edx.course.home.resume_course.clicked', Object.assign(Object.assign({}, eventProperties), { event_type: hasVisitedCourse ? 'resume' : 'start', url: resumeCourseUrl }));
    };
    return (_jsxs(Card, Object.assign({ className: "mb-3 raised-card", "data-testid": "start-resume-card" }, { children: [_jsx(Card.Header, { title: hasVisitedCourse ? intl.formatMessage(messages.resumeBlurb) : intl.formatMessage(messages.startBlurb), actions: (_jsx(Button, Object.assign({ variant: "brand", block: true, href: resumeCourseUrl, onClick: () => logResumeCourseClick() }, { children: hasVisitedCourse ? intl.formatMessage(messages.resume) : intl.formatMessage(messages.start) }))) }), _jsx(Card.Footer, { children: _jsx(_Fragment, {}) })] })));
};
export default StartOrResumeCourseCard;
//# sourceMappingURL=StartOrResumeCourseCard.js.map