import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Button, Hyperlink } from '@openedx/paragon';
import messages from './messages';
import { ReactComponent as UnsubscribeIcon } from './unsubscribe.svg';
const ResultPage = ({ courseTitle, error }) => {
    const intl = useIntl();
    const errorDescription = intl.formatMessage(messages.errorDescription, {
        contactSupport: (_jsx(Hyperlink, Object.assign({ className: "text-reset", style: { textDecoration: 'underline' }, destination: `${getConfig().CONTACT_URL}` }, { children: intl.formatMessage(messages.contactSupport) }))),
    });
    const header = error
        ? intl.formatMessage(messages.errorHeader)
        : intl.formatMessage(messages.header);
    const description = error
        ? errorDescription
        : intl.formatMessage(messages.description, { courseTitle });
    return (_jsxs(_Fragment, { children: [_jsx(UnsubscribeIcon, { className: "text-primary", alt: "" }), _jsx("div", Object.assign({ role: "heading", "aria-level": "1", className: "h2" }, { children: header })), _jsx("div", Object.assign({ className: "row justify-content-center" }, { children: _jsx("div", Object.assign({ className: "col-xl-7 col-12 p-0" }, { children: description })) })), _jsx(Button, Object.assign({ variant: "brand", href: `${getConfig().LMS_BASE_URL}/dashboard`, className: "mt-4" }, { children: intl.formatMessage(messages.goToDashboard) }))] }));
};
ResultPage.defaultProps = {
    courseTitle: null,
    error: false,
};
ResultPage.propTypes = {
    courseTitle: PropTypes.string,
    error: PropTypes.bool,
};
export default ResultPage;
//# sourceMappingURL=ResultPage.js.map