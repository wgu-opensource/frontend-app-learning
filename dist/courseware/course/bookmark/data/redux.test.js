var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import MockAdapter from 'axios-mock-adapter';
import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';
import * as thunks from './thunks';
import { executeThunk } from '../../../../utils';
import { initializeMockApp } from '../../../../setupTest';
import initializeStore from '../../../../store';
const { loggingService } = initializeMockApp();
const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
describe('Data layer integration tests', () => {
    const unitId = 'unitId';
    let store;
    beforeEach(() => {
        axiosMock.reset();
        loggingService.logError.mockReset();
        store = initializeStore();
    });
    describe('Test addBookmark', () => {
        const createBookmarkURL = `${getConfig().LMS_BASE_URL}/api/bookmarks/v1/bookmarks/`;
        it('Should fail to create bookmark in case of error', () => __awaiter(void 0, void 0, void 0, function* () {
            axiosMock.onPost(createBookmarkURL).networkError();
            yield executeThunk(thunks.addBookmark(unitId), store.dispatch);
            expect(loggingService.logError).toHaveBeenCalled();
            expect(axiosMock.history.post[0].url).toEqual(createBookmarkURL);
            expect(store.getState().models.units[unitId]).toEqual(expect.objectContaining({
                bookmarked: false,
                bookmarkedUpdateState: 'failed',
            }));
        }));
        it('Should create bookmark and update model state', () => __awaiter(void 0, void 0, void 0, function* () {
            axiosMock.onPost(createBookmarkURL).reply(201);
            yield executeThunk(thunks.addBookmark(unitId), store.dispatch);
            expect(store.getState().models.units[unitId]).toEqual(expect.objectContaining({
                bookmarked: true,
                bookmarkedUpdateState: 'loaded',
            }));
        }));
    });
    describe('Test removeBookmark', () => {
        const deleteBookmarkURL = `${getConfig().LMS_BASE_URL}/api/bookmarks/v1/bookmarks/${getAuthenticatedUser().username},${unitId}/`;
        it('Should fail to remove bookmark in case of error', () => __awaiter(void 0, void 0, void 0, function* () {
            axiosMock.onDelete(deleteBookmarkURL).networkError();
            yield executeThunk(thunks.removeBookmark(unitId), store.dispatch);
            expect(loggingService.logError).toHaveBeenCalled();
            expect(axiosMock.history.delete[0].url).toEqual(deleteBookmarkURL);
            expect(store.getState().models.units[unitId]).toEqual(expect.objectContaining({
                bookmarked: true,
                bookmarkedUpdateState: 'failed',
            }));
        }));
        it('Should delete bookmark and update model state', () => __awaiter(void 0, void 0, void 0, function* () {
            axiosMock.onDelete(deleteBookmarkURL).reply(201);
            yield executeThunk(thunks.removeBookmark(unitId), store.dispatch);
            expect(store.getState().models.units[unitId]).toEqual(expect.objectContaining({
                bookmarked: false,
                bookmarkedUpdateState: 'loaded',
            }));
        }));
    });
});
//# sourceMappingURL=redux.test.js.map