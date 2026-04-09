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
import { Factory } from 'rosie';
import { getAllByRole } from '@testing-library/dom';
import { act } from '@testing-library/react';
import SequenceNavigationDropdown from './SequenceNavigationDropdown';
import { render, screen, fireEvent, initializeTestStore, } from '../../../../setupTest';
describe('Sequence Navigation Dropdown', () => {
    let mockData;
    const courseMetadata = Factory.build('courseMetadata');
    const unitBlocks = Array.from({ length: 3 }).map(() => Factory.build('block', { type: 'vertical' }, { courseId: courseMetadata.id }));
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield initializeTestStore({ courseMetadata, unitBlocks });
        mockData = {
            unitId: unitBlocks[1].id,
            unitIds: unitBlocks.map(block => block.id),
            showCompletion: false,
            onNavigate: () => { },
        };
    }));
    it('renders correctly without units', () => {
        render(_jsx(SequenceNavigationDropdown, Object.assign({}, mockData, { unitIds: [] })));
        expect(screen.getByRole('button')).toHaveTextContent('0 of 0');
    });
    unitBlocks.forEach((unit, index) => {
        it(`displays proper text for unit ${index + 1} on mobile`, () => {
            render(_jsx(SequenceNavigationDropdown, Object.assign({}, mockData, { unitId: unit.id })));
            expect(screen.getByRole('button')).toHaveTextContent(`${index + 1} of ${unitBlocks.length}`);
        });
    });
    unitBlocks.forEach((unit, index) => {
        it(`marks unit ${index + 1} as active`, () => __awaiter(void 0, void 0, void 0, function* () {
            const { container } = render(_jsx(SequenceNavigationDropdown, Object.assign({}, mockData, { unitId: unit.id })), { wrapWithRouter: true });
            const dropdownToggle = container.querySelector('.dropdown-toggle');
            yield act(() => __awaiter(void 0, void 0, void 0, function* () {
                yield fireEvent.click(dropdownToggle);
            }));
            const dropdownMenu = container.querySelector('.dropdown-menu');
            // Only the current unit should be marked as active.
            getAllByRole(dropdownMenu, 'link', { hidden: true }).forEach(button => {
                if (button.textContent === unit.display_name) {
                    expect(button).toHaveClass('active');
                }
                else {
                    expect(button).not.toHaveClass('active');
                }
            });
        }));
    });
    it('handles the clicks', () => {
        const onNavigate = jest.fn();
        const { container } = render(_jsx(SequenceNavigationDropdown, Object.assign({}, mockData, { onNavigate: onNavigate })), { wrapWithRouter: true });
        const dropdownToggle = container.querySelector('.dropdown-toggle');
        act(() => {
            fireEvent.click(dropdownToggle);
        });
        const dropdownMenu = container.querySelector('.dropdown-menu');
        getAllByRole(dropdownMenu, 'link', { hidden: true }).forEach(button => fireEvent.click(button));
        expect(onNavigate).toHaveBeenCalledTimes(unitBlocks.length);
        unitBlocks.forEach((unit, index) => {
            expect(onNavigate).toHaveBeenNthCalledWith(index + 1, unit.id);
        });
    });
});
//# sourceMappingURL=SequenceNavigationDropdown.test.js.map