import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Calculator from './calculator';
import NotesVisibility from './notes-visibility';
const ContentTools = ({ course, }) => {
    const { sidebarIsOpen, } = useSelector(state => state.learningAssistant);
    return (!sidebarIsOpen && (_jsx("div", Object.assign({ className: "content-tools" }, { children: _jsxs("div", Object.assign({ className: "d-flex justify-content-end align-items-end m-0" }, { children: [course.showCalculator && (_jsx(Calculator, {})), course.notes.enabled && (_jsx(NotesVisibility, { course: course }))] })) }))));
};
ContentTools.propTypes = {
    course: PropTypes.shape({
        notes: PropTypes.shape({
            enabled: PropTypes.bool,
        }),
        showCalculator: PropTypes.bool,
    }).isRequired,
};
export default ContentTools;
//# sourceMappingURL=ContentTools.js.map