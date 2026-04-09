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
import ContentTools from './ContentTools';
jest.mock('./calculator/Calculator', () => function () {
    return _jsx("div", { "data-testid": "Calculator" });
});
jest.mock('./notes-visibility/NotesVisibility', () => function () {
    return _jsx("div", { "data-testid": "NotesVisibility" });
});
describe('Content Tools', () => {
    const mockData = {
        course: {
            notes: { enabled: false },
            showCalculator: false,
        },
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield initializeTestStore({ excludeFetchCourse: true, excludeFetchSequence: true });
    }));
    it('hides content tools', () => {
        const { container } = render(_jsx(ContentTools, Object.assign({}, mockData)));
        expect(container.getElementsByClassName('d-flex')[0]).toBeEmptyDOMElement();
    });
    it('displays Calculator', () => {
        const testData = JSON.parse(JSON.stringify(mockData));
        testData.course.showCalculator = true;
        render(_jsx(ContentTools, Object.assign({}, testData)));
        expect(screen.getByTestId('Calculator')).toBeInTheDocument();
        expect(screen.queryByTestId('NotesVisibility')).not.toBeInTheDocument();
    });
    it('displays Notes Visibility', () => {
        const testData = JSON.parse(JSON.stringify(mockData));
        testData.course.notes.enabled = true;
        render(_jsx(ContentTools, Object.assign({}, testData)));
        expect(screen.getByTestId('NotesVisibility')).toBeInTheDocument();
        expect(screen.queryByTestId('Calculator')).not.toBeInTheDocument();
    });
});
//# sourceMappingURL=ContentTools.test.js.map