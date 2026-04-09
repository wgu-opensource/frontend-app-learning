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
import { getConfig } from '@edx/frontend-platform';
import { initializeTestStore, render, screen, } from '../../setupTest';
import ActiveEnterpriseAlert from './ActiveEnterpriseAlert';
describe('ActiveEnterpriseAlert', () => {
    const mockData = {
        payload: {
            text: 'test message',
            courseId: 'test-course-id',
        },
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield initializeTestStore({ excludeFetchCourse: true, excludeFetchSequence: true });
    }));
    it('Shows alert message and links', () => {
        render(_jsx(ActiveEnterpriseAlert, Object.assign({}, mockData)));
        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByText('test message', { exact: false })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'change enterprise now' })).toHaveAttribute('href', `${getConfig().LMS_BASE_URL}/enterprise/select/active/?success_url=http%3A%2F%2Flocalhost%2Fcourse%2Ftest-course-id%2Fhome`);
    });
});
//# sourceMappingURL=ActiveEnterpriseAlert.test.js.map