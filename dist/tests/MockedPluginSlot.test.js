import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, screen } from '@testing-library/react';
import MockedPluginSlot from './MockedPluginSlot';
describe('MockedPluginSlot', () => {
    it('renders mock plugin with "PluginSlot" text', () => {
        render(_jsx(MockedPluginSlot, { id: "test_plugin" }));
        const component = screen.getByText('PluginSlot_test_plugin');
        expect(component).toBeInTheDocument();
    });
    it('renders mock plugin with a data-testid ', () => {
        render(_jsx(MockedPluginSlot, Object.assign({ id: "guybrush" }, { children: _jsx("q", Object.assign({ role: "note" }, { children: "I am selling these fine leather jackets." })) })));
        const component = screen.getByTestId('guybrush');
        expect(component).toBeInTheDocument();
        const quote = component.querySelector('[role=note]');
        expect(quote).toBeInTheDocument();
    });
});
//# sourceMappingURL=MockedPluginSlot.test.js.map