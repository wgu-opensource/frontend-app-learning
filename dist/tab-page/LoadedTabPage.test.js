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
import { Factory } from 'rosie';
import { initializeTestStore, render, screen } from '../setupTest';
import LoadedTabPage from './LoadedTabPage';
jest.mock('../course-tabs/CourseTabsNavigation', () => function () {
    return _jsx("div", { "data-testid": "CourseTabsNavigation" });
});
jest.mock('../instructor-toolbar/InstructorToolbar', () => function () {
    return _jsx("div", { "data-testid": "InstructorToolbar" });
});
jest.mock('../shared/streak-celebration/StreakCelebrationModal', () => function () {
    return _jsx("div", { "data-testid": "StreakModal" });
});
jest.mock('../product-tours/ProductTours', () => function () {
    return _jsx("div", { "data-testid": "ProductTours" });
});
describe('Loaded Tab Page', () => {
    const mockData = { activeTabSlug: 'courseware', metadataModel: 'coursewareMeta' };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const store = yield initializeTestStore({ excludeFetchSequence: true });
        mockData.courseId = store.getState().courseware.courseId;
    }));
    it('renders correctly', () => {
        render(_jsx(LoadedTabPage, Object.assign({}, mockData)));
        expect(screen.queryByTestId('CourseTabsNavigation')).toBeInTheDocument();
        expect(screen.queryByTestId('InstructorToolbar')).not.toBeInTheDocument();
    });
    it('shows Instructor Toolbar if original user is staff', () => __awaiter(void 0, void 0, void 0, function* () {
        const courseMetadata = Factory.build('courseMetadata');
        const courseHomeMetadata = Factory.build('courseHomeMetadata', { original_user_is_staff: true });
        const testStore = yield initializeTestStore({
            courseMetadata,
            courseHomeMetadata,
            excludeFetchSequence: true,
        }, false);
        render(_jsx(LoadedTabPage, Object.assign({}, mockData, { courseId: courseMetadata.id })), { store: testStore });
        expect(screen.getByTestId('InstructorToolbar')).toBeInTheDocument();
    }));
    it('shows streak celebration modal', () => __awaiter(void 0, void 0, void 0, function* () {
        const courseMetadata = Factory.build('courseMetadata', { celebrations: { streakLengthToCelebrate: 3 } });
        const testStore = yield initializeTestStore({ courseMetadata }, false);
        render(_jsx(LoadedTabPage, Object.assign({}, mockData, { courseId: courseMetadata.id })), { store: testStore });
        expect(screen.getByTestId('StreakModal')).toBeInTheDocument();
    }));
});
//# sourceMappingURL=LoadedTabPage.test.js.map