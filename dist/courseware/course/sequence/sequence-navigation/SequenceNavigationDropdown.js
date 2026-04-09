import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from '@openedx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import UnitButton from './UnitButton';
const SequenceNavigationDropdown = ({ unitId, onNavigate, showCompletion, unitIds, }) => (_jsxs(Dropdown, Object.assign({ className: "sequence-navigation-dropdown" }, { children: [_jsx(Dropdown.Toggle, Object.assign({ id: "navigation-toggle", variant: "link", className: "font-weight-normal w-100 border-right-0" }, { children: _jsx(FormattedMessage, { defaultMessage: "{current} of {total}", description: "The title of the mobile menu for sequence navigation of units", id: "learn.course.sequence.navigation.mobile.menu", values: {
                    current: unitIds.indexOf(unitId) + 1,
                    total: unitIds.length,
                } }) })), _jsx(Dropdown.Menu, Object.assign({ className: "w-100" }, { children: unitIds.map(buttonUnitId => (_jsx(Dropdown.Item, { as: UnitButton, className: "w-100", isActive: unitId === buttonUnitId, onClick: onNavigate, showCompletion: showCompletion, showTitle: true, unitId: buttonUnitId }, buttonUnitId))) }))] })));
SequenceNavigationDropdown.propTypes = {
    unitId: PropTypes.string.isRequired,
    onNavigate: PropTypes.func.isRequired,
    showCompletion: PropTypes.bool.isRequired,
    unitIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default SequenceNavigationDropdown;
//# sourceMappingURL=SequenceNavigationDropdown.js.map