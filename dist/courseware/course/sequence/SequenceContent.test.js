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
import { initializeTestStore, render, screen } from '../../../setupTest';
import SequenceContent from './SequenceContent';
describe('Sequence Content', () => {
    let mockData;
    let store;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        store = yield initializeTestStore();
        const { models, courseware } = store.getState();
        mockData = {
            gated: false,
            courseId: courseware.courseId,
            sequenceId: courseware.sequenceId,
            unitId: models.sequences[courseware.sequenceId].unitIds[0],
            unitLoadedHandler: () => { },
            renderUnitNavigation: () => { },
        };
    }));
    it('displays loading message', () => {
        render(_jsx(SequenceContent, Object.assign({}, mockData)), { wrapWithRouter: true });
        expect(screen.getByText('Loading learning sequence...')).toBeInTheDocument();
    });
    it('displays messages for the locked content', () => __awaiter(void 0, void 0, void 0, function* () {
        const { gatedContent } = store.getState().models.sequences[mockData.sequenceId];
        const { container } = render(_jsx(SequenceContent, Object.assign({}, mockData, { gated: true })), { wrapWithRouter: true });
        expect(screen.getByText('Loading locked content messaging...')).toBeInTheDocument();
        expect(yield screen.findByText('Content Locked')).toBeInTheDocument();
        expect(screen.queryByText('Loading locked content messaging...')).not.toBeInTheDocument();
        expect(container.querySelector('svg')).toHaveClass('fa-lock');
        expect(screen.getByText(`You must complete the prerequisite: '${gatedContent.prereqSectionName}' to access this content.`)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Go To Prerequisite Section' })).toBeInTheDocument();
    }));
    it('displays message for no content', () => {
        render(_jsx(SequenceContent, Object.assign({}, mockData, { unitId: "" })), { wrapWithRouter: true });
        expect(screen.getByText('There is no content here.')).toBeInTheDocument();
    });
});
//# sourceMappingURL=SequenceContent.test.js.map