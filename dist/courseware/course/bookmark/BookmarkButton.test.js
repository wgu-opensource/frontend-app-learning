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
import MockAdapter from 'axios-mock-adapter';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { Factory } from 'rosie';
import { render, screen, fireEvent, initializeTestStore, waitFor, authenticatedUser, logUnhandledRequests, } from '../../../setupTest';
import { BookmarkButton } from './index';
import { getBookmarksBaseUrl } from './data/api';
describe('Bookmark Button', () => {
    let axiosMock;
    let store;
    const courseMetadata = Factory.build('courseMetadata');
    const mockData = {
        isProcessing: false,
    };
    const nonBookmarkedUnitBlock = Factory.build('block', { type: 'vertical' }, { courseId: courseMetadata.id });
    const bookmarkedUnitBlock = Factory.build('block', { type: 'vertical', bookmarked: true }, { courseId: courseMetadata.id });
    const unitBlocks = [nonBookmarkedUnitBlock, bookmarkedUnitBlock];
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        store = yield initializeTestStore({ courseMetadata, unitBlocks });
        mockData.unitId = nonBookmarkedUnitBlock.id;
        axiosMock = new MockAdapter(getAuthenticatedHttpClient());
        const bookmarkUrl = getBookmarksBaseUrl();
        axiosMock.onPost(bookmarkUrl).reply(200, {});
        const bookmarkDeleteUrlRegExp = new RegExp(`${bookmarkUrl}*,*`);
        axiosMock.onDelete(bookmarkDeleteUrlRegExp).reply(200, {});
        logUnhandledRequests(axiosMock);
    }));
    it('handles adding bookmark', () => __awaiter(void 0, void 0, void 0, function* () {
        render(_jsx(BookmarkButton, Object.assign({}, mockData)));
        const button = screen.getByRole('button', { name: 'Bookmark this page' });
        expect(button).not.toHaveClass('disabled');
        fireEvent.click(button);
        yield waitFor(() => expect(axiosMock.history.post).toHaveLength(1));
        expect(axiosMock.history.post[0].data).toEqual(JSON.stringify({ usage_id: nonBookmarkedUnitBlock.id }));
        expect(store.getState().models.units[nonBookmarkedUnitBlock.id].bookmarked).toBeTruthy();
    }));
    it('does not handle adding bookmark when processing', () => __awaiter(void 0, void 0, void 0, function* () {
        render(_jsx(BookmarkButton, Object.assign({}, mockData, { isProcessing: true })));
        const button = screen.getByRole('button', { name: 'Bookmark this page' });
        expect(button).toHaveClass('disabled');
        fireEvent.click(button);
        // HACK: We don't have a function we could reliably await here, so this test relies on the timeout of `waitFor`.
        yield expect(waitFor(() => expect(axiosMock.history.post).toHaveLength(1), { timeout: 100 })).rejects.toThrowError(/expect.*toHaveLength.*/);
        expect(store.getState().models.units[nonBookmarkedUnitBlock.id].bookmarked).toBeFalsy();
    }));
    it('handles removing bookmark', () => __awaiter(void 0, void 0, void 0, function* () {
        render(_jsx(BookmarkButton, Object.assign({}, mockData, { unitId: bookmarkedUnitBlock.id, isBookmarked: true })));
        const button = screen.getByRole('button', { name: 'Bookmarked' });
        fireEvent.click(button);
        yield waitFor(() => expect(axiosMock.history.delete).toHaveLength(1));
        expect(axiosMock.history.delete[0].url).toContain(`${authenticatedUser.username},${bookmarkedUnitBlock.id}`);
        expect(store.getState().models.units[bookmarkedUnitBlock.id].bookmarked).toBeFalsy();
    }));
    it('does not handle removing bookmark when processing', () => __awaiter(void 0, void 0, void 0, function* () {
        render(_jsx(BookmarkButton, Object.assign({}, mockData, { unitId: bookmarkedUnitBlock.id, isBookmarked: true, isProcessing: true })));
        const button = screen.getByRole('button', { name: 'Bookmarked' });
        expect(button).toHaveClass('disabled');
        fireEvent.click(button);
        // HACK: We don't have a function we could reliably await here, so this test relies on the timeout of `waitFor`.
        yield expect(waitFor(() => expect(axiosMock.history.delete).toHaveLength(1), { timeout: 100 })).rejects.toThrowError(/expect.*toHaveLength.*/);
        expect(store.getState().models.units[bookmarkedUnitBlock.id].bookmarked).toBeTruthy();
    }));
});
//# sourceMappingURL=BookmarkButton.test.js.map