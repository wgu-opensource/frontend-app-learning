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
import { getConfig, snakeCaseObject } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import MockAdapter from 'axios-mock-adapter';
import { breakpoints } from '@openedx/paragon';
import { executeThunk } from '@src/utils';
import { initializeTestStore, render } from '@src/setupTest';
import SidebarContext from '@src/courseware/course/sidebar/SidebarContext';
import { buildTopicsFromUnits } from '../data/__factories__/discussionTopics.factory';
import * as thunks from '../data/thunks';
import Course from './Course';
const mockData = {
    nextSequenceHandler: () => { },
    previousSequenceHandler: () => { },
    unitNavigationHandler: () => { },
};
const setupDiscussionSidebar = (HomeMetaParams) => __awaiter(void 0, void 0, void 0, function* () {
    const params = Object.assign({ verifiedMode: null, enabledInContext: true }, HomeMetaParams);
    const store = yield initializeTestStore();
    const { courseware, models } = store.getState();
    const { courseId, sequenceId } = courseware;
    Object.assign(mockData, {
        courseId,
        sequenceId,
        unitId: Object.values(models.units)[0].id,
    });
    global.innerWidth = breakpoints.extraExtraLarge.minWidth;
    const courseHomeMetadata = Factory.build('courseHomeMetadata', Object.assign({}, snakeCaseObject(params)));
    const testStore = yield initializeTestStore({ provider: 'openedx', courseHomeMetadata });
    const state = testStore.getState();
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock.onGet(`${getConfig().LMS_BASE_URL}/api/discussion/v1/courses/${courseId}`).reply(200, { provider: 'openedx' });
    const topicsResponse = buildTopicsFromUnits(state.models.units, params.enabledInContext);
    axiosMock.onGet(`${getConfig().LMS_BASE_URL}/api/discussion/v2/course_topics/${courseId}`)
        .reply(200, topicsResponse);
    yield executeThunk(thunks.getCourseDiscussionTopics(courseId), testStore.dispatch);
    const [firstUnitId] = Object.keys(state.models.units);
    mockData.unitId = firstUnitId;
    const [firstSequenceId] = Object.keys(state.models.sequences);
    mockData.sequenceId = firstSequenceId;
    const contextValue = { courseId: mockData.courseId, currentSidebar: null, toggleSidebar: jest.fn() };
    const wrapper = yield render(_jsx(SidebarContext.Provider, Object.assign({ value: contextValue }, { children: _jsx(Course, Object.assign({}, mockData)) })), { store: testStore, wrapWithRouter: true });
    return wrapper;
});
export default setupDiscussionSidebar;
//# sourceMappingURL=test-utils.js.map