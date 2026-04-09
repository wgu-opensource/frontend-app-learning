import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';
import { Alert, Hyperlink } from '@openedx/paragon';
import { Info } from '@openedx/paragon/icons';
import { useModel } from '../../../../generic/model-store';
import messages from './messages';
const HiddenAfterDue = ({ courseId }) => {
    const intl = useIntl();
    const { tabs } = useModel('courseHomeMeta', courseId);
    const progressTab = tabs.find(tab => tab.slug === 'progress');
    const progressLink = progressTab && progressTab.url && (_jsx(Hyperlink, Object.assign({ style: { textDecoration: 'underline' }, destination: progressTab.url, className: "text-reset" }, { children: intl.formatMessage(messages.progressPage) })));
    return (_jsxs(Alert, Object.assign({ variant: "info", icon: Info }, { children: [_jsx("h3", { children: intl.formatMessage(messages.header) }), _jsxs("p", { children: [intl.formatMessage(messages.description), progressLink && (_jsxs(_Fragment, { children: [_jsx("br", {}), _jsx(FormattedMessage, Object.assign({}, messages.gradeAvailable, { values: {
                                    progressPage: progressLink,
                                } }))] }))] })] })));
};
HiddenAfterDue.propTypes = {
    courseId: PropTypes.string.isRequired,
};
export default HiddenAfterDue;
//# sourceMappingURL=HiddenAfterDue.js.map