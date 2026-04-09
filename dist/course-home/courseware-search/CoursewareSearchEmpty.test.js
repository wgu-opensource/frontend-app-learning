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
import { initializeMockApp, render, screen, } from '../../setupTest';
import CoursewareSearchEmpty from './CoursewareSearchEmpty';
import messages from './messages';
function renderComponent() {
    const { container } = render(_jsx(CoursewareSearchEmpty, {}));
    return container;
}
describe('CoursewareSearchEmpty', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        initializeMockApp();
    }));
    it('render empty results text and corresponding classes', () => {
        renderComponent();
        const emptyText = screen.getByText(messages.searchResultsNone.defaultMessage);
        expect(emptyText).toBeInTheDocument();
        expect(emptyText).toHaveClass('courseware-search-results__empty');
        expect(emptyText).toHaveAttribute('data-testid', 'no-results');
        expect(emptyText.parentElement).toHaveClass('courseware-search-results');
    });
});
//# sourceMappingURL=CoursewareSearchEmpty.test.js.map