import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useContext } from 'react';
import classNames from 'classnames';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Icon, IconButton } from '@openedx/paragon';
import { ArrowBackIos, Close } from '@openedx/paragon/icons';
import { useEventListener } from '../../../../generic/hooks';
import { WIDGETS } from '../../../../constants';
import messages from '../messages';
import SidebarContext from '../SidebarContext';
const SidebarBase = ({ title = '', ariaLabel, sidebarId, className, children, showTitleBar = true, width = '45rem', allowFullHeight = false, showBorder = true, }) => {
    const intl = useIntl();
    const { toggleSidebar, shouldDisplayFullScreen, currentSidebar, } = useContext(SidebarContext);
    const receiveMessage = useCallback(({ data }) => {
        const { type } = data;
        if (type === 'learning.events.sidebar.close') {
            toggleSidebar(currentSidebar, WIDGETS.DISCUSSIONS);
        }
    }, [toggleSidebar]);
    useEventListener('message', receiveMessage);
    return (_jsxs("section", Object.assign({ className: classNames('ml-0 ml-lg-4 h-auto align-top zindex-0', {
            'min-vh-100': !shouldDisplayFullScreen && allowFullHeight,
            'bg-white m-0 border-0 fixed-top vh-100 rounded-0': shouldDisplayFullScreen,
            'd-none': currentSidebar !== sidebarId,
            'border border-light-400 rounded-sm': showBorder,
        }, className), "data-testid": `sidebar-${sidebarId}`, style: { width: shouldDisplayFullScreen ? '100%' : width }, "aria-label": ariaLabel }, { children: [shouldDisplayFullScreen
                && (_jsxs("div", Object.assign({ className: "pt-2 pb-2.5 border-bottom border-light-400 d-flex align-items-center ml-2", onClick: () => toggleSidebar(null), onKeyDown: () => toggleSidebar(null), role: "button", tabIndex: 0 }, { children: [_jsx(Icon, { src: ArrowBackIos }), _jsx("span", Object.assign({ className: "font-weight-bold m-2 d-inline-block" }, { children: intl.formatMessage(messages.responsiveCloseSidebarTray) }))] }))), showTitleBar && (_jsxs(_Fragment, { children: [_jsxs("div", Object.assign({ className: "d-flex align-items-center" }, { children: [_jsx("span", Object.assign({ className: "p-2.5 d-inline-block" }, { children: title })), _jsx("div", Object.assign({ className: "d-inline-flex mr-2 mt-1.5 ml-auto" }, { children: _jsx(IconButton, { src: Close, size: "sm", iconAs: Icon, onClick: () => toggleSidebar(sidebarId), alt: intl.formatMessage(messages.closeTrigger), className: "icon-hover" }) }))] })), _jsx("div", { className: "py-1 bg-gray-100 border-top border-bottom border-light-400" })] })), children] })));
};
export default SidebarBase;
//# sourceMappingURL=SidebarBase.js.map