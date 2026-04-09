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
import { fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { getConfig } from '@edx/frontend-platform';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getSessionStorage, setSessionStorage } from '../../../../../../data/sessionStorage';
import { initializeMockApp, initializeTestStore, render, screen, } from '../../../../../../setupTest';
import { executeThunk } from '../../../../../../utils';
import { buildTopicsFromUnits } from '../../../../../data/__factories__/discussionTopics.factory';
import { getCourseDiscussionTopics } from '../../../../../data/thunks';
import SidebarContext from '../../../SidebarContext';
import DiscussionsNotificationsSidebar from '../DiscussionsNotificationsSidebar';
import DiscussionsNotificationsTrigger from '../DiscussionsNotificationsTrigger';
import DiscussionsWidget from './DiscussionsWidget';
initializeMockApp();
jest.mock('@edx/frontend-platform/analytics');
jest.mock('../../../../../../data/sessionStorage', () => ({
    getSessionStorage: jest.fn(),
    setSessionStorage: jest.fn(),
}));
const onClickMock = jest.fn();
describe('DiscussionsWidget', () => {
    let axiosMock;
    let mockData;
    let courseId;
    let unitId;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const store = yield initializeTestStore({
            excludeFetchCourse: false,
            excludeFetchSequence: false,
        });
        axiosMock = new MockAdapter(getAuthenticatedHttpClient());
        const state = store.getState(); // TODO: remove 'any' once redux state gets types
        courseId = state.courseware.courseId;
        [unitId] = Object.keys(state.models.units);
        mockData = {
            courseId,
            unitId,
            currentSidebar: 'NEWSIDEBAR',
            hideDiscussionbar: false,
            isDiscussionbarAvailable: true,
        };
        axiosMock.onGet(`${getConfig().LMS_BASE_URL}/api/discussion/v1/courses/${courseId}`).reply(200, {
            provider: 'openedx',
        });
        axiosMock.onGet(`${getConfig().LMS_BASE_URL}/api/discussion/v2/course_topics/${courseId}`)
            .reply(200, buildTopicsFromUnits(state.models.units));
        yield executeThunk(getCourseDiscussionTopics(courseId), store.dispatch);
    }));
    function renderWithProvider(Component, testData = {}) {
        const { container } = render(_jsx(SidebarContext.Provider, Object.assign({ value: Object.assign(Object.assign({}, mockData), testData) }, { children: _jsx(Component, {}) })));
        return container;
    }
    it('should show up if unit discussions associated with it', () => __awaiter(void 0, void 0, void 0, function* () {
        renderWithProvider(DiscussionsWidget);
        expect(screen.queryByTitle('Discussions')).toBeInTheDocument();
        expect(screen.queryByTitle('Discussions'))
            .toHaveAttribute('src', `http://localhost:2002/${courseId}/category/${unitId}?inContextSidebar`);
    }));
    it('should show nothing if unit has no discussions associated with it', () => __awaiter(void 0, void 0, void 0, function* () {
        renderWithProvider(DiscussionsWidget, { isDiscussionbarAvailable: false });
        expect(screen.queryByTitle('Discussions')).not.toBeInTheDocument();
    }));
    it('should display the Back to course button on small screens.', () => __awaiter(void 0, void 0, void 0, function* () {
        sendTrackEvent.mockClear();
        renderWithProvider(DiscussionsNotificationsSidebar, { shouldDisplayFullScreen: true });
        expect(screen.queryByText('Back to course')).toBeInTheDocument();
        expect(sendTrackEvent).toHaveBeenCalledTimes(1);
    }));
    it('should open notification tray if closed', () => {
        getSessionStorage.mockReturnValue('closed');
        renderWithProvider(() => _jsx(DiscussionsNotificationsTrigger, { onClick: onClickMock }));
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(setSessionStorage).toHaveBeenCalledWith(`notificationTrayStatus.${courseId}`, 'open');
        expect(onClickMock).toHaveBeenCalled();
    });
    it('should close notification tray if open', () => {
        getSessionStorage.mockReturnValue('open');
        renderWithProvider(() => _jsx(DiscussionsNotificationsTrigger, { onClick: onClickMock }));
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(setSessionStorage).toHaveBeenCalledWith(`notificationTrayStatus.${courseId}`, 'open');
        expect(onClickMock).toHaveBeenCalled();
    });
});
//# sourceMappingURL=DiscussionsWidget.test.js.map