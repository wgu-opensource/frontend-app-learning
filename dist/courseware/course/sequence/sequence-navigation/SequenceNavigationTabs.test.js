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
import { getAllByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { initializeTestStore, render, screen } from '../../../../setupTest';
import SequenceNavigationTabs from './SequenceNavigationTabs';
import useIndexOfLastVisibleChild from '../../../../generic/tabs/useIndexOfLastVisibleChild';
// Mock the hook to avoid relying on its implementation and mocking `getBoundingClientRect`.
jest.mock('../../../../generic/tabs/useIndexOfLastVisibleChild');
describe('Sequence Navigation Tabs', () => {
    let mockData;
    const courseMetadata = Factory.build('courseMetadata');
    const unitBlocks = [Factory.build('block', { type: 'problem' }, { courseId: courseMetadata.id }), Factory.build('block', { type: 'video', complete: true }, { courseId: courseMetadata.id }), Factory.build('block', { type: 'other', complete: true, bookmarked: true }, { courseId: courseMetadata.id })];
    const activeBlockNumber = 2;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield initializeTestStore({ courseMetadata, unitBlocks });
        mockData = {
            // Blocks are numbered from 1 in the UI, so we're decreasing this by 1 to have correct block's ID in the array.
            unitId: unitBlocks[activeBlockNumber - 1].id,
            onNavigate: () => { },
            showCompletion: false,
            unitIds: unitBlocks.map(unit => unit.id),
        };
    }));
    it('renders unit buttons', () => {
        useIndexOfLastVisibleChild.mockReturnValue([0, null, null]);
        render(_jsx(SequenceNavigationTabs, Object.assign({}, mockData)), { wrapWithRouter: true });
        expect(screen.getAllByRole('link')).toHaveLength(unitBlocks.length);
    });
    it('renders unit buttons and dropdown button', () => __awaiter(void 0, void 0, void 0, function* () {
        let container = null;
        useIndexOfLastVisibleChild.mockReturnValue([-1, null, null]);
        const booyah = render(_jsx(SequenceNavigationTabs, Object.assign({}, mockData)), { wrapWithRouter: true });
        // wait for links to appear so we aren't testing an empty div
        yield screen.findAllByRole('link');
        container = booyah.container;
        const dropdownToggle = container.querySelector('.dropdown-toggle');
        yield userEvent.click(dropdownToggle);
        const dropdownMenu = container.querySelector('.dropdown');
        const dropdownButtons = getAllByRole(dropdownMenu, 'link');
        expect(dropdownButtons).toHaveLength(unitBlocks.length);
        expect(screen.getByRole('button', { name: `${activeBlockNumber} of ${unitBlocks.length}` }))
            .toHaveClass('dropdown-toggle');
    }));
});
//# sourceMappingURL=SequenceNavigationTabs.test.js.map