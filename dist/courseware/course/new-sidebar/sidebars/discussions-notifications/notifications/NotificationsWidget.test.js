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
import MockAdapter from 'axios-mock-adapter';
import { Factory } from 'rosie';
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { breakpoints } from '@openedx/paragon';
import { initializeMockApp, render, screen, act, fireEvent, waitFor, } from '../../../../../../setupTest';
import initializeStore from '../../../../../../store';
import { appendBrowserTimezoneToUrl, executeThunk } from '../../../../../../utils';
import { fetchCourse } from '../../../../../data';
import SidebarContext from '../../../SidebarContext';
import NotificationsWidget from './NotificationsWidget';
import setupDiscussionSidebar from '../../../../test-utils';
initializeMockApp();
jest.mock('@edx/frontend-platform/analytics');
describe('NotificationsWidget', () => {
    let axiosMock;
    let store;
    const ID = 'DISCUSSIONS_NOTIFICATIONS';
    const defaultMetadata = Factory.build('courseMetadata');
    const courseId = defaultMetadata.id;
    let courseMetadataUrl = `${getConfig().LMS_BASE_URL}/api/courseware/course/${defaultMetadata.id}`;
    courseMetadataUrl = appendBrowserTimezoneToUrl(courseMetadataUrl);
    const courseHomeMetadata = Factory.build('courseHomeMetadata');
    const courseHomeMetadataUrl = appendBrowserTimezoneToUrl(`${getConfig().LMS_BASE_URL}/api/course_home/course_metadata/${courseId}`);
    function setMetadata(attributes, options = undefined) {
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
        var _a;
        global.innerWidth = (_a = breakpoints.large.minWidth) !== null && _a !== void 0 ? _a : 992;
        store = initializeStore();
        axiosMock = new MockAdapter(getAuthenticatedHttpClient());
        axiosMock.onGet(courseMetadataUrl).reply(200, defaultMetadata);
        axiosMock.onGet(courseHomeMetadataUrl).reply(200, courseHomeMetadata);
    }));
    it('successfully Open/Hide sidebar tray', () => __awaiter(void 0, void 0, void 0, function* () {
        const userVerifiedMode = Factory.build('verifiedMode');
        yield setupDiscussionSidebar({ verifiedMode: userVerifiedMode, isNewDiscussionSidebarViewEnabled: true });
        const sidebarButton = yield screen.getByRole('button', { name: /Show sidebar tray/i });
        yield act(() => __awaiter(void 0, void 0, void 0, function* () {
            fireEvent.click(sidebarButton);
        }));
        yield waitFor(() => __awaiter(void 0, void 0, void 0, function* () {
            expect(screen.queryByTestId('sidebar-DISCUSSIONS_NOTIFICATIONS')).toBeInTheDocument();
            expect(screen.queryByTestId('notification-widget')).toBeInTheDocument();
            expect(screen.queryByTitle('Discussions')).toBeInTheDocument();
        }));
        yield act(() => __awaiter(void 0, void 0, void 0, function* () {
            fireEvent.click(sidebarButton);
        }));
        yield waitFor(() => __awaiter(void 0, void 0, void 0, function* () {
            expect(screen.queryByTestId('sidebar-DISCUSSIONS_NOTIFICATIONS')).not.toBeInTheDocument();
            expect(screen.queryByTestId('notification-widget')).not.toBeInTheDocument();
            expect(screen.queryByTitle('Discussions')).not.toBeInTheDocument();
        }));
    }));
    it('includes notification_widget_slot', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fetchAndRender(_jsx(SidebarContext.Provider, Object.assign({ value: {
                currentSidebar: ID,
                courseId,
                hideNotificationbar: false,
                isNotificationbarAvailable: true,
            } }, { children: _jsx(NotificationsWidget, {}) })));
        expect(screen.getByTestId('org.openedx.frontend.learning.notification_widget.v1')).toBeInTheDocument();
    }));
    it('renders no notifications bar if no verified mode', () => __awaiter(void 0, void 0, void 0, function* () {
        setMetadata({ verified_mode: null });
        const contextData = {
            currentSidebar: ID,
            courseId,
            hideNotificationbar: true,
            isNotificationbarAvailable: false,
        };
        yield fetchAndRender(_jsx(SidebarContext.Provider, Object.assign({ value: contextData }, { children: _jsx(NotificationsWidget, {}) })));
        expect(screen.queryByText('Notifications')).not.toBeInTheDocument();
    }));
    it('marks notification as seen 3 seconds later', () => __awaiter(void 0, void 0, void 0, function* () {
        const onNotificationSeen = jest.fn();
        const contextData = {
            currentSidebar: ID,
            courseId,
            onNotificationSeen,
            hideNotificationbar: false,
            isNotificationbarAvailable: true,
        };
        yield fetchAndRender(_jsx(SidebarContext.Provider, Object.assign({ value: contextData }, { children: _jsx(NotificationsWidget, {}) })));
        expect(onNotificationSeen).toHaveBeenCalledTimes(0);
        yield waitFor(() => expect(onNotificationSeen).toHaveBeenCalledTimes(1), { timeout: 3500 });
    }));
});
//# sourceMappingURL=NotificationsWidget.test.js.map