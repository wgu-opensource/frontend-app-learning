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
import { fireEvent, initializeTestStore, render, screen, } from '../../../../setupTest';
import UnitButton from './UnitButton';
describe('Unit Button', () => {
    let mockData;
    const courseMetadata = Factory.build('courseMetadata');
    const unitBlocks = [Factory.build('block', { type: 'problem' }, { courseId: courseMetadata.id }), Factory.build('block', { type: 'video', complete: true }, { courseId: courseMetadata.id }), Factory.build('block', { type: 'other', complete: true, bookmarked: true }, { courseId: courseMetadata.id })];
    const [unit, completedUnit, bookmarkedUnit] = unitBlocks;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield initializeTestStore({ courseMetadata, unitBlocks });
        mockData = {
            unitId: unit.id,
            onClick: () => { },
        };
    }));
    it('hides title by default', () => {
        render(_jsx(UnitButton, Object.assign({}, mockData)), { wrapWithRouter: true });
        expect(screen.getByRole('link')).not.toHaveTextContent(unit.display_name);
    });
    it('shows title', () => {
        render(_jsx(UnitButton, Object.assign({}, mockData, { showTitle: true })), { wrapWithRouter: true });
        expect(screen.getByRole('link')).toHaveTextContent(unit.display_name);
    });
    it('does not show completion for non-completed unit', () => {
        const { container } = render(_jsx(UnitButton, Object.assign({}, mockData)));
        container.querySelectorAll('svg').forEach(icon => {
            expect(icon).not.toHaveClass('fa-check');
        });
    });
    it('shows completion for completed unit', () => {
        const { container } = render(_jsx(UnitButton, Object.assign({}, mockData, { unitId: completedUnit.id })), { wrapWithRouter: true });
        const buttonIcons = container.querySelectorAll('svg');
        expect(buttonIcons).toHaveLength(2);
        expect(buttonIcons[1]).toHaveClass('fa-check');
    });
    it('hides completion', () => {
        const { container } = render(_jsx(UnitButton, Object.assign({}, mockData, { unitId: completedUnit.id, showCompletion: false })));
        container.querySelectorAll('svg').forEach(icon => {
            expect(icon).not.toHaveClass('fa-check');
        });
    });
    it('does not show bookmark', () => {
        const { queryByTestId } = render(_jsx(UnitButton, Object.assign({}, mockData)));
        expect(queryByTestId('bookmark-icon')).toBeNull();
    });
    it('shows bookmark', () => {
        const { container } = render(_jsx(UnitButton, Object.assign({}, mockData, { unitId: bookmarkedUnit.id })), { wrapWithRouter: true });
        const buttonIcons = container.querySelectorAll('svg');
        expect(buttonIcons).toHaveLength(3);
        const bookmarkIcon = buttonIcons[2].closest('span');
        expect(bookmarkIcon.getAttribute('data-testid')).toBe('bookmark-icon');
    });
    it('handles the click', () => {
        const onClick = jest.fn();
        render(_jsx(UnitButton, Object.assign({}, mockData, { onClick: onClick })), { wrapWithRouter: true });
        fireEvent.click(screen.getByRole('link'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=UnitButton.test.js.map