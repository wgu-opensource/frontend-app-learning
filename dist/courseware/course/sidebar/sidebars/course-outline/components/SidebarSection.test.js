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
import { useMemo } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { AppProvider } from '@edx/frontend-platform/react';
import { initializeTestStore } from '@src/setupTest';
import courseOutlineMessages from '@src/course-home/outline-tab/messages';
import SidebarContext from '../../../SidebarContext';
import SidebarSection from './SidebarSection';
describe('<SidebarSection />', () => {
    let mockHandleSelectSection;
    let store;
    let section;
    const initTestStore = (options) => __awaiter(void 0, void 0, void 0, function* () {
        store = yield initializeTestStore(options);
        const state = store.getState();
        const [activeSectionId] = Object.keys(state.courseware.courseOutline.sections);
        section = state.courseware.courseOutline.sections[activeSectionId];
    });
    const RootWrapper = (props) => {
        const mockData = useMemo(() => ({ toggleSidebar: jest.fn() }), []);
        return (_jsx(AppProvider, Object.assign({ store: store, wrapWithRouter: false }, { children: _jsx(IntlProvider, Object.assign({ locale: "en" }, { children: _jsx(SidebarContext.Provider, Object.assign({ value: mockData }, { children: _jsx(SidebarSection, Object.assign({ section: section, handleSelectSection: mockHandleSelectSection }, props)) })) })) })));
    };
    beforeEach(() => {
        mockHandleSelectSection = jest.fn();
    });
    it('renders correctly when section is incomplete', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userEvent.setup();
        yield initTestStore();
        const { getByText, container } = render(_jsx(RootWrapper, {}));
        expect(getByText(section.title)).toBeInTheDocument();
        expect(getByText(`, ${courseOutlineMessages.incompleteSection.defaultMessage}`)).toBeInTheDocument();
        expect(container.querySelector('.text-success')).not.toBeInTheDocument();
        const button = getByText(section.title);
        yield user.click(button);
        expect(mockHandleSelectSection).toHaveBeenCalledTimes(1);
        expect(mockHandleSelectSection).toHaveBeenCalledWith(section.id);
    }));
    it('renders correctly when section is complete', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userEvent.setup();
        yield initTestStore();
        const { getByText, getByTestId } = render(_jsx(RootWrapper, { section: Object.assign(Object.assign({}, section), { completionStat: { completed: 4, total: 4 }, complete: true }) }));
        expect(getByText(section.title)).toBeInTheDocument();
        expect(getByText(`, ${courseOutlineMessages.completedSection.defaultMessage}`)).toBeInTheDocument();
        expect(getByTestId('check-circle-icon')).toBeInTheDocument();
        const button = getByText(section.title);
        yield user.click(button);
        expect(mockHandleSelectSection).toHaveBeenCalledTimes(1);
        expect(mockHandleSelectSection).toHaveBeenCalledWith(section.id);
    }));
});
//# sourceMappingURL=SidebarSection.test.js.map