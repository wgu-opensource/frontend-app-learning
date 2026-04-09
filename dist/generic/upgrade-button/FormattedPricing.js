import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';
const FormattedPricing = (props) => {
    const intl = useIntl();
    const { inline, offer, verifiedMode, } = props;
    let currencySymbol;
    if (verifiedMode) {
        currencySymbol = verifiedMode.currencySymbol;
    }
    if (!offer) {
        const { price, } = verifiedMode;
        return `${currencySymbol}${price}`;
    }
    const { discountedPrice, originalPrice, } = offer;
    // The inline style is meant for being embedded in a sentence - it bolds the discount and leaves the original price
    // as a parenthetical. The normal styling is more suited for a button, where the price and discount are side by side.
    if (inline) {
        return (_jsxs(_Fragment, { children: [_jsx("span", Object.assign({ className: "font-weight-bold" }, { children: discountedPrice })), "\u00A0(", _jsx("span", Object.assign({ className: "sr-only" }, { children: intl.formatMessage(messages.srInlinePrices, { originalPrice }) })), _jsx("span", Object.assign({ "aria-hidden": "true" }, { children: _jsx("del", { children: originalPrice }) })), ")"] }));
    }
    return (_jsxs(_Fragment, { children: [_jsx("span", Object.assign({ className: "sr-only" }, { children: intl.formatMessage(messages.srPrices, { discountedPrice, originalPrice }) })), _jsxs("span", Object.assign({ "aria-hidden": "true" }, { children: [_jsx("span", { children: discountedPrice }), " (", _jsx("del", { children: originalPrice }), ")"] }))] }));
};
FormattedPricing.defaultProps = {
    inline: false,
    offer: null,
    verifiedMode: null,
};
FormattedPricing.propTypes = {
    inline: PropTypes.bool,
    offer: PropTypes.shape({
        discountedPrice: PropTypes.string.isRequired,
        originalPrice: PropTypes.string.isRequired,
        upgradeUrl: PropTypes.string.isRequired,
    }),
    verifiedMode: PropTypes.shape({
        currencySymbol: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        upgradeUrl: PropTypes.string.isRequired,
    }),
};
export default FormattedPricing;
//# sourceMappingURL=FormattedPricing.js.map