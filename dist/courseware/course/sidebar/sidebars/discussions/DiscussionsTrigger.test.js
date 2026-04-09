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
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import PropTypes from 'prop-types';
import { fireEvent, initializeMockApp, initializeTestStore, render, screen, } from '../../../../../setupTest';
import { buildTopicsFromUnits } from '../../../../data/__factories__/discussionTopics.factory';
import SidebarContext from '../../SidebarContext';
import DiscussionsTrigger from './DiscussionsTrigger';
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
        };
        axiosMock.onGet(`${getConfig().LMS_BASE_URL}/api/discussion/v1/courses/${courseId}`).reply(200, {
            provider: 'openedx',
        });
        axiosMock.onGet(`${getConfig().LMS_BASE_URL}/api/discussion/v2/course_topics/${courseId}`)
            .reply(200, buildTopicsFromUnits(state.models.units));
    }));
    const SidebarWrapper = ({ contextValue, onClick }) => (_jsx(SidebarContext.Provider, Object.assign({ value: contextValue }, { children: _jsx(DiscussionsTrigger, { onClick: onClick }) })));
    SidebarWrapper.propTypes = {
        contextValue: PropTypes.shape({}).isRequired,
        onClick: PropTypes.func.isRequired,
    };
    function renderWithProvider(testData = {}, onClick = () => null) {
        const { container } = render(_jsx(SidebarWrapper, { contextValue: Object.assign(Object.assign({}, mockData), testData), onClick: onClick }));
        return container;
    }
    it('shows up and handles onClick even if unit has discussion associated with it', () => __awaiter(void 0, void 0, void 0, function* () {
        const clickTrigger = jest.fn();
        renderWithProvider({}, clickTrigger);
        const notificationTrigger = yield screen.findByRole('button', { name: /Show discussions tray/i });
        expect(notificationTrigger).toBeInTheDocument();
        fireEvent.click(notificationTrigger);
        expect(clickTrigger).toHaveBeenCalledTimes(1);
    }));
    it('doesn\'t show up if unit has no discussion associated with it', () => __awaiter(void 0, void 0, void 0, function* () {
        const clickTrigger = jest.fn();
        renderWithProvider({ unitId: 'has-no-discussion' }, clickTrigger);
        expect(yield screen.queryByRole('button', { name: /Show discussions tray/i })).not.toBeInTheDocument();
    }));
});
//# sourceMappingURL=DiscussionsTrigger.test.js.map