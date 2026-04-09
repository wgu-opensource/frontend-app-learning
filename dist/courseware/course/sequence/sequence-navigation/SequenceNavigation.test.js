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
import { render, screen, fireEvent, getByText, initializeTestStore, } from '../../../../setupTest';
import SequenceNavigation from './SequenceNavigation';
import useIndexOfLastVisibleChild from '../../../../generic/tabs/useIndexOfLastVisibleChild';
// Mock the hook to avoid relying on its implementation and mocking `getBoundingClientRect`.
jest.mock('../../../../generic/tabs/useIndexOfLastVisibleChild');
useIndexOfLastVisibleChild.mockReturnValue([0, null, null]);
describe('Sequence Navigation', () => {
    let mockData;
    const courseMetadata = Factory.build('courseMetadata');
    const unitBlocks = Array.from({ length: 3 }).map(() => Factory.build('block', { type: 'vertical' }, { courseId: courseMetadata.id }));
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const store = yield initializeTestStore({ courseMetadata, unitBlocks });
        const { courseware } = store.getState();
        mockData = {
            unitId: unitBlocks[1].id,
            sequenceId: courseware.sequenceId,
            previousHandler: () => { },
            onNavigate: () => { },
            nextHandler: () => { },
        };
    }));
    it('is empty while loading', () => __awaiter(void 0, void 0, void 0, function* () {
        const testStore = yield initializeTestStore({ excludeFetchSequence: true }, false);
        render(_jsx(SequenceNavigation, Object.assign({}, mockData)), { store: testStore, wrapWithRouter: true });
        expect(screen.queryByTestId('courseware-sequence-navigation')).not.toBeInTheDocument();
    }));
    it('renders empty div without unitId', () => {
        const { container } = render(_jsx(SequenceNavigation, Object.assign({}, mockData, { unitId: undefined })), { wrapWithRouter: true });
        expect(getByText(container, (content, element) => (element.tagName.toLowerCase() === 'div' && element.getAttribute('style')))).toBeEmptyDOMElement();
    });
    it('renders locked button for gated content', () => __awaiter(void 0, void 0, void 0, function* () {
        const sequenceBlocks = [Factory.build('block', { type: 'sequential', children: unitBlocks.map(block => block.id) }, { courseId: courseMetadata.id })];
        const sequenceMetadata = [Factory.build('sequenceMetadata', { gated_content: { gated: true } }, { courseId: courseMetadata.id, unitBlocks, sequenceBlock: sequenceBlocks[0] })];
        const testStore = yield initializeTestStore({ unitBlocks, sequenceBlocks, sequenceMetadata }, false);
        const testData = Object.assign(Object.assign({}, mockData), { sequenceId: sequenceBlocks[0].id, onNavigate: jest.fn() });
        render(_jsx(SequenceNavigation, Object.assign({}, testData)), { store: testStore, wrapWithRouter: true });
        const unitButton = screen.getByTitle(unitBlocks[1].display_name);
        fireEvent.click(unitButton);
        // The unit button should not work for gated content.
        expect(testData.onNavigate).not.toHaveBeenCalled();
        // TODO: Not sure if this is working as expected, because the `contentType="lock"` will be overridden by the value
        //  from Redux. To make this provide a `fa-icon` lock we could introduce something like `overriddenContentType`.
        expect(unitButton.firstChild).toHaveClass('fa-tasks');
    }));
    it('renders correctly and handles unit button clicks', () => {
        const onNavigate = jest.fn();
        render(_jsx(SequenceNavigation, Object.assign({}, mockData, { onNavigate })), { wrapWithRouter: true });
        const unitButtons = screen.getAllByRole('link', { name: /\d+/ });
        expect(unitButtons).toHaveLength(unitButtons.length);
        unitButtons.forEach(button => fireEvent.click(button));
        expect(onNavigate).toHaveBeenCalledTimes(unitButtons.length);
    });
    it('has both navigation buttons enabled for a non-corner unit of the sequence', () => {
        render(_jsx(SequenceNavigation, Object.assign({}, mockData)), { wrapWithRouter: true });
        screen.getAllByRole('link', { name: /previous|next/i }).forEach(button => {
            expect(button).toBeEnabled();
        });
    });
    it('has the "Previous" button disabled for the first unit of the sequence', () => {
        render(_jsx(SequenceNavigation, Object.assign({}, mockData, { unitId: unitBlocks[0].id })), { wrapWithRouter: true });
        expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
        expect(screen.getByRole('link', { name: /next/i })).toBeEnabled();
    });
    it('has the "Next" button disabled for the last unit of the sequence if there is no Exit page', () => __awaiter(void 0, void 0, void 0, function* () {
        const testMetadata = Object.assign(Object.assign({}, courseMetadata), { certificate_data: { cert_status: 'bogus_status' }, user_has_passing_grade: true });
        const testStore = yield initializeTestStore({ courseMetadata: testMetadata, unitBlocks }, false);
        // Have to refetch the sequenceId since the new store generates new sequences
        const { courseware } = testStore.getState();
        const testData = Object.assign(Object.assign({}, mockData), { sequenceId: courseware.sequenceId });
        render(_jsx(SequenceNavigation, Object.assign({}, testData, { unitId: unitBlocks[unitBlocks.length - 1].id })), { store: testStore, wrapWithRouter: true });
        expect(screen.getByRole('link', { name: /previous/i })).toBeEnabled();
        expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    }));
    it('displays end of course message instead of the "Next" button as needed', () => __awaiter(void 0, void 0, void 0, function* () {
        const testMetadata = Object.assign(Object.assign({}, courseMetadata), { certificate_data: { cert_status: 'notpassing' }, enrollment: { is_active: true } });
        const testStore = yield initializeTestStore({ courseMetadata: testMetadata, unitBlocks }, false);
        // Have to refetch the sequenceId since the new store generates new sequences
        const { courseware } = testStore.getState();
        const testData = Object.assign(Object.assign({}, mockData), { sequenceId: courseware.sequenceId });
        render(_jsx(SequenceNavigation, Object.assign({}, testData, { unitId: unitBlocks[unitBlocks.length - 1].id })), { store: testStore, wrapWithRouter: true });
        expect(screen.getByRole('link', { name: /previous/i })).toBeEnabled();
        expect(screen.getByRole('link', { name: /next \(end of course\)/i })).toBeEnabled();
    }));
    it('displays complete course message instead of the "Next" button as needed', () => __awaiter(void 0, void 0, void 0, function* () {
        const testMetadata = Object.assign(Object.assign({}, courseMetadata), { certificate_data: { cert_status: 'downloadable' }, enrollment: { is_active: true }, user_has_passing_grade: true });
        const testStore = yield initializeTestStore({ courseMetadata: testMetadata, unitBlocks }, false);
        // Have to refetch the sequenceId since the new store generates new sequences
        const { courseware } = testStore.getState();
        const testData = Object.assign(Object.assign({}, mockData), { sequenceId: courseware.sequenceId });
        render(_jsx(SequenceNavigation, Object.assign({}, testData, { unitId: unitBlocks[unitBlocks.length - 1].id })), { store: testStore, wrapWithRouter: true });
        expect(screen.getByRole('link', { name: /previous/i })).toBeEnabled();
        expect(screen.getByRole('link', { name: /Complete the course/i })).toBeEnabled();
    }));
    it('handles "Previous" and "Next" click', () => {
        const previousHandler = jest.fn();
        const nextHandler = jest.fn();
        render(_jsx(SequenceNavigation, Object.assign({}, mockData, { previousHandler, nextHandler })), { wrapWithRouter: true });
        fireEvent.click(screen.getByRole('link', { name: /previous/i }));
        expect(previousHandler).toHaveBeenCalledTimes(1);
        fireEvent.click(screen.getByRole('link', { name: /next/i }));
        expect(nextHandler).toHaveBeenCalledTimes(1);
    });
    it('removes "Previous" for first unit in sequence when navigation is disabled', () => __awaiter(void 0, void 0, void 0, function* () {
        const sequenceBlocks = [Factory.build('block', { type: 'sequential', children: unitBlocks.map(block => block.id) }, { courseId: courseMetadata.id })];
        const sequenceMetadata = [Factory.build('sequenceMetadata', { navigation_disabled: true }, { courseId: courseMetadata.id, unitBlocks, sequenceBlock: sequenceBlocks[0] })];
        const testStore = yield initializeTestStore({ unitBlocks, sequenceBlocks, sequenceMetadata }, false);
        const testData = Object.assign(Object.assign({}, mockData), { sequenceId: sequenceBlocks[0].id, onNavigate: jest.fn() });
        render(_jsx(SequenceNavigation, Object.assign({}, testData, { unitId: unitBlocks[0].id })), { store: testStore, wrapWithRouter: true });
        expect(screen.queryByRole('link', { name: /previous/i })).not.toBeInTheDocument();
    }));
    it('removes "Next" for last unit in sequence when navigation is disabled', () => __awaiter(void 0, void 0, void 0, function* () {
        const sequenceBlocks = [Factory.build('block', { type: 'sequential', children: unitBlocks.map(block => block.id) }, { courseId: courseMetadata.id })];
        const sequenceMetadata = [Factory.build('sequenceMetadata', { navigation_disabled: true }, { courseId: courseMetadata.id, unitBlocks, sequenceBlock: sequenceBlocks[0] })];
        const testStore = yield initializeTestStore({ unitBlocks, sequenceBlocks, sequenceMetadata }, false);
        const testData = Object.assign(Object.assign({}, mockData), { sequenceId: sequenceBlocks[0].id, onNavigate: jest.fn() });
        render(_jsx(SequenceNavigation, Object.assign({}, testData, { unitId: unitBlocks[unitBlocks.length - 1].id })), { store: testStore, wrapWithRouter: true });
        expect(screen.queryByRole('link', { name: /next/i })).not.toBeInTheDocument();
    }));
});
//# sourceMappingURL=SequenceNavigation.test.js.map