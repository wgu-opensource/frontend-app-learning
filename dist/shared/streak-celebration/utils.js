var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { camelCaseObject, getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient, getAuthenticatedUser, } from '@edx/frontend-platform/auth';
import { updateModel } from '../../generic/model-store';
function recordStreakCelebration(org, courseId) {
    // Tell our analytics
    const { administrator } = getAuthenticatedUser();
    sendTrackEvent('edx.ui.lms.celebration.streak.opened', {
        org_key: org,
        courserun_key: courseId,
        is_staff: administrator,
    });
}
function recordModalClosing(celebrations, org, courseId, dispatch) {
    // Ensure we only celebrate each streak once
    dispatch(updateModel({
        modelType: 'courseHomeMeta',
        model: {
            id: courseId,
            celebrations: Object.assign(Object.assign({}, celebrations), { streakLengthToCelebrate: null }),
        },
    }));
}
function calculateVoucherDiscountPercentage(voucher, sku, username) {
    return __awaiter(this, void 0, void 0, function* () {
        const urlBase = `${getConfig().ECOMMERCE_BASE_URL}/api/v2/baskets/calculate`;
        const url = `${urlBase}/?code=${voucher}&sku=${sku}&username=${username}`;
        const result = yield getAuthenticatedHttpClient().get(url);
        const { totalInclTax, totalInclTaxExclDiscounts } = camelCaseObject(result).data;
        if (totalInclTaxExclDiscounts && totalInclTax !== totalInclTaxExclDiscounts) {
            // Just store the percent (rather than using these values directly), because ecommerce doesn't give us
            // the currency symbol to use, so we want to use the symbol that LMS gives us. And I don't want to assume
            // ecommerce's currency is the same as the LMS. So we'll keep using the values in verifiedMode, just
            // multiplied by the calculated percentage.
            return 1 - totalInclTax / totalInclTaxExclDiscounts;
        }
        return 0;
    });
}
function getDiscountCodePercentage(code, courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = new URLSearchParams();
        params.append('code', code);
        params.append('course_run_key', courseId);
        const url = `${getConfig().DISCOUNT_CODE_INFO_URL}?${params.toString()}`;
        const result = yield getAuthenticatedHttpClient().get(url);
        const { isApplicable, discountPercentage } = camelCaseObject(result).data;
        return isApplicable ? +discountPercentage : 0;
    });
}
export { calculateVoucherDiscountPercentage, getDiscountCodePercentage, recordModalClosing, recordStreakCelebration, };
//# sourceMappingURL=utils.js.map