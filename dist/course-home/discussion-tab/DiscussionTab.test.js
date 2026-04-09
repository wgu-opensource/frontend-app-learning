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
import { getConfig, history } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { AppProvider } from '@edx/frontend-platform/react';
import { render } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Factory } from 'rosie';
import { UserMessagesProvider } from '../../generic/user-messages';
import { initializeMockApp, messageEvent, screen, waitFor, } from '../../setupTest';
import initializeStore from '../../store';
import { TabContainer } from '../../tab-page';
import { appendBrowserTimezoneToUrl } from '../../utils';
import { fetchDiscussionTab } from '../data/thunks';
import DiscussionTab from './DiscussionTab';
initializeMockApp();
jest.mock('@edx/frontend-platform/analytics');
describe('DiscussionTab', () => {
    let axiosMock;
    let store;
    let component;
    beforeEach(() => {
        axiosMock = new MockAdapter(getAuthenticatedHttpClient());
        store = initializeStore();
        component = (_jsx(AppProvider, Object.assign({ store: store }, { children: _jsx(UserMessagesProvider, { children: _jsx(Routes, { children: _jsx(Route, { path: "/course/:courseId/discussion", element: (_jsx(TabContainer, Object.assign({ tab: "discussion", fetch: fetchDiscussionTab, slice: "courseHome" }, { children: _jsx(DiscussionTab, {}) }))) }) }) }) })));
    });
    const courseMetadata = Factory.build('courseHomeMetadata', { user_timezone: 'America/New_York' });
    const { id: courseId } = courseMetadata;
    let courseMetadataUrl = `${getConfig().LMS_BASE_URL}/api/course_home/course_metadata/${courseId}`;
    courseMetadataUrl = appendBrowserTimezoneToUrl(courseMetadataUrl);
    beforeEach(() => {
        axiosMock.onGet(courseMetadataUrl).reply(200, courseMetadata);
        history.push(`/course/${courseId}/discussion`); // so tab can pull course id from url
        render(component);
    });
    it('resizes when it gets a size hint from iframe', () => __awaiter(void 0, void 0, void 0, function* () {
        window.postMessage(Object.assign(Object.assign({}, messageEvent), { payload: { height: 1234 } }), '*');
        yield waitFor(() => expect(screen.getByTitle('discussion'))
            .toHaveAttribute('height', String(1234)));
    }));
});
//# sourceMappingURL=DiscussionTab.test.js.map