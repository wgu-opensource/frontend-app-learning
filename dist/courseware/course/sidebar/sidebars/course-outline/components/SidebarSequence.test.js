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
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider } from '@edx/frontend-platform/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import courseOutlineMessages from '@src/course-home/outline-tab/messages';
import { initializeMockApp, initializeTestStore } from '@src/setupTest';
import SidebarContext from '../../../SidebarContext';
import messages from '../messages';
import SidebarSequence from './SidebarSequence';
initializeMockApp();
describe('<SidebarSequence />', () => {
    let courseId;
    let store;
    let sequence;
    let unit;
    const sequenceDescription = 'sequence test description';
    let mockData;
    const initTestStore = (options) => __awaiter(void 0, void 0, void 0, function* () {
        store = yield initializeTestStore(options);
        const state = store.getState();
        courseId = state.courseware.courseId;
        let activeSequenceId = '';
        [activeSequenceId] = Object.keys(state.courseware.courseOutline.sequences);
        sequence = state.courseware.courseOutline.sequences[activeSequenceId];
        const unitId = sequence.unitIds[0];
        unit = state.courseware.courseOutline.units[unitId];
        mockData = {
            toggleSidebar: jest.fn(),
        };
    });
    function renderWithProvider(props = {}) {
        const { container } = render(_jsx(AppProvider, Object.assign({ store: store, wrapWithRouter: false }, { children: _jsx(IntlProvider, Object.assign({ locale: "en" }, { children: _jsx(SidebarContext.Provider, Object.assign({ value: Object.assign({}, mockData) }, { children: _jsx(MemoryRouter, { children: _jsx(SidebarSequence, Object.assign({ courseId: courseId, defaultOpen: false, sequence: sequence, activeUnitId: sequence.unitIds[0] }, props)) }) })) })) })));
        return container;
    }
    it('renders correctly when sequence is collapsed and incomplete', () => __awaiter(void 0, void 0, void 0, function* () {
        yield initTestStore();
        renderWithProvider();
        expect(screen.getByText(sequence.title)).toBeInTheDocument();
        expect(screen.queryByText(sequenceDescription)).not.toBeInTheDocument();
        expect(screen.getByText(`, ${courseOutlineMessages.incompleteAssignment.defaultMessage}`)).toBeInTheDocument();
        expect(screen.queryByText(unit.title)).not.toBeInTheDocument();
    }));
    it('renders correctly when sequence is not collapsed and complete and completion tracking enabled', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userEvent.setup();
        yield initTestStore();
        renderWithProvider({
            defaultOpen: true,
            sequence: Object.assign(Object.assign({}, sequence), { specialExamInfo: sequenceDescription, complete: true }),
        });
        expect(screen.getByText(sequence.title)).toBeInTheDocument();
        expect(screen.getByText(sequenceDescription)).toBeInTheDocument();
        expect(screen.getByText(`, ${courseOutlineMessages.completedAssignment.defaultMessage}`)).toBeInTheDocument();
        expect(screen.getByText(unit.title)).toBeInTheDocument();
        expect(screen.getByText(`, ${messages.incompleteUnit.defaultMessage}`)).toBeInTheDocument();
        yield user.click(screen.getByText(sequence.title));
        yield waitFor(() => {
            expect(screen.queryByText(unit.title)).not.toBeInTheDocument();
            expect(screen.queryByText(`, ${messages.incompleteUnit.defaultMessage}`)).not.toBeInTheDocument();
        });
    }));
});
//# sourceMappingURL=SidebarSequence.test.js.map