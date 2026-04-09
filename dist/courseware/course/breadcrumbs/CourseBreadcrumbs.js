import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useModel, useModels } from '../../../generic/model-store';
import BreadcrumbItem from './BreadcrumbItem';
const CourseBreadcrumbs = ({ courseId, sectionId, sequenceId, unitId, isStaff, }) => {
    var _a;
    const course = useModel('coursewareMeta', courseId);
    const courseStatus = useSelector((state) => state.courseware.courseStatus);
    const sequenceStatus = useSelector((state) => state.courseware.sequenceStatus);
    const allSequencesInSections = Object.fromEntries((_a = useModels('sections', course.sectionIds)) === null || _a === void 0 ? void 0 : _a.map((section) => [
        section.id,
        {
            default: section.id === sectionId,
            title: section.title,
            sequences: useModels('sequences', section.sequenceIds),
        },
    ]));
    const links = useMemo(() => {
        const chapters = [];
        const sequentials = [];
        if (courseStatus === 'loaded' && sequenceStatus === 'loaded') {
            Object.entries(allSequencesInSections).forEach(([id, section]) => {
                chapters.push({
                    id,
                    label: section.title,
                    default: section.default,
                    sequences: section.sequences,
                });
                if (section.default) {
                    section.sequences.forEach((sequence) => {
                        sequentials.push({
                            id: sequence.id,
                            label: sequence.title,
                            default: sequence.id === sequenceId,
                            sequences: [sequence],
                        });
                    });
                }
            });
        }
        return [chapters, sequentials];
    }, [courseStatus, sequenceStatus, allSequencesInSections]);
    return (_jsx("nav", Object.assign({ "aria-label": "breadcrumb", className: "d-inline-block col-sm-10 mb-3" }, { children: _jsxs("ol", Object.assign({ className: "list-unstyled d-flex flex-nowrap align-items-center m-0" }, { children: [_jsx("li", Object.assign({ className: "list-unstyled col-auto m-0 p-0" }, { children: _jsxs(Link, Object.assign({ className: "flex-shrink-0 text-primary", to: `/course/${courseId}/home`, replace: true }, { children: [_jsx(FontAwesomeIcon, { icon: faHome, className: "mr-2" }), _jsx(FormattedMessage, { id: "learn.breadcrumb.navigation.course.home", description: "The course home link in breadcrumbs nav", defaultMessage: "Course" })] })) })), links.map((content, i) => (_jsx(BreadcrumbItem
                // eslint-disable-next-line react/no-array-index-key
                , { courseId: courseId, sequenceId: sequenceId, content: content, unitId: unitId, withSeparator: true, separator: "/", isStaff: isStaff }, i)))] })) })));
};
CourseBreadcrumbs.propTypes = {
    courseId: PropTypes.string.isRequired,
    sectionId: PropTypes.string,
    sequenceId: PropTypes.string,
    unitId: PropTypes.string,
    isStaff: PropTypes.bool,
};
CourseBreadcrumbs.defaultProps = {
    sectionId: null,
    sequenceId: null,
    unitId: null,
    isStaff: null,
};
export default CourseBreadcrumbs;
//# sourceMappingURL=CourseBreadcrumbs.js.map