var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import '@testing-library/jest-dom';
import './courseware/data/__factories__';
import './course-home/data/__factories__';
import { getConfig, mergeConfig } from '@edx/frontend-platform';
import { configure as configureI18n, IntlProvider } from '@edx/frontend-platform/i18n';
import { configure as configureLogging } from '@edx/frontend-platform/logging';
import { configure as configureAuth, getAuthenticatedHttpClient, MockAuthService } from '@edx/frontend-platform/auth';
import React from 'react';
import PropTypes from 'prop-types';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import { reducer as learningAssistantReducer } from '@edx/frontend-lib-learning-assistant';
import { reducer as specialExamsReducer } from '@edx/frontend-lib-special-exams';
import { AppProvider } from '@edx/frontend-platform/react';
import { reducer as courseHomeReducer } from './course-home/data';
import { reducer as coursewareReducer } from './courseware/data/slice';
import { reducer as recommendationsReducer } from './courseware/course/course-exit/data/slice';
import { reducer as toursReducer } from './product-tours/data';
import { reducer as modelsReducer } from './generic/model-store';
import { UserMessagesProvider } from './generic/user-messages';
import messages from './i18n';
import { fetchCourse, fetchSequence } from './courseware/data';
import { getCourseOutlineStructure } from './courseware/data/thunks';
import { appendBrowserTimezoneToUrl, executeThunk } from './utils';
import buildSimpleCourseAndSequenceMetadata from './courseware/data/__factories__/sequenceMetadata.factory';
import { buildOutlineFromBlocks } from './courseware/data/__factories__/learningSequencesOutline.factory';
import MockedPluginSlot from './tests/MockedPluginSlot';
jest.mock('@openedx/frontend-plugin-framework', () => (Object.assign(Object.assign({}, jest.requireActual('@openedx/frontend-plugin-framework')), { Plugin: () => 'Plugin', PluginSlot: MockedPluginSlot })));
jest.mock('@src/generic/plugin-store', () => (Object.assign(Object.assign({}, jest.requireActual('@src/generic/plugin-store')), { usePluginsCallback: jest.fn((_, cb) => cb) })));
class MockLoggingService {
    constructor() {
        // eslint-disable-next-line no-console
        this.logInfo = jest.fn(infoString => console.log(infoString));
        // eslint-disable-next-line no-console
        this.logError = jest.fn(errorString => console.log(errorString));
    }
}
window.getComputedStyle = jest.fn(() => ({
    getPropertyValue: jest.fn(),
}));
/* eslint-disable no-console */
const supressWarningBlock = (callback) => {
    const originalConsoleWarning = console.warn;
    console.warn = jest.fn();
    callback();
    console.warn = originalConsoleWarning;
};
/* eslint-enable no-console */
// Mocks for HTML Dialogs behavior. */
// jsdom does not support HTML Dialogs yet: https://github.com/jsdom/jsdom/issues/3294
HTMLDialogElement.prototype.show = jest.fn();
HTMLDialogElement.prototype.showModal = jest.fn(function mock() {
    const onShowModal = new CustomEvent('show_modal');
    this.dispatchEvent(onShowModal);
});
HTMLDialogElement.prototype.close = jest.fn(function mock() {
    const onClose = new CustomEvent('close');
    this.dispatchEvent(onClose);
});
// Mock Intersection Observer which is unavailable in the context of a test.
global.IntersectionObserver = jest.fn(function mockIntersectionObserver() {
    this.observe = jest.fn();
    this.disconnect = jest.fn();
});
export const authenticatedUser = {
    userId: 'abc123',
    username: 'MockUser',
    roles: [],
    administrator: false,
};
mergeConfig(Object.assign(Object.assign({}, process.env), { authenticatedUser: {
        userId: 'abc123',
        username: 'MockUser',
        roles: [],
        administrator: false,
    }, SUPPORT_URL_ID_VERIFICATION: 'http://example.com' }));
