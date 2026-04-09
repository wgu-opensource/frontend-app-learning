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
import { getConfig } from '@edx/frontend-platform';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { MasqueradeWidget } from './MasqueradeWidget';
import { fireEvent, getAllByRole, initializeTestStore, render, screen, waitFor, within, } from '../../setupTest';
describe('Masquerade Widget Dropdown', () => {
    let mockData;
    let courseware;
    let mockResponse;
    let axiosMock;
    let masqueradeUrl;
    const masqueradeOptions = [
        {
            name: 'Staff',
            role: 'staff',
        },
        {
            name: 'Specific Student...',
            role: 'student',
            user_name: '',
        },
        {
            group_id: 1,
            name: 'Audit',
            role: 'student',
            user_partition_id: 50,
        },
    ];
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const store = yield initializeTestStore();
        courseware = store.getState().courseware;
        axiosMock = new MockAdapter(getAuthenticatedHttpClient());
        masqueradeUrl = `${getConfig().LMS_BASE_URL}/courses/${courseware.courseId}/masquerade`;
        mockData = {
            courseId: courseware.courseId,
            onError: jest.fn(),
        };
    }));
    beforeEach(() => {
        mockResponse = {
            success: true,
            active: {
                course_key: courseware.courseId,
                group_id: null,
                role: 'staff',
                user_name: null,
                user_partition_id: null,
                group_name: null,
            },
            available: masqueradeOptions,
        };
        axiosMock.reset();
        axiosMock.onGet(masqueradeUrl).reply(200, mockResponse);
    });
    it('renders masquerade name correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        render(_jsx(MasqueradeWidget, Object.assign({}, mockData)));
        yield waitFor(() => expect(axiosMock.history.get).toHaveLength(1));
        expect(screen.getByRole('button')).toHaveTextContent('Staff');
    }));
    masqueradeOptions.forEach((option) => {
        it(`marks role ${option.role} as active`, () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c;
            const active = {
                course_key: courseware.courseId,
                group_id: (_a = option.group_id) !== null && _a !== void 0 ? _a : null,
                role: option.role,
                user_name: (_b = option.user_name) !== null && _b !== void 0 ? _b : null,
                user_partition_id: (_c = option.user_partition_id) !== null && _c !== void 0 ? _c : null,
                group_name: null,
            };
            mockResponse = {
                success: true,
                active,
                available: masqueradeOptions,
            };
            axiosMock.reset();
            axiosMock.onGet(masqueradeUrl).reply(200, mockResponse);
            const { container } = render(_jsx(MasqueradeWidget, Object.assign({}, mockData)));
            const dropdownToggle = container.querySelector('.dropdown-toggle');
            fireEvent.click(dropdownToggle);
            const dropdownMenu = container.querySelector('.dropdown-menu');
            yield within(dropdownMenu).findAllByRole('button'); // Wait for the buttons to load/render
            getAllByRole(dropdownMenu, 'button', { hidden: true }).forEach(button => {
                if (button.textContent === option.name) {
                    expect(button).toHaveClass('active');
                }
                else {
                    expect(button).not.toHaveClass('active');
                }
            });
        }));
    });
    it('handles the clicks with toggle', () => __awaiter(void 0, void 0, void 0, function* () {
        const { container } = render(_jsx(MasqueradeWidget, Object.assign({}, mockData)));
        yield waitFor(() => expect(axiosMock.history.get).toHaveLength(1));
        const dropdownToggle = container.querySelector('.dropdown-toggle');
        fireEvent.click(dropdownToggle);
        const dropdownMenu = container.querySelector('.dropdown-menu');
        const studentOption = yield within(dropdownMenu).findByRole('button', { name: 'Specific Student...' });
        fireEvent.click(studentOption);
        getAllByRole(dropdownMenu, 'button', { hidden: true }).forEach(button => {
            if (button.textContent === 'Specific Student...') {
                expect(button).toHaveClass('active');
            }
            else {
                expect(button).not.toHaveClass('active');
            }
        });
    }));
    it('can masquerade as a specific user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userEvent.setup();
        // Configure our mock:
        axiosMock.onPost(masqueradeUrl).reply(200, Object.assign(Object.assign({}, mockResponse), { active: Object.assign(Object.assign({}, mockResponse.active), { role: null, user_name: 'testUser' }) }));
        // Render the masquerade controls:
        const { container } = render(_jsx(MasqueradeWidget, Object.assign({}, mockData)));
        yield waitFor(() => expect(axiosMock.history.get).toHaveLength(1));
        // Select "specific student..."
        const dropdownToggle = container.querySelector('.dropdown-toggle');
        yield user.click(dropdownToggle);
        const dropdownMenu = container.querySelector('.dropdown-menu');
        const studentOption = yield within(dropdownMenu).findByRole('button', { name: 'Specific Student...' });
        yield user.click(studentOption);
        // Enter a username, POST the request to the server
        const usernameInput = yield screen.findByLabelText(/Username or email/);
        yield user.type(usernameInput, 'testuser');
        expect(axiosMock.history.post).toHaveLength(0);
        yield user.keyboard('{Enter}');
        yield waitFor(() => expect(axiosMock.history.post).toHaveLength(1));
    }));
    it('can display an error when failing to masquerade as a specific user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userEvent.setup();
        // Configure our mock:
        axiosMock.onPost(masqueradeUrl).reply(200, {
            success: false,
            error: 'That user does not exist',
        });
        // Render the masquerade controls:
        const { container } = render(_jsx(MasqueradeWidget, Object.assign({}, mockData)));
        yield waitFor(() => expect(axiosMock.history.get).toHaveLength(1));
        // Select "specific student..."
        const dropdownToggle = container.querySelector('.dropdown-toggle');
        yield user.click(dropdownToggle);
        const dropdownMenu = container.querySelector('.dropdown-menu');
        const studentOption = yield within(dropdownMenu).findByRole('button', { name: 'Specific Student...' });
        yield user.click(studentOption);
        // Enter a username, POST the request to the server
        const usernameInput = yield screen.findByLabelText(/Username or email/);
        yield user.type(usernameInput, 'testuser');
        expect(axiosMock.history.post).toHaveLength(0);
        yield user.keyboard('{Enter}');
        yield waitFor(() => expect(axiosMock.history.post).toHaveLength(1));
        yield waitFor(() => {
            expect(mockData.onError).toHaveBeenLastCalledWith('That user does not exist');
        });
    }));
    it('can display an error when failing to masquerade as a specific user due to network issues etc', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userEvent.setup();
        // Configure our mock:
        axiosMock.onPost(masqueradeUrl).networkError();
        // Render the masquerade controls:
        const { container } = render(_jsx(MasqueradeWidget, Object.assign({}, mockData)));
        yield waitFor(() => expect(axiosMock.history.get).toHaveLength(1));
        // Select "specific student..."
        const dropdownToggle = container.querySelector('.dropdown-toggle');
        yield user.click(dropdownToggle);
        const dropdownMenu = container.querySelector('.dropdown-menu');
        const studentOption = yield within(dropdownMenu).findByRole('button', { name: 'Specific Student...' });
        yield user.click(studentOption);
        // Enter a username, POST the request to the server
        const usernameInput = yield screen.findByLabelText(/Username or email/);
        yield user.type(usernameInput, 'testuser');
        expect(axiosMock.history.post).toHaveLength(0);
        yield user.keyboard('{Enter}');
        yield waitFor(() => expect(axiosMock.history.post).toHaveLength(1));
        yield waitFor(() => {
            expect(mockData.onError).toHaveBeenLastCalledWith('An error has occurred; please try again.');
        });
    }));
});
//# sourceMappingURL=MasqueradeWidget.test.js.map