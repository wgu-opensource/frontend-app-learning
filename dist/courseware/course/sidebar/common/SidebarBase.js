import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useIntl } from '@edx/frontend-platform/i18n';
import { Icon, IconButton } from '@openedx/paragon';
import { ArrowBackIos, Close } from '@openedx/paragon/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useCallback, useContext } from 'react';
import { useEventListener } from '@src/generic/hooks';
import messages from '../../messages';
import SidebarContext from '../SidebarContext';
const SidebarBase = ({ title, ariaLabel, sidebarId, className, children, showTitleBar, width, }) => {
    const intl = useIntl();
    const { toggleSidebar, shouldDisplayFullScreen, currentSidebar, } = useContext(SidebarContext);
    const receiveMessage = useCallback(({ data }) => {
        const { type } = data;
        if (type === 'learning.events.sidebar.close') {
            toggleSidebar(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sidebarId, toggleSidebar]);
    useEventListener('message', receiveMessage);
    return (_jsxs("section", Object.assign({ className: classNames('ml-0 border border-light-400 rounded-sm h-auto align-top zindex-0', {
            'bg-white m-0 border-0 fixed-top vh-100 rounded-0': shouldDisplayFullScreen,
            'align-self-start': !shouldDisplayFullScreen,
            'd-none': currentSidebar !== sidebarId,
        }, className), "data-testid": `sidebar-${sidebarId}`, style: { width: shouldDisplayFullScreen ? '100%' : width }, "aria-label": ariaLabel, id: "course-sidebar" }, { children: [shouldDisplayFullScreen ? (_jsxs("div", Object.assign({ className: "pt-2 pb-2.5 border-bottom border-light-400 d-flex align-items-center ml-2", onClick: () => toggleSidebar(null), onKeyDown: () => toggleSidebar(null), role: "button", tabIndex: "0" }, { children: [_jsx(Icon, { src: ArrowBackIos }), _jsx("span", Object.assign({ className: "font-weight-bold m-2 d-inline-block" }, { children: intl.formatMessage(messages.responsiveCloseNotificationTray) }))] }))) : null, showTitleBar && (_jsx(_Fragment, { children: _jsxs("div", Object.assign({ className: "d-flex align-items-center mb-2" }, { children: [_jsx("strong", Object.assign({ className: "p-2.5 d-inline-block course-sidebar-title" }, { children: title })), shouldDisplayFullScreen
                            ? null
                            : (_jsx("div", Object.assign({ className: "d-inline-flex mr-2 ml-auto" }, { children: _jsx(IconButton, { src: Close, size: "sm", iconAs: Icon, onClick: () => toggleSidebar(null), variant: "primary", alt: intl.formatMessage(messages.closeNotificationTrigger) }) })))] })) })), children] })));
};
SidebarBase.propTypes = {
    title: PropTypes.string.isRequired,
    ariaLabel: PropTypes.string.isRequired,
    sidebarId: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    showTitleBar: PropTypes.bool,
    width: PropTypes.string,
};
SidebarBase.defaultProps = {
    width: '31rem',
    showTitleBar: true,
};
export default SidebarBase;
//# sourceMappingURL=SidebarBase.js.map