import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';
import { Alert, Button, Hyperlink } from '@openedx/paragon';
import certImage from '../../../generic/assets/openedx_certificate.png';
import messages from './messages';
/**
 * Note for Open edX developers:
 * There are pieces of this component that are hard-coded and specific to edX that may not apply to your organization.
 * This includes mentions of our edX program types (MicroMasters, MicroBachelors, Professional Certificate, and
 * XSeries), along with their respective support article URLs and image variable names.
 *
 * Currently, this component will not render unless the learner's completed course has a related program of one of the
 * four aforementioned types. This will not impact the parent components (i.e. CourseCelebration will render normally).
 */
const programTypes = ['microbachelors', 'micromasters', 'professional-certificate', 'xseries'];
const ProgramCompletion = ({ progress, title, type, url, }) => {
    const intl = useIntl();
    if (!programTypes.includes(type) || progress.notStarted !== 0 || progress.inProgress !== 0) {
        return null;
    }
    const programLink = (_jsx(Hyperlink, Object.assign({ style: { textDecoration: 'underline' }, destination: url, className: "text-reset" }, { children: intl.formatMessage(messages.dashboardLink) })));
    return (_jsx(Alert, Object.assign({ variant: "primary", className: "my-3", "data-testid": "program-completion" }, { children: _jsxs("div", Object.assign({ className: "d-flex" }, { children: [_jsxs("div", Object.assign({ className: "col order-1 order-md-0 pl-0 pr-0 pr-md-5" }, { children: [_jsx("div", Object.assign({ className: "h4" }, { children: intl.formatMessage(messages.programsLastCourseHeader, { title }) })), _jsx("p", { children: _jsx(FormattedMessage, { id: "courseExit.programCompletion.dashboardMessage", defaultMessage: "To view your certificate status, check the Programs section of your {programLink}.", values: { programLink }, description: "Text that precedes link to program page" }) }), type === 'microbachelors' && (_jsxs(_Fragment, { children: [_jsx("p", { children: _jsx(Hyperlink, Object.assign({ style: { textDecoration: 'underline' }, destination: `${getConfig().SUPPORT_URL}/hc/en-us/articles/360004623154`, className: "text-reset" }, { children: intl.formatMessage(messages.microBachelorsLearnMore) })) }), _jsx(Button, Object.assign({ variant: "primary", className: "mb-2 mb-sm-0", href: `${getConfig().CREDENTIALS_BASE_URL}/records` }, { children: intl.formatMessage(messages.applyForCredit) }))] })), type === 'micromasters' && (_jsxs("p", { children: [intl.formatMessage(messages.microMastersMessage), ' ', _jsx(Hyperlink, Object.assign({ style: { textDecoration: 'underline' }, destination: `${getConfig().SUPPORT_URL}/hc/en-us/articles/360010346853-Does-a-Micromasters-certificate-count-towards-the-online-Master-s-degree-`, className: "text-reset" }, { children: intl.formatMessage(messages.microMastersLearnMore) }))] }))] })), _jsx("div", Object.assign({ className: "col-12 order-0 col-md-3 order-md-1 w-100 mb-3 p-0 text-center" }, { children: _jsx("img", { src: certImage, alt: `${intl.formatMessage(messages.certificateImage)}`, className: "w-100", style: { maxWidth: '13rem' }, "data-testid": type }) }))] })) })));
};
ProgramCompletion.propTypes = {
    progress: PropTypes.shape({
        completed: PropTypes.number.isRequired,
        inProgress: PropTypes.number.isRequired,
        notStarted: PropTypes.number.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};
export default ProgramCompletion;
//# sourceMappingURL=ProgramCompletion.js.map