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
import { getConfig } from '@edx/frontend-platform';
import { initializeMockApp, render, act, } from '../../setupTest';
import NoticesProvider from './NoticesProvider';
import { getNotices } from './api';
jest.mock('./api', () => ({
    getNotices: jest.fn(),
}));
jest.mock('@edx/frontend-platform', () => ({
    getConfig: jest.fn(),
}));
describe('NoticesProvider', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        jest.resetModules();
        yield initializeMockApp();
    }));
    function buildAndRender() {
        render(_jsx(NoticesProvider, { children: _jsx("div", {}) }));
    }
    it('does not call api if ENABLE_NOTICES is false', () => {
        getConfig.mockImplementation(() => ({ ENABLE_NOTICES: false }));
        buildAndRender();
        expect(getNotices).toHaveBeenCalledTimes(0);
    });
    it('redirects user on notice returned from API', () => __awaiter(void 0, void 0, void 0, function* () {
        const redirectUrl = 'http://example.com/test_route';
        getConfig.mockImplementation(() => ({ ENABLE_NOTICES: true }));
        getNotices.mockImplementation(() => ({ results: [redirectUrl] }));
        delete window.location;
        window.location = { replace: jest.fn() };
        process.env.ENABLE_NOTICES = true;
        yield act(() => __awaiter(void 0, void 0, void 0, function* () { return buildAndRender(); }));
        expect(window.location.replace).toHaveBeenCalledWith(`${redirectUrl}?next=${window.location.href}`);
    }));
    it('does not redirect on no data', () => __awaiter(void 0, void 0, void 0, function* () {
        getNotices.mockImplementation(() => ({}));
        getConfig.mockImplementation(() => ({ ENABLE_NOTICES: true }));
        delete window.location;
        window.location = { replace: jest.fn() };
        process.env.ENABLE_NOTICES = true;
        yield act(() => __awaiter(void 0, void 0, void 0, function* () { return buildAndRender(); }));
        expect(window.location.replace).toHaveBeenCalledTimes(0);
        expect(window.location.toString() === 'http://localhost/');
    }));
});
//# sourceMappingURL=NoticesProvider.test.js.map