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
import { AppProvider } from '@edx/frontend-platform/react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { sendTrackEvent, sendTrackingLogEvent } from '@edx/frontend-platform/analytics';
import { initializeMockApp, initializeTestStore } from '@src/setupTest';
import SidebarContext from '../../../SidebarContext';
import SidebarUnit from './SidebarUnit';
import { ID } from '../constants';
jest.mock('@edx/frontend-platform/analytics', () => ({
    sendTrackEvent: jest.fn(),
    sendTrackingLogEvent: jest.fn(),
}));
initializeMockApp();
describe('<SidebarUnit />', () => {
    let store = {};
    let unit;
    let sequenceId;
    let defaultSidebarContext;
    const initTestStore = (options) => __awaiter(void 0, void 0, void 0, function* () {
        store = yield initializeTestStore(options);
        const state = store.getState();
        [sequenceId] = Object.keys(state.courseware.courseOutline.sequences);
        const sequence = state.courseware.courseOutline.sequences[sequenceId];
        unit = state.courseware.courseOutline.units[sequence.unitIds[0]];
        defaultSidebarContext = {
            toggleSidebar: jest.fn(),
            currentSidebar: ID,
        };
    });
    function renderWithProvider(props = {}, sidebarContext = defaultSidebarContext, pathname = '/course') {
        const { container } = render(_jsx(AppProvider, Object.assign({ store: store, wrapWithRouter: false }, { children: _jsx(IntlProvider, Object.assign({ locale: "en" }, { children: _jsx(SidebarContext.Provider, Object.assign({ value: Object.assign({}, sidebarContext) }, { children: _jsx(MemoryRouter, Object.assign({ initialEntries: [{ pathname }] }, { children: _jsx(SidebarUnit, Object.assign({ isFirst: true, id: unit.id, courseId: "course123", sequenceId: sequenceId, unit: Object.assign(Object.assign({}, unit), { icon: 'video', isLocked: false }), isActive: false, activeUnitId: unit.id, isCompletionTrackingEnabled: true }, props)) })) })) })) })));
        return container;
    }
    it('renders correctly when unit is incomplete', () => __awaiter(void 0, void 0, void 0, function* () {
        yield initTestStore();
        const container = renderWithProvider();
        expect(screen.getByText(unit.title)).toBeInTheDocument();
        expect(container.querySelector('.text-success')).not.toBeInTheDocument();
    }));
    it('renders correctly when unit is complete and tracking enabled', () => __awaiter(void 0, void 0, void 0, function* () {
        yield initTestStore();
        const container = renderWithProvider({ unit: Object.assign(Object.assign({}, unit), { complete: true }) });
        expect(screen.getByText(unit.title)).toBeInTheDocument();
        expect(container.querySelector('.text-success')).toBeInTheDocument();
        expect(container.querySelector('.border-top')).not.toBeInTheDocument();
    }));
    it('renders correctly when unit is not first and icon is not set', () => __awaiter(void 0, void 0, void 0, function* () {
        yield initTestStore();
        const container = renderWithProvider({
            isFirst: false,
            unit: Object.assign(Object.assign({}, unit), { icon: null }),
        });
        expect(screen.getByText(unit.title)).toBeInTheDocument();
        expect(container.querySelector('.border-top')).toBeInTheDocument();
    }));
    it('renders correctly when unit is locked', () => __awaiter(void 0, void 0, void 0, function* () {
        yield initTestStore();
        renderWithProvider({
            unit: Object.assign(Object.assign({}, unit), { isLocked: true }),
        });
        expect(screen.getByText(unit.title)).toBeInTheDocument();
    }));
    describe('When a unit is clicked', () => {
        it('sends log event correctly', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = userEvent.setup();
            yield initTestStore();
            renderWithProvider({ unit: Object.assign({}, unit) });
            const logData = {
                id: unit.id,
                current_tab: 1,
                tab_count: 1,
                target_id: unit.id,
                target_tab: 1,
                widget_placement: 'left',
            };
            yield user.click(screen.getByText(unit.title));
            expect(sendTrackEvent).toHaveBeenCalledWith('edx.ui.lms.sequence.tab_selected', logData);
            expect(sendTrackingLogEvent).toHaveBeenCalledWith('edx.ui.lms.sequence.tab_selected', logData);
        }));
        it('leaves sidebar open in desktop mode', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = userEvent.setup();
            yield initTestStore();
            renderWithProvider({ unit: Object.assign({}, unit) });
            yield user.click(screen.getByText(unit.title));
            expect(defaultSidebarContext.toggleSidebar).not.toHaveBeenCalled();
            expect(window.sessionStorage.getItem('hideCourseOutlineSidebar')).toBeNull();
        }));
        it('closes sidebar on mobile devices', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = userEvent.setup();
            yield initTestStore();
            renderWithProvider({ unit: Object.assign({}, unit) }, Object.assign(Object.assign({}, defaultSidebarContext), { shouldDisplayFullScreen: true }));
            yield user.click(screen.getByText(unit.title));
            expect(defaultSidebarContext.toggleSidebar).toHaveBeenCalledTimes(1);
            expect(defaultSidebarContext.toggleSidebar).toHaveBeenCalledWith(null);
            expect(window.sessionStorage.getItem('hideCourseOutlineSidebar')).toEqual('true');
        }));
    });
    describe('UnitLinkWrapper', () => {
        describe('course in preview mode', () => {
            beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
                yield initTestStore();
                renderWithProvider({ unit: Object.assign({}, unit) }, Object.assign(Object.assign({}, defaultSidebarContext), { shouldDisplayFullScreen: true }), '/preview/course');
            }));
            it('href includes /preview', () => __awaiter(void 0, void 0, void 0, function* () {
                const unitLink = screen.getByText(unit.title).closest('a');
                const linkHref = unitLink.getAttribute('href');
                expect(linkHref.includes('/preview/')).toBeTruthy();
            }));
        });
        describe('course in live mode', () => {
            beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
                yield initTestStore();
                renderWithProvider({ unit: Object.assign({}, unit) }, Object.assign(Object.assign({}, defaultSidebarContext), { shouldDisplayFullScreen: true }));
            }));
            it('href does not include /preview/', () => __awaiter(void 0, void 0, void 0, function* () {
                const unitLink = screen.getByText(unit.title).closest('a');
                const linkHref = unitLink.getAttribute('href');
                expect(linkHref.includes('/preview/')).toBeFalsy();
            }));
        });
    });
});
//# sourceMappingURL=SidebarUnit.test.js.map