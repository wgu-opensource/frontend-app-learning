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
/* eslint-disable react/jsx-no-constructed-context-values */
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { breakpoints } from '@openedx/paragon';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { Factory } from 'rosie';
import { fireEvent, initializeMockApp, render, screen, waitFor, } from '../../../../../setupTest';
import initializeStore from '../../../../../store';
import { appendBrowserTimezoneToUrl, executeThunk } from '../../../../../utils';
import { fetchCourse } from '../../../../data';
import SidebarContext from '../../SidebarContext';
import { ID } from './index';
import NotificationTray from './NotificationTray';
initializeMockApp();
jest.mock('@edx/frontend-platform/analytics');
describe('NotificationTray', () => {
    let axiosMock;
    let store;
    const defaultMetadata = Factory.build('courseMetadata');
    const courseId = defaultMetadata.id;
    let courseMetadataUrl = `${getConfig().LMS_BASE_URL}/api/courseware/course/${defaultMetadata.id}`;
    courseMetadataUrl = appendBrowserTimezoneToUrl(courseMetadataUrl);
    const courseHomeMetadata = Factory.build('courseHomeMetadata');
    const courseHomeMetadataUrl = appendBrowserTimezoneToUrl(`${getConfig().LMS_BASE_URL}/api/course_home/course_metadata/${courseId}`);
    function setMetadata(attributes, options) {
        const updatedCourseHomeMetadata = Factory.build('courseHomeMetadata', attributes, options);
        axiosMock.onGet(courseHomeMetadataUrl).reply(200, updatedCourseHomeMetadata);
    }
    function fetchAndRender(component) {
        return __awaiter(this, void 0, void 0, function* () {
            yield executeThunk(fetchCourse(defaultMetadata.id), store.dispatch);
            render(component, { store });
        });
    }
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        global.innerWidth = breakpoints.large.minWidth;
        store = initializeStore();
        axiosMock = new MockAdapter(getAuthenticatedHttpClient());
        axiosMock.onGet(courseMetadataUrl).reply(200, defaultMetadata);
        axiosMock.onGet(courseHomeMetadataUrl).reply(200, courseHomeMetadata);
    }));
    it('renders notification tray and close tray button', () => __awaiter(void 0, void 0, void 0, function* () {
        global.innerWidth = breakpoints.extraLarge.minWidth;
        const toggleNotificationTray = jest.fn();
        yield fetchAndRender(_jsx(SidebarContext.Provider, Object.assign({ value: {
                currentSidebar: ID,
                courseId,
                toggleSidebar: toggleNotificationTray,
                shouldDisplayFullScreen: false,
            } }, { children: _jsx(NotificationTray, {}) })));
        expect(screen.getByText('Notifications'))
            .toBeInTheDocument();
        const notificationCloseIconButton = screen.getByRole('button', { name: /Close notification tray/i });
        expect(notificationCloseIconButton)
            .toBeInTheDocument();
        expect(notificationCloseIconButton)
            .toHaveClass('btn-icon-primary');
        fireEvent.click(notificationCloseIconButton);
        expect(toggleNotificationTray)
            .toHaveBeenCalledTimes(1);
        // should not render responsive "Back to course" to close the tray
        expect(screen.queryByText('Back to course'))
            .not
            .toBeInTheDocument();
    }));
    it('includes notification_tray_slot', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fetchAndRender(_jsx(SidebarContext.Provider, Object.assign({ value: {
                currentSidebar: ID,
                courseId,
            } }, { children: _jsx(NotificationTray, {}) })));
        expect(screen.getByTestId('org.openedx.frontend.learning.notification_tray.v1')).toBeInTheDocument();
    }));
    it('renders no notifications message if no verified mode', () => __awaiter(void 0, void 0, void 0, function* () {
        setMetadata({ verified_mode: null });
        yield fetchAndRender(_jsx(SidebarContext.Provider, Object.assign({ value: {
                currentSidebar: ID,
                courseId,
            } }, { children: _jsx(NotificationTray, {}) })));
        expect(screen.queryByText('You have no new notifications at this time.'))
            .toBeInTheDocument();
    }));
    it('renders notification tray with full screen "Back to course" at responsive view', () => __awaiter(void 0, void 0, void 0, function* () {
        global.innerWidth = breakpoints.medium.maxWidth;
        const toggleNotificationTray = jest.fn();
        yield fetchAndRender(_jsx(SidebarContext.Provider, Object.assign({ value: {
                currentSidebar: ID,
                courseId,
                shouldDisplayFullScreen: true,
                toggleSidebar: toggleNotificationTray,
            } }, { children: _jsx(NotificationTray, {}) })));
        const responsiveCloseButton = screen.getByRole('button', { name: 'Back to course' });
        yield waitFor(() => expect(responsiveCloseButton)
            .toBeInTheDocument());
        fireEvent.click(responsiveCloseButton);
        expect(toggleNotificationTray)
            .toHaveBeenCalledTimes(1);
    }));
    it('marks notification as seen 3 seconds later', () => __awaiter(void 0, void 0, void 0, function* () {
        const onNotificationSeen = jest.fn();
        yield fetchAndRender(_jsx(SidebarContext.Provider, Object.assign({ value: {
                currentSidebar: ID,
                courseId,
                onNotificationSeen,
            } }, { children: _jsx(NotificationTray, {}) })));
        expect(onNotificationSeen).toHaveBeenCalledTimes(0);
        yield waitFor(() => expect(onNotificationSeen).toHaveBeenCalledTimes(1), { timeout: 3500 });
    }));
});
//# sourceMappingURL=NotificationTray.test.js.map