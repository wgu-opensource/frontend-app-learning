import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { useModel } from '@src/generic/model-store';
import hooks from './hooks';
import { modelKeys } from './constants';
import UnitSuspense from './UnitSuspense';
jest.mock('@edx/frontend-platform/i18n', () => (Object.assign(Object.assign({}, jest.requireActual('@edx/frontend-platform/i18n')), { defineMessages: m => m })));
jest.mock('react', () => (Object.assign(Object.assign({}, jest.requireActual('react')), { Suspense: 'Suspense' })));
jest.mock('../honor-code', () => jest.fn(() => _jsx("div", { children: "HonorCode" })));
jest.mock('../lock-paywall', () => jest.fn(() => _jsx("div", { children: "LockPaywall" })));
jest.mock('@src/generic/model-store', () => ({ useModel: jest.fn() }));
jest.mock('./hooks', () => ({
    useShouldDisplayHonorCode: jest.fn(() => false),
}));
const mockModels = (enabled, containsContent) => {
    useModel.mockImplementation((key) => (key === modelKeys.units
        ? { containsContentTypeGatedContent: containsContent }
        : { contentTypeGatingEnabled: enabled }));
};
const props = {
    courseId: 'test-course-id',
    id: 'test-id',
};
describe('UnitSuspense component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockModels(false, false);
    });
    describe('behavior', () => {
        it('initializes models', () => {
            render(_jsx(IntlProvider, Object.assign({ locale: "en" }, { children: _jsx(UnitSuspense, Object.assign({}, props)) })));
            const { calls } = useModel.mock;
            const [unitCall] = calls.filter(call => call[0] === modelKeys.units);
            const [metaCall] = calls.filter(call => call[0] === modelKeys.coursewareMeta);
            expect(unitCall[1]).toEqual(props.id);
            expect(metaCall[1]).toEqual(props.courseId);
        });
    });
    describe('output', () => {
        describe('LockPaywall', () => {
            const testNoPaywall = () => {
                it('does not display LockPaywall', () => {
                    render(_jsx(IntlProvider, Object.assign({ locale: "en" }, { children: _jsx(UnitSuspense, Object.assign({}, props)) })));
                    const lockPaywall = screen.queryByText('LockPaywall');
                    expect(lockPaywall).toBeNull();
                });
            };
            describe('gating not enabled', () => { testNoPaywall(); });
            describe('gating enabled, but no gated content included', () => {
                beforeEach(() => { mockModels(true, false); });
                testNoPaywall();
            });
            describe('gating enabled, gated content included', () => {
                beforeEach(() => { mockModels(true, true); });
                it('displays LockPaywall in Suspense wrapper with PageLoading fallback', () => {
                    hooks.useShouldDisplayHonorCode.mockReturnValueOnce(false);
                    render(_jsx(IntlProvider, Object.assign({ locale: "en" }, { children: _jsx(UnitSuspense, Object.assign({}, props)) })));
                    const lockPaywall = screen.getByText('LockPaywall');
                    expect(lockPaywall).toBeInTheDocument();
                    const suspenseWrapper = lockPaywall.closest('suspense');
                    expect(suspenseWrapper).toBeInTheDocument();
                });
            });
        });
        describe('HonorCode', () => {
            it('does not display HonorCode if useShouldDisplayHonorCode => false', () => {
                hooks.useShouldDisplayHonorCode.mockReturnValueOnce(false);
                render(_jsx(IntlProvider, Object.assign({ locale: "en" }, { children: _jsx(UnitSuspense, Object.assign({}, props)) })));
                const honorCode = screen.queryByText('HonorCode');
                expect(honorCode).toBeNull();
            });
            it('displays HonorCode component in Suspense wrapper with PageLoading fallback if shouldDisplayHonorCode', () => {
                hooks.useShouldDisplayHonorCode.mockReturnValueOnce(true);
                render(_jsx(IntlProvider, Object.assign({ locale: "en" }, { children: _jsx(UnitSuspense, Object.assign({}, props)) })));
                const honorCode = screen.getByText('HonorCode');
                expect(honorCode).toBeInTheDocument();
                const suspenseWrapper = honorCode.closest('suspense');
                expect(suspenseWrapper).toBeInTheDocument();
            });
        });
    });
});
//# sourceMappingURL=UnitSuspense.test.js.map