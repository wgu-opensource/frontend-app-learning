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
import { getAllByRole } from '@testing-library/dom';
import { act } from '@testing-library/react';
import { getConfig } from '@edx/frontend-platform';
import { MasqueradeWidgetOption } from './MasqueradeWidgetOption';
import { render, fireEvent, initializeTestStore, } from '../../setupTest';
const originalConfig = jest.requireActual('@edx/frontend-platform').getConfig();
jest.mock('@edx/frontend-platform', () => (Object.assign(Object.assign({}, jest.requireActual('@edx/frontend-platform')), { getConfig: jest.fn() })));
getConfig.mockImplementation(() => originalConfig);
describe('Masquerade Widget Dropdown', () => {
    let courseware;
    let mockDataStaff;
    let mockDataStudent;
    let active;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const store = yield initializeTestStore();
        courseware = store.getState().courseware;
        active = {
            courseKey: courseware.courseId,
            groupId: null,
            role: 'staff',
            userName: null,
            userPartitionId: null,
            groupName: null,
        };
        mockDataStaff = {
            groupId: null,
            groupName: 'Staff',
            key: 'Staff',
            role: 'staff',
            selected: active,
            userName: null,
            userPartitionId: null,
            userNameInputToggle: () => { },
            onSubmit: () => { },
        };
        mockDataStudent = {
            groupId: null,
            groupName: 'Specific Student...',
            key: 'Specific Student...',
            role: 'student',
            selected: active,
            userName: '',
            userPartitionId: null,
            userNameInputToggle: () => { },
            onSubmit: () => { },
        };
        Object.defineProperty(global, 'location', {
            configurable: true,
            value: { reload: jest.fn() },
        });
    }));
    it('renders masquerade active option correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const { container } = render(_jsx(MasqueradeWidgetOption, Object.assign({}, mockDataStaff)));
        const button = getAllByRole(container, 'button', { hidden: true })[0];
        expect(button).toHaveTextContent('Staff');
        expect(button).toHaveClass('active');
    }));
    it('renders masquerade inactive option correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const { container } = render(_jsx(MasqueradeWidgetOption, Object.assign({}, mockDataStudent)));
        const button = getAllByRole(container, 'button', { hidden: true })[0];
        expect(button).toHaveTextContent('Specific Student...');
        expect(button).not.toHaveClass('active');
    }));
    it('handles the clicks regular option', () => {
        const onSubmit = jest.fn().mockImplementation(() => Promise.resolve());
        const { container } = render(_jsx(MasqueradeWidgetOption, Object.assign({}, mockDataStaff, { onSubmit: onSubmit })));
        const button = getAllByRole(container, 'button', { hidden: true })[0];
        act(() => {
            fireEvent.click(button);
        });
        expect(onSubmit).toHaveBeenCalled();
    });
    it('handles the clicks student option', () => {
        const userNameInputToggle = jest.fn().mockImplementation(() => Promise.resolve());
        const { container } = render(_jsx(MasqueradeWidgetOption, Object.assign({}, mockDataStudent, { userNameInputToggle: userNameInputToggle })));
        const button = getAllByRole(container, 'button', { hidden: true })[0];
        act(() => {
            fireEvent.click(button);
        });
        expect(userNameInputToggle).toHaveBeenCalled();
    });
});
//# sourceMappingURL=MasqueradeWidgetOption.test.js.map