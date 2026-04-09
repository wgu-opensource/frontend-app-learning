var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Button } from '@openedx/paragon';
import FormattedPricing from './FormattedPricing';
const UpgradeNowButton = (props) => {
    const { offer, variant, onClick, verifiedMode } = props, rest = __rest(props, ["offer", "variant", "onClick", "verifiedMode"]);
    // Prefer offer's url in case it is different (might hold a coupon code that the normal does not)
    const url = offer ? offer.upgradeUrl : verifiedMode.upgradeUrl;
    return (_jsx(Button, Object.assign({ variant: variant, href: url, onClick: onClick }, rest, { children: _jsx(FormattedMessage, { id: "learning.upgradeNowButton.buttonText", defaultMessage: "Upgrade now for {pricing}", values: {
                pricing: (_jsx(FormattedPricing, { offer: offer, verifiedMode: verifiedMode })),
            } }) })));
};
UpgradeNowButton.defaultProps = {
    offer: null,
    onClick: null,
    variant: 'primary',
};
UpgradeNowButton.propTypes = {
    offer: PropTypes.shape({
        upgradeUrl: PropTypes.string.isRequired,
    }),
    onClick: PropTypes.func,
    verifiedMode: PropTypes.shape({
        upgradeUrl: PropTypes.string.isRequired,
    }).isRequired,
    variant: PropTypes.string,
};
export default UpgradeNowButton;
//# sourceMappingURL=UpgradeNowButton.js.map