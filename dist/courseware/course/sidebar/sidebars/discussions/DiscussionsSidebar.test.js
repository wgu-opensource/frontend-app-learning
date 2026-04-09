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
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { initializeMockApp, initializeTestStore, render, screen, } from '../../../../../setupTest';
import { executeThunk } from '../../../../../utils';
import { buildTopicsFromUnits } from '../../../../data/__factories__/discussionTopics.factory';
import { getCourseDiscussionTopics } from '../../../../data/thunks';
import SidebarContext from '../../SidebarContext';
import DiscussionsSidebar from './DiscussionsSidebar';
initializeMockApp();
describe('Discussions Trigger', () => {
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
        const state = store.getState();
        courseId = state.courseware.courseId;
        [unitId] = Object.keys(state.models.units);
        mockData = {
            courseId,
            unitId,
            currentSidebar: 'DISCUSSIONS',
        };
        axiosMock.onGet(`${getConfig().LMS_BASE_URL}/api/discussion/v1/courses/${courseId}`).reply(200, {
            provider: 'openedx',
        });
        axiosMock.onGet(`${getConfig().LMS_BASE_URL}/api/discussion/v2/course_topics/${courseId}`)
            .reply(200, buildTopicsFromUnits(state.models.units));
        yield executeThunk(getCourseDiscussionTopics(courseId), store.dispatch);
    }));
    function renderWithProvider(testData = {}) {
        const { container } = render(_jsx(SidebarContext.Provider, Object.assign({ value: Object.assign(Object.assign({}, mockData), testData) }, { children: _jsx(DiscussionsSidebar, {}) })));
        return container;
    }
    it('should show up if unit discussions associated with it', () => __awaiter(void 0, void 0, void 0, function* () {
        renderWithProvider();
        expect(screen.queryByTitle('Discussions')).toBeInTheDocument();
        expect(screen.queryByTitle('Discussions'))
            .toHaveAttribute('src', `http://localhost:2002/${courseId}/category/${unitId}?inContextSidebar`);
    }));
    it('should show nothing if unit has no discussions associated with it', () => __awaiter(void 0, void 0, void 0, function* () {
        renderWithProvider({ unitId: 'no-discussion' });
        expect(screen.queryByTitle('Discussions')).not.toBeInTheDocument();
    }));
});
//# sourceMappingURL=DiscussionsSidebar.test.js.map