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
import { act, initializeMockApp, render, screen, waitFor, fireEvent, } from '../../setupTest';
import CoursewareSearchForm from './CoursewareSearchForm';
function renderComponent(placeholder, onSubmit, onChange) {
    const { container } = render(_jsx(CoursewareSearchForm, { placeholder: placeholder, onSubmit: onSubmit, onChange: onChange }));
    return container;
}
describe('CoursewareSearchToggle', () => {
    const placeholderText = 'Search for courseware';
    let onSubmitHandlerMock;
    let onChangeHandlerMock;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        onChangeHandlerMock = jest.fn();
        onSubmitHandlerMock = jest.fn();
        initializeMockApp();
    }));
    it('should render', () => __awaiter(void 0, void 0, void 0, function* () {
        yield act(() => __awaiter(void 0, void 0, void 0, function* () { return renderComponent(placeholderText, onSubmitHandlerMock, onChangeHandlerMock); }));
        yield waitFor(() => {
            expect(screen.queryByTestId('courseware-search-form')).toBeInTheDocument();
        });
    }));
    it('should call onChange handler when input changes', () => __awaiter(void 0, void 0, void 0, function* () {
        yield act(() => __awaiter(void 0, void 0, void 0, function* () { return renderComponent(placeholderText, onSubmitHandlerMock, onChangeHandlerMock); }));
        yield waitFor(() => {
            const element = screen.queryByPlaceholderText(placeholderText);
            fireEvent.change(element, { target: { value: 'test' } });
            expect(onChangeHandlerMock).toHaveBeenCalledTimes(1);
        });
    }));
    it('should call onSubmit handler when submit is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
        yield act(() => __awaiter(void 0, void 0, void 0, function* () { return renderComponent(placeholderText, onSubmitHandlerMock, onChangeHandlerMock); }));
        yield waitFor(() => __awaiter(void 0, void 0, void 0, function* () {
            const element = yield screen.findByTestId('courseware-search-form-submit');
            fireEvent.click(element);
            expect(onSubmitHandlerMock).toHaveBeenCalledTimes(1);
        }));
    }));
    afterEach(() => {
        jest.clearAllMocks();
    });
});
//# sourceMappingURL=CoursewareSearchForm.test.js.map