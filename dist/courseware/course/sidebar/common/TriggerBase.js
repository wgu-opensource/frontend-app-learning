import { jsx as _jsx } from "react/jsx-runtime";
import PropTypes from 'prop-types';
import React from 'react';
const SidebarTriggerBase = ({ onClick, ariaLabel, children, }) => (_jsx("button", Object.assign({ className: "border border-light-400 bg-transparent align-items-center align-content-center d-flex notification-btn", type: "button", onClick: onClick, "aria-label": ariaLabel }, { children: _jsx("div", Object.assign({ className: "icon-container d-flex position-relative align-items-center" }, { children: children })) })));
SidebarTriggerBase.propTypes = {
    onClick: PropTypes.func.isRequired,
    ariaLabel: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
};
export default SidebarTriggerBase;
//# sourceMappingURL=TriggerBase.js.map