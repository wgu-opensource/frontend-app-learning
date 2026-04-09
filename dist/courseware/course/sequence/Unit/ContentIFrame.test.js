import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import * as hooks from './hooks';
import ContentIFrame, { IFRAME_FEATURE_POLICY } from './ContentIFrame';
jest.mock('@edx/frontend-platform/react', () => ({ ErrorPage: () => _jsx("div", { children: "ErrorPage" }) }));
jest.mock('@src/generic/PageLoading', () => jest.fn(() => _jsx("div", { children: "PageLoading" })));
jest.mock('./hooks', () => ({
    useIFrameBehavior: jest.fn(),
    useModalIFrameData: jest.fn(),
}));
const iframeBehavior = {
    handleIFrameLoad: jest.fn().mockName('IFrameBehavior.handleIFrameLoad'),
    hasLoaded: false,
    iframeHeight: 20,
    showError: false,
};
const modalOptions = {
    closed: {
        isOpen: false,
    },
    withBody: {
        body: 'test-body',
        isOpen: true,
    },
    withUrl: {
        isOpen: true,
        title: 'test-modal-title',
        url: 'test-modal-url',
        height: 'test-height',
    },
};
const modalIFrameData = {
    modalOptions: modalOptions.closed,
    handleModalClose: jest.fn().mockName('modalIFrameOptions.handleModalClose'),
};
hooks.useIFrameBehavior.mockReturnValue(iframeBehavior);
hooks.useModalIFrameData.mockReturnValue(modalIFrameData);
const props = {
    iframeUrl: 'test-iframe-url',
    shouldShowContent: true,
    loadingMessage: 'test-loading-message',
    id: 'test-id',
    elementId: 'test-element-id',
    onLoaded: jest.fn().mockName('props.onLoaded'),
    title: 'test-title',
};
describe('ContentIFrame Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('behavior', () => {
        beforeEach(() => {
            render(_jsx(ContentIFrame, Object.assign({}, props)));
        });
        it('initializes iframe behavior hook', () => {
            expect(hooks.useIFrameBehavior).toHaveBeenCalledWith({
                elementId: props.elementId,
                id: props.id,
                iframeUrl: props.iframeUrl,
                onLoaded: props.onLoaded,
            });
        });
        it('initializes modal iframe data', () => {
            expect(hooks.useModalIFrameData).toHaveBeenCalledWith();
        });
    });
    describe('output', () => {
        describe('if shouldShowContent', () => {
            describe('if not hasLoaded', () => {
                it('displays errorPage if showError', () => {
                    hooks.useIFrameBehavior.mockReturnValueOnce(Object.assign(Object.assign({}, iframeBehavior), { showError: true }));
                    render(_jsx(ContentIFrame, Object.assign({}, props)));
                    const errorPage = screen.getByText('ErrorPage');
                    expect(errorPage).toBeInTheDocument();
                });
                it('displays PageLoading component if not showError', () => {
                    render(_jsx(ContentIFrame, Object.assign({}, props)));
                    const pageLoading = screen.getByText('PageLoading');
                    expect(pageLoading).toBeInTheDocument();
                });
            });
            describe('hasLoaded', () => {
                it('does not display PageLoading or ErrorPage', () => {
                    hooks.useIFrameBehavior.mockReturnValueOnce(Object.assign(Object.assign({}, iframeBehavior), { hasLoaded: true }));
                    render(_jsx(ContentIFrame, Object.assign({}, props)));
                    const pageLoading = screen.queryByText('PageLoading');
                    expect(pageLoading).toBeNull();
                    const errorPage = screen.queryByText('ErrorPage');
                    expect(errorPage).toBeNull();
                });
            });
            it('display iframe with props from hooks', () => {
                render(_jsx(ContentIFrame, Object.assign({}, props)));
                const iframe = screen.getByTitle(props.title);
                expect(iframe).toBeInTheDocument();
                expect(iframe).toHaveAttribute('id', props.elementId);
                expect(iframe).toHaveAttribute('src', props.iframeUrl);
                expect(iframe).toHaveAttribute('allow', IFRAME_FEATURE_POLICY);
                expect(iframe).toHaveAttribute('allowfullscreen', '');
                expect(iframe).toHaveAttribute('scrolling', 'no');
                expect(iframe).toHaveAttribute('referrerpolicy', 'origin');
            });
        });
        describe('if not shouldShowContent', () => {
            it('does not show PageLoading, ErrorPage, or unit-iframe-wrapper', () => {
                render(_jsx(ContentIFrame, Object.assign({}, Object.assign(Object.assign({}, props), { shouldShowContent: false }))));
                expect(screen.queryByText('PageLoading')).toBeNull();
                expect(screen.queryByText('ErrorPage')).toBeNull();
                expect(screen.queryByTitle(props.title)).toBeNull();
            });
        });
        it('does not display modal if modalOptions returns isOpen: false', () => {
            render(_jsx(ContentIFrame, Object.assign({}, props)));
            const modal = screen.queryByRole('dialog');
            expect(modal).toBeNull();
        });
        describe('if modalOptions.isOpen', () => {
            const testModalOpenAndHandleClose = () => {
                it('closes modal on close button click', () => {
                    const closeButton = screen.getByTestId('modal-backdrop');
                    closeButton.click();
                    expect(modalIFrameData.handleModalClose).toHaveBeenCalled();
                });
            };
            describe('fullscreen modal', () => {
                describe('body modal', () => {
                    beforeEach(() => {
                        hooks.useModalIFrameData.mockReturnValueOnce(Object.assign(Object.assign({}, modalIFrameData), { modalOptions: Object.assign(Object.assign({}, modalOptions.withBody), { isFullscreen: true }) }));
                        render(_jsx(ContentIFrame, Object.assign({}, props)));
                    });
                    it('displays Modal with div wrapping provided body content if modal.body is provided', () => {
                        const dialog = screen.getByRole('dialog');
                        expect(dialog).toBeInTheDocument();
                        const modalBody = screen.getByText(modalOptions.withBody.body);
                        expect(modalBody).toBeInTheDocument();
                    });
                    testModalOpenAndHandleClose();
                });
                describe('url modal', () => {
                    beforeEach(() => {
                        hooks.useModalIFrameData
                            .mockReturnValueOnce(Object.assign(Object.assign({}, modalIFrameData), { modalOptions: Object.assign(Object.assign({}, modalOptions.withUrl), { isFullscreen: true }) }));
                        render(_jsx(ContentIFrame, Object.assign({}, props)));
                    });
                    it('displays Modal with iframe to provided url if modal.body is not provided', () => {
                        const iframe = screen.getByTitle(modalOptions.withUrl.title);
                        expect(iframe).toBeInTheDocument();
                        expect(iframe).toHaveAttribute('allow', IFRAME_FEATURE_POLICY);
                        expect(iframe).toHaveAttribute('src', modalOptions.withUrl.url);
                    });
                    testModalOpenAndHandleClose();
                });
            });
            describe('body modal', () => {
                beforeEach(() => {
                    hooks.useModalIFrameData.mockReturnValueOnce(Object.assign(Object.assign({}, modalIFrameData), { modalOptions: modalOptions.withBody }));
                    render(_jsx(ContentIFrame, Object.assign({}, props)));
                });
                it('displays Modal with div wrapping provided body content if modal.body is provided', () => {
                    const dialog = screen.getByRole('dialog');
                    expect(dialog).toBeInTheDocument();
                    const modalBody = screen.getByText(modalOptions.withBody.body);
                    expect(modalBody).toBeInTheDocument();
                });
                testModalOpenAndHandleClose();
            });
            describe('url modal', () => {
                beforeEach(() => {
                    hooks.useModalIFrameData.mockReturnValueOnce(Object.assign(Object.assign({}, modalIFrameData), { modalOptions: modalOptions.withUrl }));
                    render(_jsx(ContentIFrame, Object.assign({}, props)));
                });
                it('displays Modal with iframe to provided url if modal.body is not provided', () => {
                    const iframe = screen.getByTitle(modalOptions.withUrl.title);
                    expect(iframe).toBeInTheDocument();
                    expect(iframe).toHaveAttribute('allow', IFRAME_FEATURE_POLICY);
                    expect(iframe).toHaveAttribute('src', modalOptions.withUrl.url);
                });
                testModalOpenAndHandleClose();
            });
        });
    });
});
//# sourceMappingURL=ContentIFrame.test.js.map