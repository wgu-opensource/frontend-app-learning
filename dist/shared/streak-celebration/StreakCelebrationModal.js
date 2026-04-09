var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';
import { Lightbulb, MoneyFilled } from '@openedx/paragon/icons';
import { Alert, breakpoints, Icon, ModalDialog, Spinner, useWindowSize, } from '@openedx/paragon';
import { useDispatch } from 'react-redux';
import { UpgradeNowButton } from '../../generic/upgrade-button';
import { useModel } from '../../generic/model-store';
import StreakMobileImage from './assets/Streak_mobile.png';
import StreakDesktopImage from './assets/Streak_desktop.png';
import messages from './messages';
import { calculateVoucherDiscountPercentage, getDiscountCodePercentage, recordModalClosing, recordStreakCelebration, } from './utils';
function getRandomFactoid(intl, streakLength) {
    const boldedSectionA = intl.formatMessage(messages.streakFactoidABoldedSection);
    const boldedSectionB = intl.formatMessage(messages.streakFactoidBBoldedSection);
    const factoids = [
        (_jsx(FormattedMessage, { id: "learning.streakcelebration.factoida", defaultMessage: "Users who learn {streak_length} days in a row {bolded_section} than those who don\u2019t.", values: {
                bolded_section: (_jsx("b", { children: boldedSectionA })),
                streak_length: (streakLength),
            } })),
        (_jsx(FormattedMessage, { id: "learning.streakcelebration.factoidb", defaultMessage: "Users who learn {streak_length} days in a row {bolded_section} vs. those who don\u2019t.", values: {
                bolded_section: (_jsx("b", { children: boldedSectionB })),
                streak_length: (streakLength),
            } })),
    ];
    return factoids[Math.floor(Math.random() * (factoids.length))];
}
const CloseText = ({ intl }) => (_jsxs("span", { children: [intl.formatMessage(messages.streakButton), _jsxs("span", Object.assign({ className: "sr-only" }, { children: [". ", intl.formatMessage(messages.streakButtonSrOnly)] }))] }));
const StreakModal = (_a) => {
    var { courseId, metadataModel, streakLengthToCelebrate, isStreakCelebrationOpen, closeStreakCelebration, streakDiscountCouponEnabled, verifiedMode } = _a, rest = __rest(_a, ["courseId", "metadataModel", "streakLengthToCelebrate", "isStreakCelebrationOpen", "closeStreakCelebration", "streakDiscountCouponEnabled", "verifiedMode"]);
    const intl = useIntl();
    const { org, celebrations, username } = useModel('courseHomeMeta', courseId);
    const factoid = getRandomFactoid(intl, streakLengthToCelebrate);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [randomFactoid, setRandomFactoid] = useState(factoid); // Don't change factoid on re-render
    // Open edX Folks: if you create a voucher with this code, the MFE will notice and show the discount
    const discountCode = 'ZGY11119949';
    // Negative means "we don't know yet" vs zero meaning no discount available
    const [discountPercent, setDiscountPercent] = useState(-1);
    const queryingDiscount = discountPercent < 0;
    const wideScreen = useWindowSize().width >= breakpoints.small.minWidth;
    const dispatch = useDispatch();
    useEffect(() => {
        if (isStreakCelebrationOpen) {
            recordStreakCelebration(org, courseId);
        }
    }, [isStreakCelebrationOpen, org, courseId]);
    // Ask ecommerce to calculate discount savings
    useEffect(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            let streakDiscountPercentage = 0;
            try {
                if (streakDiscountCouponEnabled && verifiedMode) {
                    // If the discount service is available, use it to get the discount percentage
                    if (getConfig().DISCOUNT_CODE_INFO_URL) {
                        streakDiscountPercentage = yield getDiscountCodePercentage(discountCode, courseId);
                        // If the discount service is not available, fall back to ecommerce to calculate the discount percentage
                    }
                    else if (getConfig().ECOMMERCE_BASE_URL) {
                        streakDiscountPercentage = yield calculateVoucherDiscountPercentage(discountCode, verifiedMode.sku, username);
                    }
                }
            }
            catch (_a) {
                // ignore any errors - we just won't show the discount to the user then
            }
            finally {
                if (streakDiscountPercentage) {
                    sendTrackEvent('edx.bi.course.streak_discount_enabled', {
                        course_id: courseId,
                        sku: verifiedMode.sku,
                    });
                }
                setDiscountPercent(streakDiscountPercentage);
            }
        }))();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [streakDiscountCouponEnabled, username, verifiedMode]);
    if (!isStreakCelebrationOpen) {
        return null;
    }
    let upgradeUrl;
    let mode;
    let offer;
    if (verifiedMode) {
        upgradeUrl = `${verifiedMode.upgradeUrl}`;
        mode = {
            currencySymbol: verifiedMode.currencySymbol,
            price: verifiedMode.price,
            upgradeUrl,
        };
        if (discountPercent > 0) {
            const discountMultipler = 1 - discountPercent;
            offer = {
                discountedPrice: `${verifiedMode.currencySymbol}${(mode.price * discountMultipler).toFixed(2).toString()}`,
                originalPrice: `${verifiedMode.currencySymbol}${mode.price.toString()}`,
                upgradeUrl: `${mode.upgradeUrl}&code=${discountCode}`,
            };
        }
    }
    const title = `${streakLengthToCelebrate} ${intl.formatMessage(messages.streakHeader)}`;
    const showOffer = offer && streakDiscountCouponEnabled;
    return (_jsxs(ModalDialog, Object.assign({ className: "streak-modal modal-dialog-centered", title: title, onClose: () => {
            closeStreakCelebration();
            recordModalClosing(celebrations, org, courseId, dispatch);
        }, isOpen: isStreakCelebrationOpen, isFullscreenScroll: true }, rest, { children: [_jsx(ModalDialog.Header, Object.assign({ className: "modal-header" }, { children: _jsx(ModalDialog.Title, Object.assign({ className: "mr-0 modal-title" }, { children: title })) })), _jsxs(ModalDialog.Body, Object.assign({ className: "modal-body" }, { children: [_jsx("p", Object.assign({ className: "text-center" }, { children: intl.formatMessage(messages.streakBody) })), _jsxs("p", Object.assign({ className: "modal-image text-center" }, { children: [!wideScreen && _jsx("img", { src: StreakMobileImage, alt: "", className: "img-fluid" }), wideScreen && _jsx("img", { src: StreakDesktopImage, alt: "", className: "img-fluid" })] })), queryingDiscount && (_jsx(Spinner, { animation: "border", variant: "primary" })), !queryingDiscount && !showOffer && (_jsxs("div", Object.assign({ className: "d-flex py-3 bg-light-300" }, { children: [_jsx(Icon, { className: "col-small ml-3", src: Lightbulb }), _jsx("div", Object.assign({ className: "col-11 factoid-wrapper" }, { children: randomFactoid }))] }))), !queryingDiscount && showOffer && (_jsx(Alert, Object.assign({ variant: "success", className: "px-0" }, { children: _jsxs("div", Object.assign({ className: "d-flex" }, { children: [_jsx(Icon, { className: "col-small ml-3 text-success-500", src: MoneyFilled }), _jsxs("div", Object.assign({ className: "col-11 factoid-wrapper" }, { children: [_jsx("b", { children: intl.formatMessage(messages.congratulations) }), "\u00A0", intl.formatMessage(messages.streakDiscountMessage, {
                                            percent: (discountPercent * 100).toFixed(0),
                                        }), "\u00A0", _jsx(FormattedMessage, { id: "learning.streakCelebration.streakCelebrationCouponEndDateMessage", defaultMessage: "Ends {date}.", values: {
                                                date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString({ timeZone: 'UTC' }),
                                            } })] }))] })) })))] })), _jsxs(ModalDialog.Footer, Object.assign({ className: "modal-footer d-block" }, { children: [!queryingDiscount && showOffer && (_jsxs(_Fragment, { children: [!wideScreen && (_jsxs(_Fragment, { children: [_jsx(UpgradeNowButton, { className: "upgrade mb-3", size: "sm", offer: offer, variant: "brand", verifiedMode: mode }), _jsx(ModalDialog.CloseButton, Object.assign({ variant: "outline-brand", className: "btn-sm" }, { children: intl.formatMessage(messages.streakButtonAA759) }))] })), wideScreen && (_jsxs(_Fragment, { children: [_jsx(UpgradeNowButton, { className: "upgrade mb-3", offer: offer, variant: "brand", verifiedMode: mode }), _jsx(ModalDialog.CloseButton, Object.assign({ variant: "outline-brand" }, { children: intl.formatMessage(messages.streakButtonAA759) }))] }))] })), !queryingDiscount && !showOffer && (_jsx(ModalDialog.CloseButton, Object.assign({ className: "px-5", variant: "primary" }, { children: _jsx(CloseText, { intl: intl }) })))] }))] })));
};
StreakModal.defaultProps = {
    isStreakCelebrationOpen: false,
    streakDiscountCouponEnabled: false,
    streakLengthToCelebrate: -1,
    verifiedMode: {},
};
StreakModal.propTypes = {
    courseId: PropTypes.string.isRequired,
    metadataModel: PropTypes.string.isRequired,
    streakLengthToCelebrate: PropTypes.number,
    isStreakCelebrationOpen: PropTypes.bool,
    closeStreakCelebration: PropTypes.func.isRequired,
    streakDiscountCouponEnabled: PropTypes.bool,
    verifiedMode: PropTypes.shape({
        currencySymbol: PropTypes.string,
        price: PropTypes.number,
        sku: PropTypes.string,
        upgradeUrl: PropTypes.string,
    }),
};
export default StreakModal;
//# sourceMappingURL=StreakCelebrationModal.js.map