var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { initializeMockApp, render, screen } from '../../setupTest';
import Tabs from './Tabs';
import useIndexOfLastVisibleChild from './useIndexOfLastVisibleChild';
jest.mock('./useIndexOfLastVisibleChild');
describe('Tabs', () => {
    const mockChildren = [...Array(4).keys()].map(i => (_jsx("button", Object.assign({ type: "button" }, { children: `Item ${i}` }), i)));
    // Only half of the children will be visible. The rest of them will be in the dropdown.
    const indexOfLastVisibleChild = mockChildren.length / 2 - 1;
    const invisibleStyle = { visibility: 'hidden' };
    useIndexOfLastVisibleChild.mockReturnValue([indexOfLastVisibleChild, null, invisibleStyle, null]);
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        initializeMockApp();
    }));
    it('renders without children', () => {
        render(_jsx(Tabs, {}));
        expect(screen.getByRole('button', { name: 'More...' })).toBeInTheDocument();
    });
    it('hides invisible children', () => __awaiter(void 0, void 0, void 0, function* () {
        render(_jsx(Tabs, { children: mockChildren }));
        [...Array(mockChildren.length).keys()].forEach(i => {
            const button = screen.getByRole('button', { name: `Item ${i}` });
            if (i <= indexOfLastVisibleChild) {
                expect(button).not.toHaveAttribute('style');
            }
            else {
                // FIXME: this should use `toHaveStyle`, but it does not detect any style.
                expect(button).toHaveAttribute('style', 'visibility: hidden;');
            }
        });
    }));
});
//# sourceMappingURL=Tabs.test.js.map