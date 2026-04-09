import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import PropTypes from 'prop-types';
import { ModalDialog } from '@openedx/paragon';
import { ContentIFrameLoaderSlot } from '../../../../plugin-slots/ContentIFrameLoaderSlot';
import { ContentIFrameErrorSlot } from '../../../../plugin-slots/ContentIFrameErrorSlot';
import * as hooks from './hooks';
/**
 * Feature policy for iframe, allowing access to certain courseware-related media.
 *
 * We must use the wildcard (*) origin for each feature, as courseware content
 * may be embedded in external iframes. Notably, xblock-lti-consumer is a popular
 * block that iframes external course content.

 * This policy was selected in conference with the edX Security Working Group.
 * Changes to it should be vetted by them (security@edx.org).
 */
export const IFRAME_FEATURE_POLICY = ('microphone *; camera *; midi *; geolocation *; encrypted-media *; clipboard-write *; autoplay *');
export const testIDs = {
    contentIFrame: 'content-iframe-test-id',
    modalIFrame: 'modal-iframe-test-id',
};
const ContentIFrame = ({ iframeUrl, shouldShowContent, loadingMessage, id, elementId, onLoaded, title, courseId, }) => {
    const { handleIFrameLoad, hasLoaded, iframeHeight, showError, } = hooks.useIFrameBehavior({
        elementId,
        id,
        iframeUrl,
        onLoaded,
    });
    const { modalOptions, handleModalClose, } = hooks.useModalIFrameData();
    const contentIFrameProps = {
        id: elementId,
        src: iframeUrl,
        allow: IFRAME_FEATURE_POLICY,
        allowFullScreen: true,
        height: iframeHeight,
        scrolling: 'no',
        referrerPolicy: 'origin',
        onLoad: handleIFrameLoad,
    };
    return (_jsxs(_Fragment, { children: [(shouldShowContent && !hasLoaded) && (showError ? (_jsx(ContentIFrameErrorSlot, { courseId: courseId })) : (_jsx(ContentIFrameLoaderSlot, { courseId: courseId, loadingMessage: loadingMessage }))), shouldShowContent && (_jsx("div", Object.assign({ className: "unit-iframe-wrapper" }, { children: _jsx("iframe", Object.assign({ title: title }, contentIFrameProps, { "data-testid": testIDs.contentIFrame })) }))), modalOptions.isOpen
                && (_jsx(ModalDialog, Object.assign({ dialogClassName: "modal-lti", onClose: handleModalClose, size: modalOptions.isFullscreen ? 'fullscreen' : 'md', isOpen: true, hasCloseButton: false }, { children: _jsx(ModalDialog.Body, Object.assign({ className: modalOptions.modalBodyClassName }, { children: modalOptions.body
                            ? _jsx("div", Object.assign({ className: "unit-modal" }, { children: modalOptions.body }))
                            : (_jsx("iframe", { title: modalOptions.title, allow: IFRAME_FEATURE_POLICY, frameBorder: "0", src: modalOptions.url, style: { width: '100%', height: modalOptions.height } })) })) })))] }));
};
ContentIFrame.propTypes = {
    iframeUrl: PropTypes.string,
    id: PropTypes.string.isRequired,
    shouldShowContent: PropTypes.bool.isRequired,
    loadingMessage: PropTypes.node.isRequired,
    elementId: PropTypes.string.isRequired,
    onLoaded: PropTypes.func,
    title: PropTypes.node.isRequired,
    courseId: PropTypes.string,
};
ContentIFrame.defaultProps = {
    iframeUrl: null,
    onLoaded: () => ({}),
    courseId: '',
};
export default ContentIFrame;
//# sourceMappingURL=ContentIFrame.js.map