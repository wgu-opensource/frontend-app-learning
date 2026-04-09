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
import PropTypes from 'prop-types';
import { Factory } from 'rosie';
import { fireEvent, initializeTestStore, render, screen, } from '../../../../../setupTest';
import SidebarContext from '../../SidebarContext';
import NotificationTrigger from './NotificationTrigger';
describe('Notification Trigger', () => {
    let mockData;
    let getItemSpy;
    let setItemSpy;
    const courseMetadata = Factory.build('courseMetadata');
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield initializeTestStore({
            courseMetadata,
            excludeFetchCourse: true,
            excludeFetchSequence: true,
        });
        mockData = {
            courseId: courseMetadata.id,
            toggleNotificationTray: () => { },
            isNotificationTrayVisible: () => { },
            notificationStatus: 'inactive',
            setNotificationStatus: () => { },
            upgradeNotificationCurrentState: 'FPDdaysLeft',
        };
        // Jest does not support calls to localStorage, spying on localStorage's prototype directly instead
        getItemSpy = jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem');
        setItemSpy = jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
    }));
    afterAll(() => {
        getItemSpy.mockRestore();
        setItemSpy.mockRestore();
    });
    const SidebarWrapper = ({ contextValue, onClick }) => (_jsx(SidebarContext.Provider, Object.assign({ value: contextValue }, { children: _jsx(NotificationTrigger, { onClick: onClick }) })));
    SidebarWrapper.propTypes = {
        contextValue: PropTypes.shape({}).isRequired,
        onClick: PropTypes.func.isRequired,
    };
    function renderWithProvider(data, onClick = () => {
    }) {
        const { container } = render(_jsx(SidebarWrapper, { contextValue: Object.assign(Object.assign({}, mockData), data), onClick: onClick }));
        return container;
    }
    it('handles onClick event toggling the notification tray', () => __awaiter(void 0, void 0, void 0, function* () {
        const toggleNotificationTray = jest.fn();
        const testData = Object.assign(Object.assign({}, mockData), { toggleNotificationTray });
        renderWithProvider(testData, toggleNotificationTray);
        const notificationTrigger = screen.getByRole('button', { name: /Show notification tray/i });
        expect(notificationTrigger).toBeInTheDocument();
        fireEvent.click(notificationTrigger);
        expect(toggleNotificationTray).toHaveBeenCalledTimes(1);
    }));
    it('renders notification trigger icon with red dot when notificationStatus is active', () => __awaiter(void 0, void 0, void 0, function* () {
        const container = renderWithProvider({ notificationStatus: 'active' });
        expect(container).toBeInTheDocument();
        const buttonIcon = container.querySelectorAll('svg');
        expect(buttonIcon).toHaveLength(1);
        expect(screen.getByTestId('notification-dot')).toBeInTheDocument();
    }));
    it('renders notification trigger icon WITHOUT red dot within the same phase', () => __awaiter(void 0, void 0, void 0, function* () {
        const container = renderWithProvider({
            upgradeNotificationLastSeen: 'sameState',
            upgradeNotificationCurrentState: 'sameState',
        });
        expect(container)
            .toBeInTheDocument();
        expect(localStorage.getItem)
            .toHaveBeenCalledWith(`upgradeNotificationLastSeen.${mockData.courseId}`);
        expect(localStorage.getItem(`upgradeNotificationLastSeen.${mockData.courseId}`))
            .toBe('"sameState"');
        const buttonIcon = container.querySelectorAll('svg');
        expect(buttonIcon)
            .toHaveLength(1);
        expect(screen.queryByRole('notification-dot'))
            .not
            .toBeInTheDocument();
    }));
    // Rendering NotificationTrigger has the effect of calling UpdateUpgradeNotificationLastSeen(),
    // if upgradeNotificationLastSeen is different than upgradeNotificationCurrentState
    // it should update localStorage accordingly
    it('makes the right updates when rendering a new phase from an UpgradeNotification change (before -> after)', () => __awaiter(void 0, void 0, void 0, function* () {
        const container = renderWithProvider({
            upgradeNotificationLastSeen: 'before',
            upgradeNotificationCurrentState: 'after',
        });
        expect(container).toBeInTheDocument();
        // verify localStorage get/set are called with correct arguments
        expect(localStorage.getItem).toHaveBeenCalledWith(`upgradeNotificationLastSeen.${mockData.courseId}`);
        expect(localStorage.setItem).toHaveBeenCalledWith(`notificationStatus.${mockData.courseId}`, '"active"');
        expect(localStorage.setItem).toHaveBeenCalledWith(`upgradeNotificationLastSeen.${mockData.courseId}`, '"after"');
        // verify localStorage is updated accordingly
        expect(localStorage.getItem(`upgradeNotificationLastSeen.${mockData.courseId}`)).toBe('"after"');
        expect(localStorage.getItem(`notificationStatus.${mockData.courseId}`)).toBe('"active"');
    }));
    it('handles localStorage from a different course', () => __awaiter(void 0, void 0, void 0, function* () {
        const courseMetadataSecondCourse = Factory.build('courseMetadata', { id: 'second_id' });
        // set localStorage for a different course before rendering NotificationTrigger
        localStorage.setItem(`upgradeNotificationLastSeen.${courseMetadataSecondCourse.id}`, '"accessDateView"');
        localStorage.setItem(`notificationStatus.${courseMetadataSecondCourse.id}`, '"inactive"');
        const container = renderWithProvider({
            upgradeNotificationLastSeen: 'before',
            upgradeNotificationCurrentState: 'after',
        });
        expect(container).toBeInTheDocument();
        // Verify localStorage was updated for the original course
        expect(localStorage.getItem(`upgradeNotificationLastSeen.${mockData.courseId}`)).toBe('"after"');
        expect(localStorage.getItem(`notificationStatus.${mockData.courseId}`)).toBe('"active"');
        // Verify the second course localStorage was not changed
        expect(localStorage.getItem(`upgradeNotificationLastSeen.${courseMetadataSecondCourse.id}`)).toBe('"accessDateView"');
        expect(localStorage.getItem(`notificationStatus.${courseMetadataSecondCourse.id}`)).toBe('"inactive"');
    }));
});
//# sourceMappingURL=NotificationTrigger.test.js.map