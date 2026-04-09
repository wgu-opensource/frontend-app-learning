var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';
import { ActionRow, Button, Icon, StandardModal, } from '@openedx/paragon';
import { Lightbulb } from '@openedx/paragon/icons';
import Target from './assets/target.svg';
import messages from './messages';
import { recordWeeklyGoalCelebration } from './utils';
import { useModel } from '../../../generic/model-store';
const WeeklyGoalCelebrationModal = (_a) => {
    var { courseId, daysPerWeek, isOpen, onClose } = _a, rest = __rest(_a, ["courseId", "daysPerWeek", "isOpen", "onClose"]);
    const intl = useIntl();
    const { org } = useModel('courseHomeMeta', courseId);
    useEffect(() => {
        if (isOpen) {
            recordWeeklyGoalCelebration(org, courseId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);
    return (_jsx(StandardModal, Object.assign({ footerNode: (_jsx(ActionRow, Object.assign({ isStacked: true, className: "pb-2" }, { children: _jsx(Button, Object.assign({ onClick: onClose }, { children: intl.formatMessage(messages.keepItUp) })) }))), hasCloseButton: false, isOpen: isOpen, onClose: onClose, title: (_jsx("p", Object.assign({ className: "h2 text-center mr-n5 pt-4" }, { children: intl.formatMessage(messages.goalMet) }))) }, rest, { children: _jsxs(_Fragment, { children: [_jsx("div", Object.assign({ className: "text-center px-3" }, { children: _jsx(FormattedMessage, { id: "learning.celebration.goalCongrats", defaultMessage: "Congratulations, you met your learning goal of {nTimes} a week.", description: "Greeting for learners for their weekly goal, it as well indicate their gaol, i.e. (1,3 or 5 time(s) a week)", values: {
                            nTimes: (_jsxs("strong", { children: [daysPerWeek, " ", daysPerWeek === 1 ? 'time' : 'times'] })),
                        } }) })), _jsx("div", Object.assign({ className: "d-flex justify-content-center py-4.5" }, { children: _jsx("img", { src: Target, alt: "" }) })), _jsxs("div", Object.assign({ className: "py-3 pl-3 bg-light-300 small d-inline-flex" }, { children: [_jsx(Icon, { src: Lightbulb, className: "mr-2", style: { height: '21px', width: '22px' } }), _jsx("div", { children: _jsx(FormattedMessage, { id: "learning.celebration.setGoal", defaultMessage: "Setting a goal can help you {strongText} in your course.", description: "It explain the advantages of setting goal", values: {
                                    strongText: (_jsx("strong", { children: "achieve higher performance" })),
                                } }) })] }))] }) })));
};
WeeklyGoalCelebrationModal.propTypes = {
    courseId: PropTypes.string.isRequired,
    daysPerWeek: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
export default WeeklyGoalCelebrationModal;
//# sourceMappingURL=WeeklyGoalCelebrationModal.js.map