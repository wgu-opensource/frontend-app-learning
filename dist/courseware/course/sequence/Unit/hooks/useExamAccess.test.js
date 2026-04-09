var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState } from 'react';
import { logError } from '@edx/frontend-platform/logging';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useExamAccessToken, useFetchExamAccessToken, useIsExam } from '@edx/frontend-lib-special-exams';
import { initializeMockApp } from '../../../../../setupTest';
import useExamAccess from './useExamAccess';
jest.mock('@edx/frontend-platform/logging', () => ({
    logError: jest.fn(),
}));
jest.mock('@edx/frontend-lib-special-exams', () => ({
    useExamAccessToken: jest.fn(),
    useFetchExamAccessToken: jest.fn(),
    useIsExam: jest.fn(() => false),
}));
const id = 'test-id';
// This object allows us to manipulate the value of the accessToken.
const testAccessToken = { curr: '' };
const mockFetchExamAccessToken = jest.fn().mockImplementation(() => Promise.resolve());
useFetchExamAccessToken.mockReturnValue(mockFetchExamAccessToken);
const mockUseIsExam = (initialState = false) => {
    const [isExam, setIsExam] = useState(initialState);
    // This setTimeout block is intended to replicate the case where a unit is an exam, but
    // the call to fetch exam metadata has not yet completed. That is the value of isExam starts
    // as false and transitions to true once the call resolves.
    if (!initialState) {
        setTimeout(() => setIsExam(true), 500);
    }
    return isExam;
};
describe('useExamAccess hook', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // We need to mock AuthService to implicitly use `getAuthenticatedUser` within `AppContext.Provider`.
        yield initializeMockApp();
    }));
    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
        useExamAccessToken.mockReset();
        useIsExam.mockImplementation(() => mockUseIsExam());
        useExamAccessToken.mockImplementation(() => testAccessToken.curr);
    });
    describe('behavior', () => {
        it('returns accessToken and blockAccess and doesn\'t call token API if not an exam', () => {
            const { result } = renderHook(() => useExamAccess({ id }));
            const { accessToken, blockAccess } = result.current;
            expect(accessToken).toEqual('');
            expect(blockAccess).toBe(false);
            expect(mockFetchExamAccessToken).not.toHaveBeenCalled();
        });
        it('returns true for blockAccess if an exam but accessToken not yet fetched', () => __awaiter(void 0, void 0, void 0, function* () {
            useIsExam.mockImplementation(() => mockUseIsExam(true));
            const { result } = renderHook(() => useExamAccess({ id }));
            const { accessToken, blockAccess } = result.current;
            expect(accessToken).toEqual('');
            expect(blockAccess).toBe(true);
            expect(mockFetchExamAccessToken).toHaveBeenCalled();
            yield waitFor(() => {
                var _a;
                expect(result.current).toBeTruthy();
                expect((_a = result.current) === null || _a === void 0 ? void 0 : _a.isFetching).toBeFalsy();
            });
        }));
        it('returns false for blockAccess if an exam and accessToken fetch succeeds', () => __awaiter(void 0, void 0, void 0, function* () {
            useIsExam.mockImplementation(() => mockUseIsExam(true));
            const { result } = renderHook(() => useExamAccess({ id }));
            // We wait for the promise to resolve and for updates to state to complete so that blockAccess is updated.
            yield waitFor(() => {
                var _a;
                expect(result.current).toBeTruthy();
                expect((_a = result.current) === null || _a === void 0 ? void 0 : _a.isFetching).toBeFalsy();
            });
            const { accessToken, blockAccess } = result.current;
            expect(accessToken).toEqual(testAccessToken.curr);
            expect(blockAccess).toBe(false);
            expect(mockFetchExamAccessToken).toHaveBeenCalled();
        }));
        it('in progress', () => __awaiter(void 0, void 0, void 0, function* () {
            const { result } = renderHook(() => useExamAccess({ id }));
            let { accessToken, blockAccess } = result.current;
            expect(accessToken).toEqual('');
            expect(blockAccess).toBe(false);
            expect(mockFetchExamAccessToken).not.toHaveBeenCalled();
            testAccessToken.curr = 'test-access-token';
            // The runAllTimers will update the value of isExam, and the waitForNextUpdate will
            // wait for call to setBlockAccess in the finally clause of useEffect hook.
            yield act(() => __awaiter(void 0, void 0, void 0, function* () {
                jest.runAllTimers();
                yield waitFor(() => {
                    var _a;
                    expect(result.current).toBeTruthy();
                    expect((_a = result.current) === null || _a === void 0 ? void 0 : _a.isFetching).toBeFalsy();
                });
            }));
            ({ accessToken, blockAccess } = result.current);
            expect(accessToken).toEqual('test-access-token');
            expect(blockAccess).toBe(false);
            expect(mockFetchExamAccessToken).toHaveBeenCalled();
        }));
        it('returns false for blockAccess if an exam and accessToken fetch fails', () => __awaiter(void 0, void 0, void 0, function* () {
            useIsExam.mockImplementation(() => mockUseIsExam(true));
            const testError = 'test-error';
            mockFetchExamAccessToken.mockImplementationOnce(() => Promise.reject(testError));
            const { result } = renderHook(() => useExamAccess({ id }));
            // We wait for the promise to resolve and for updates to state to complete so that blockAccess is updated.
            yield waitFor(() => {
                var _a;
                expect(result.current).toBeTruthy();
                expect((_a = result.current) === null || _a === void 0 ? void 0 : _a.isFetching).toBeFalsy();
            });
            const { accessToken, blockAccess } = result.current;
            expect(accessToken).toEqual(testAccessToken.curr);
            expect(blockAccess).toBe(false);
            expect(mockFetchExamAccessToken).toHaveBeenCalled();
            yield waitFor(() => {
                expect(logError).toHaveBeenCalledWith(testError);
            });
        }));
    });
});
//# sourceMappingURL=useExamAccess.test.js.map