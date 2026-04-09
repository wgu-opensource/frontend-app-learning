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
import { render, screen, fireEvent, initializeMockApp, } from '../../../../setupTest';
import ContentLock from './ContentLock';
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => (Object.assign(Object.assign({}, jest.requireActual('react-router-dom')), { useNavigate: () => mockNavigate })));
describe('Content Lock', () => {
    const mockData = {
        courseId: 'test-course-id',
        prereqSectionName: 'test-prerequisite-section-name',
        prereqId: 'test-prerequisite-id',
        sequenceTitle: 'test-sequence-title',
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // We need to mock AuthService to implicitly use `getAuthenticatedUser` within `AppContext.Provider`.
        yield initializeMockApp();
    }));
    it('displays sequence title along with lock icon', () => {
        const { container } = render(_jsx(ContentLock, Object.assign({}, mockData)), { wrapWithRouter: true });
        const lockIcon = container.querySelector('svg');
        expect(lockIcon).toHaveClass('fa-lock');
        expect(lockIcon.parentElement).toHaveTextContent(mockData.sequenceTitle);
    });
    it('displays prerequisite name', () => {
        const prereqText = `You must complete the prerequisite: '${mockData.prereqSectionName}' to access this content.`;
        render(_jsx(ContentLock, Object.assign({}, mockData)), { wrapWithRouter: true });
        expect(screen.getByText(prereqText)).toBeInTheDocument();
    });
    it('handles click', () => {
        render(_jsx(ContentLock, Object.assign({}, mockData)), { wrapWithRouter: true });
        fireEvent.click(screen.getByRole('button'));
        expect(mockNavigate).toHaveBeenCalledWith(`/course/${mockData.courseId}/${mockData.prereqId}`);
    });
});
//# sourceMappingURL=ContentLock.test.js.map