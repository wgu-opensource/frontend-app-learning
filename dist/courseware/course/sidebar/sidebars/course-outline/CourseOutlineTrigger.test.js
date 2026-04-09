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
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider } from '@edx/frontend-platform/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { initializeTestStore } from '@src/setupTest';
import SidebarContext from '../../SidebarContext';
import { ID as discussionSidebarId } from '../discussions/DiscussionsTrigger';
import CourseOutlineTrigger from './CourseOutlineTrigger';
import { ID as outlineSidebarId } from './constants';
import messages from './messages';
describe('<CourseOutlineTrigger />', () => {
    let mockData;
    let courseId;
    let unitId;
    let store;
    const initTestStore = (options) => __awaiter(void 0, void 0, void 0, function* () {
        store = yield initializeTestStore(options);
        const state = store.getState();
        courseId = state.courseware.courseId;
        [unitId] = Object.keys(state.models.units);
        mockData = {
            courseId,
            unitId,
            currentSidebar: discussionSidebarId,
        };
    });
    function renderWithProvider(testData = {}, props = {}) {
        const { container } = render(_jsx(AppProvider, Object.assign({ store: store, wrapWithRouter: false }, { children: _jsx(IntlProvider, Object.assign({ locale: "en" }, { children: _jsx(SidebarContext.Provider, Object.assign({ value: Object.assign(Object.assign({}, mockData), testData) }, { children: _jsx(CourseOutlineTrigger, Object.assign({}, props)) })) })) })));
        return container;
    }
    it('renders correctly for desktop when sidebar is enabled', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userEvent.setup();
        const mockToggleSidebar = jest.fn();
        yield initTestStore();
        renderWithProvider({ toggleSidebar: mockToggleSidebar }, { isMobileView: false });
        const toggleButton = yield screen.getByRole('button', {
            name: messages.toggleCourseOutlineTrigger.defaultMessage,
        });
        expect(toggleButton).toBeInTheDocument();
        yield user.click(toggleButton);
        expect(mockToggleSidebar).toHaveBeenCalled();
        expect(mockToggleSidebar).toHaveBeenCalledWith(outlineSidebarId);
    }));
    it('renders correctly for mobile when sidebar is enabled', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userEvent.setup();
        const mockToggleSidebar = jest.fn();
        yield initTestStore();
        renderWithProvider({
            toggleSidebar: mockToggleSidebar,
            shouldDisplayFullScreen: true,
        }, { isMobileView: true });
        const toggleButton = yield screen.getByRole('button', {
            name: messages.toggleCourseOutlineTrigger.defaultMessage,
        });
        expect(toggleButton).toBeInTheDocument();
        yield user.click(toggleButton);
        expect(mockToggleSidebar).toHaveBeenCalled();
        expect(mockToggleSidebar).toHaveBeenCalledWith(outlineSidebarId);
    }));
    it('changes current sidebar value on click', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userEvent.setup();
        const mockToggleSidebar = jest.fn();
        yield initTestStore();
        renderWithProvider({
            toggleSidebar: mockToggleSidebar,
            shouldDisplayFullScreen: true,
            currentSidebar: outlineSidebarId,
        }, { isMobileView: true });
        const toggleButton = yield screen.getByRole('button', {
            name: messages.toggleCourseOutlineTrigger.defaultMessage,
        });
        expect(toggleButton).toBeInTheDocument();
        yield user.click(toggleButton);
        expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
        expect(mockToggleSidebar).toHaveBeenCalledWith(null);
    }));
});
//# sourceMappingURL=CourseOutlineTrigger.test.js.map