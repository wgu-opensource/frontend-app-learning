import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { getConfig } from '@edx/frontend-platform';
import { Hyperlink } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { logError } from '@edx/frontend-platform/logging';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { FooterSlot } from '@edx/frontend-component-footer';
import HeaderSlot from '../plugin-slots/HeaderSlot';
import messages from './messages';
const PageNotFound = () => {
    const { formatMessage } = useIntl();
    const location = window.location.href;
    logError('Page failed to load, probably an invalid URL.', location);
    sendTrackEvent('edx.ui.lms.page_not_found', { location });
    return (_jsxs(_Fragment, { children: [_jsx(HeaderSlot, {}), _jsxs("main", Object.assign({ id: "main-content", className: "main-content d-flex justify-content-center align-items-center flex-column", style: {
                    height: '50vh',
                } }, { children: [_jsx("h1", Object.assign({ className: "h3" }, { children: formatMessage(messages.pageNotFoundHeader) })), _jsx("p", { children: formatMessage(messages.pageNotFoundBody, {
                            homepageLink: (_jsx(Hyperlink, Object.assign({ destination: getConfig().LMS_BASE_URL }, { children: formatMessage(messages.homepageLink) }))),
                        }) })] })), _jsx(FooterSlot, {})] }));
};
export default PageNotFound;
//# sourceMappingURL=PageNotFound.js.map