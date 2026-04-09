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
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider } from '@edx/frontend-platform/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { initializeTestStore } from '@src/setupTest';
import courseOutlineMessages from '@src/course-home/outline-tab/messages';
import SidebarContext from '../../SidebarContext';
import CourseOutlineTray from './CourseOutlineTray';
import { ID as outlineSidebarId } from './constants';
import messages from './messages';
describe('<CourseOutlineTray />', () => {
    let store;
    let section = {};
    let sequence = {};
    let unit;
    let unitId;
    let courseId;
    let mockData;
    const initTestStore = (options) => __awaiter(void 0, void 0, void 0, function* () {
        store = yield initializeTestStore(options);
        const state = store.getState();
        courseId = state.courseware.courseId;
        [unitId] = Object.keys(state.models.units);
        if (Object.keys(state.courseware.courseOutline).length) {
            const [activeSequenceId] = Object.keys(state.courseware.courseOutline.sequences);
            sequence = state.courseware.courseOutline.sequences[activeSequenceId];
            const activeSectionId = Object.keys(state.courseware.courseOutline.sections)[0];
            section = state.courseware.courseOutline.sections[activeSectionId];
            [unitId] = sequence.unitIds;
            unit = state.courseware.courseOutline.units[unitId];
        }
        mockData = {
            courseId,
            unitId,
            currentSidebar: outlineSidebarId,
            toggleSidebar: jest.fn(),
        };
    });
    function renderWithProvider(testData = {}) {
        const { container } = render(_jsx(AppProvider, Object.assign({ store: store, wrapWithRouter: false }, { children: _jsx(IntlProvider, Object.assign({ locale: "en" }, { children: _jsx(SidebarContext.Provider, Object.assign({ value: Object.assign(Object.assign({}, mockData), testData) }, { children: _jsx(MemoryRouter, { children: _jsx(CourseOutlineTray, {}) }) })) })) })));
        return container;
    }
    it('renders correctly when course outline is loading', () => __awaiter(void 0, void 0, void 0, function* () {
        yield initTestStore({ excludeFetchOutlineSidebar: true });
        renderWithProvider();
        expect(screen.getByText(messages.loading.defaultMessage)).toBeInTheDocument();
        expect(screen.getByText(messages.courseOutlineTitle.defaultMessage)).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Course outline' })).not.toBeInTheDocument();
    }));
    it('renders correctly when course outline is loaded', () => __awaiter(void 0, void 0, void 0, function* () {
        yield initTestStore();
        renderWithProvider();
        yield expect(screen.queryByText(messages.loading.defaultMessage)).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: section.title })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: messages.toggleCourseOutlineTrigger.defaultMessage })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: `${sequence.title} , ${courseOutlineMessages.incompleteAssignment.defaultMessage}` })).toBeInTheDocument();
        expect(screen.getByText(unit.title)).toBeInTheDocument();
    }));
    it('collapses sidebar correctly when toggle button is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userEvent.setup();
        const mockToggleSidebar = jest.fn();
        yield initTestStore();
        renderWithProvider({ toggleSidebar: mockToggleSidebar });
        const collapseBtn = screen.getByRole('button', { name: messages.toggleCourseOutlineTrigger.defaultMessage });
        const sidebarBackBtn = screen.queryByRole('button', { name: section.title });
        expect(sidebarBackBtn).toBeInTheDocument();
        expect(collapseBtn).toBeInTheDocument();
        yield user.click(collapseBtn);
        expect(mockToggleSidebar).toHaveBeenCalledWith(null);
    }));
    it('collapses sidebar correctly when screen is resized', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockToggleSidebar = jest.fn();
        yield initTestStore();
        renderWithProvider({ toggleSidebar: mockToggleSidebar });
        const collapseBtn = screen.getByRole('button', { name: messages.toggleCourseOutlineTrigger.defaultMessage });
        expect(collapseBtn).toBeInTheDocument();
        // Simulate screen resize
        window.innerWidth = 500;
        window.dispatchEvent(new Event('resize'));
        expect(mockToggleSidebar).toHaveBeenCalledWith(null);
    }));
    it('navigates to section or sequence level correctly on click by back/section button', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userEvent.setup();
        yield initTestStore();
        renderWithProvider();
        const sidebarBackBtn = screen.queryByRole('button', { name: section.title });
        expect(sidebarBackBtn).toBeInTheDocument();
        expect(screen.getByRole('button', { name: `${sequence.title} , ${courseOutlineMessages.incompleteAssignment.defaultMessage}` })).toBeInTheDocument();
        yield user.click(sidebarBackBtn);
        expect(sidebarBackBtn).not.toBeInTheDocument();
        expect(screen.queryByText(messages.courseOutlineTitle.defaultMessage)).toBeInTheDocument();
        yield user.click(screen.getByRole('button', { name: `${section.title} , ${courseOutlineMessages.incompleteSection.defaultMessage}` }));
        expect(screen.queryByRole('button', { name: section.title })).toBeInTheDocument();
    }));
});
//# sourceMappingURL=CourseOutlineTray.test.js.map