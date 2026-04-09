import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Alert, Button, Row, Col, } from '@openedx/paragon';
import { useModel } from '../../generic/model-store';
import messages from './messages';
const UpgradeToShiftDatesAlert = ({ logUpgradeLinkClick, model }) => {
    const intl = useIntl();
    const { courseId, } = useSelector(state => state.courseHome);
    const { datesBannerInfo, hasEnded, } = useModel(model, courseId);
    const { contentTypeGatingEnabled, missedDeadlines, missedGatedContent, verifiedUpgradeLink, } = datesBannerInfo;
    if (!(contentTypeGatingEnabled && missedDeadlines && missedGatedContent && verifiedUpgradeLink) || hasEnded) {
        return null;
    }
    return (_jsx(Alert, Object.assign({ id: "upgrade-shift-dates-alert", className: "bg-light-200" }, { children: _jsxs(Row, Object.assign({ className: "w-100 m-0" }, { children: [_jsxs(Col, Object.assign({ xs: 12, md: 9, className: "small p-0 pr-md-2" }, { children: [_jsx("strong", { children: intl.formatMessage(messages.missedDeadlines) }), ' ', intl.formatMessage(messages.upgradeToShiftBody)] })), _jsx(Col, Object.assign({ xs: 12, md: 3, className: "align-self-center text-right mt-3 mt-md-0 p-0" }, { children: _jsx(Button, Object.assign({ variant: "brand", size: "sm", className: "w-xs-100 w-md-auto", onClick: () => {
                            logUpgradeLinkClick();
                            global.location.replace(verifiedUpgradeLink);
                        } }, { children: intl.formatMessage(messages.upgradeToShiftButton) })) }))] })) })));
};
UpgradeToShiftDatesAlert.propTypes = {
    logUpgradeLinkClick: PropTypes.func,
    model: PropTypes.string.isRequired,
};
UpgradeToShiftDatesAlert.defaultProps = {
    logUpgradeLinkClick: () => { },
};
export default UpgradeToShiftDatesAlert;
//# sourceMappingURL=UpgradeToShiftDatesAlert.js.map