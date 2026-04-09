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
import MockAdapter from 'axios-mock-adapter';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';
import Calculator from './Calculator';
import { initializeTestStore, render, screen, fireEvent, waitFor, logUnhandledRequests, } from '../../../../setupTest';
describe('Calculator', () => {
    let axiosMock;
    let equationUrl;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield initializeTestStore({ excludeFetchCourse: true, excludeFetchSequence: true });
        axiosMock = new MockAdapter(getAuthenticatedHttpClient());
        equationUrl = new RegExp(`${getConfig().LMS_BASE_URL}/calculate*`);
    }));
    it('expands on click', () => {
        render(_jsx(Calculator, {}));
        expect(screen.queryByRole('button', { name: 'Calculate' })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Calculator Instructions' })).not.toBeInTheDocument();
        const button = screen.getByRole('button', { name: 'Calculator' });
        expect(button.querySelector('svg')).toHaveClass('fa-calculator');
        fireEvent.click(button);
        expect(button.querySelector('svg')).toHaveClass('fa-times-circle');
        expect(screen.getByRole('button', { name: 'Calculate' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Calculator Instructions' })).toBeInTheDocument();
        fireEvent.click(button);
        expect(button.querySelector('svg')).toHaveClass('fa-calculator');
    });
    it('displays instructions on click', () => {
        render(_jsx(Calculator, {}));
        const button = screen.getByRole('button', { name: 'Calculator' });
        fireEvent.click(button);
        const instructionsButton = screen.getByRole('button', { name: 'Calculator Instructions' });
        expect(instructionsButton.querySelector('svg')).toHaveClass('fa-question-circle');
        expect(screen.queryByText(/For detailed information, see/)).not.toBeInTheDocument();
        fireEvent.click(instructionsButton);
        expect(instructionsButton.querySelector('svg')).toHaveClass('fa-times-circle');
        expect(screen.getByText(/For detailed information, see/)).toBeInTheDocument();
        fireEvent.click(instructionsButton);
        expect(instructionsButton.querySelector('svg')).toHaveClass('fa-question-circle');
    });
    it('handles submitting equation', () => __awaiter(void 0, void 0, void 0, function* () {
        const equation = 'log2(2^10)';
        const result = '10';
        axiosMock.reset();
        axiosMock.onGet(equationUrl).reply(200, { result });
        logUnhandledRequests(axiosMock);
        render(_jsx(Calculator, {}));
        fireEvent.click(screen.getByRole('button', { name: 'Calculator' }));
        const input = screen.getByRole('textbox', { name: 'Calculator Input' });
        const output = screen.getByRole('textbox', { name: 'Calculator Result' });
        const submitButton = screen.getByRole('button', { name: 'Calculate' });
        fireEvent.change(input, { target: { value: equation } });
        fireEvent.click(submitButton);
        yield waitFor(() => expect(axiosMock.history.get).toHaveLength(1));
        expect(axiosMock.history.get[0].url).toContain(escape(equation));
        expect(output).toHaveValue(result);
    }));
});
//# sourceMappingURL=Calculator.test.js.map