export function initializeMockApp() {
    const loggingService = configureLogging(MockLoggingService, {
        config: getConfig(),
    });
    const authService = configureAuth(MockAuthService, {
        config: getConfig(),
        loggingService,
    });
    // i18n doesn't have a service class to return.
    // ignore missing/unexpect locale warnings from @edx/frontend-platform/i18n
    // it is unnecessary and not relevant to the tests
    supressWarningBlock(() => configureI18n({
        config: getConfig(),
        loggingService,
        messages,
    }));
    return { loggingService, authService };
}
window.scrollTo = jest.fn();
// MessageEvent used for indicating that a unit has been loaded.
export const messageEvent = {
    type: 'plugin.resize',
    payload: {
        height: 300,
    },
};
// Send MessageEvent indicating that a unit has been loaded.
export function loadUnit(message = messageEvent) {
    window.postMessage(message, '*');
}
// Helper function to log unhandled API requests to the console while running tests.
export function logUnhandledRequests(axiosMock) {
    axiosMock.onAny().reply((config) => {
        // eslint-disable-next-line no-console
        console.log(config.method, config.url);
        return [200, {}];
    });
}
let globalStore;
export function initializeTestStore(options = {}, overrideStore = true) {
    return __awaiter(this, void 0, void 0, function* () {
        const store = configureStore({
            reducer: {
                models: modelsReducer,
                courseware: coursewareReducer,
                courseHome: courseHomeReducer,
                learningAssistant: learningAssistantReducer,
                specialExams: specialExamsReducer,
                recommendations: recommendationsReducer,
                tours: toursReducer,
            },
        });
        if (overrideStore) {
            globalStore = store;
        }
        initializeMockApp();
        const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
        axiosMock.reset();
        const { courseBlocks, sequenceBlocks, unitBlocks, courseMetadata, sequenceMetadata, courseHomeMetadata, } = buildSimpleCourseAndSequenceMetadata(options);
        let courseMetadataUrl = `${getConfig().LMS_BASE_URL}/api/courseware/course/${courseMetadata.id}`;
        courseMetadataUrl = appendBrowserTimezoneToUrl(courseMetadataUrl);
        const learningSequencesUrlRegExp = new RegExp(`${getConfig().LMS_BASE_URL}/api/learning_sequences/v1/course_outline/*`);
        let courseHomeMetadataUrl = `${getConfig().LMS_BASE_URL}/api/course_home/course_metadata/${courseMetadata.id}`;
        const discussionConfigUrl = new RegExp(`${getConfig().LMS_BASE_URL}/api/discussion/v1/courses/*`);
        const coursewareSidebarSettingsUrl = `${getConfig().LMS_BASE_URL}/courses/${courseMetadata.id}/courseware-navigation-sidebar/toggles/`;
        const outlineSidebarUrl = `${getConfig().LMS_BASE_URL}/api/course_home/v1/navigation/${courseMetadata.id}`;
        courseHomeMetadataUrl = appendBrowserTimezoneToUrl(courseHomeMetadataUrl);
        const provider = (options === null || options === void 0 ? void 0 : options.provider) || 'legacy';
        const enableCompletionTracking = options.enableCompletionTracking || { enable_completion_tracking: true };
        axiosMock.onGet(courseMetadataUrl).reply(200, courseMetadata);
        axiosMock.onGet(courseHomeMetadataUrl).reply(200, courseHomeMetadata);
        axiosMock.onGet(learningSequencesUrlRegExp).reply(200, buildOutlineFromBlocks(courseBlocks));
        axiosMock.onGet(discussionConfigUrl).reply(200, { provider });
        axiosMock.onGet(coursewareSidebarSettingsUrl).reply(200, Object.assign({}, enableCompletionTracking));
        axiosMock.onGet(outlineSidebarUrl).reply(200, Object.assign(Object.assign(Object.assign({}, courseBlocks), sequenceBlocks), unitBlocks));
        sequenceMetadata.forEach(metadata => {
            const sequenceMetadataUrl = `${getConfig().LMS_BASE_URL}/api/courseware/sequence/${metadata.item_id}`;
            axiosMock.onGet(sequenceMetadataUrl).reply(200, metadata);
            const proctoredExamApiUrl = `${getConfig().LMS_BASE_URL}/api/edx_proctoring/v1/proctored_exam/attempt/course_id/${courseMetadata.id}/content_id/${sequenceMetadata.item_id}?is_learning_mfe=true`;
            axiosMock.onGet(proctoredExamApiUrl).reply(200, { exam: {}, active_attempt: {} });
        });
        logUnhandledRequests(axiosMock);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        !options.excludeFetchCourse && (yield executeThunk(fetchCourse(courseMetadata.id), store.dispatch));
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        !options.excludeFetchOutlineSidebar && (yield executeThunk(getCourseOutlineStructure(courseMetadata.id), store.dispatch));
        if (!options.excludeFetchSequence) {
            yield Promise.all(sequenceBlocks
                .map(block => executeThunk(fetchSequence(block.id), store.dispatch)));
        }
        return store;
    });
}
function render(ui, _a = {}) {
    var { store = null, wrapWithRouter = false } = _a, renderOptions = __rest(_a, ["store", "wrapWithRouter"]);
    const Wrapper = ({ children }) => (
    // eslint-disable-next-line react/jsx-filename-extension
    _jsx(IntlProvider, Object.assign({ locale: "en" }, { children: _jsx(AppProvider, Object.assign({ store: store || globalStore, wrapWithRouter: wrapWithRouter }, { children: _jsx(UserMessagesProvider, { children: children }) })) })));
    Wrapper.propTypes = {
        children: PropTypes.node.isRequired,
    };
    return rtlRender(ui, Object.assign({ wrapper: Wrapper }, renderOptions));
}
// Re-export everything.
export * from '@testing-library/react';
// Override `render` method.
export { render, };
//# sourceMappingURL=setupTest.js.map