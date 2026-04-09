import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
const MockedPluginSlot = ({ children, id }) => (_jsxs("div", Object.assign({ "data-testid": id }, { children: ["PluginSlot_", id, children && _jsx("div", { children: children })] })));
MockedPluginSlot.displayName = 'PluginSlot';
MockedPluginSlot.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    id: PropTypes.string,
};
MockedPluginSlot.defaultProps = {
    children: undefined,
    id: undefined,
};
export default MockedPluginSlot;
//# sourceMappingURL=MockedPluginSlot.js.map