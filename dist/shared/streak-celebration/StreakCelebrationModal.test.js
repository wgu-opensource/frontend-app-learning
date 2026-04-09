var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { Factory } from 'rosie';
import { camelCaseObject, getConfig, mergeConfig } from '@edx/frontend-platform';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { breakpoints } from '@openedx/paragon';
import MockAdapter from 'axios-mock-adapter';
import { act, initializeMockApp, initializeTestStore, render, screen, } from '../../setupTest';
import StreakModal from './StreakCelebrationModal';
initializeMockApp();
jest.mock('@edx/frontend-platform/analytics');
describe('Loaded Tab Page', () => {
    let mockData;
    let testStore;
    let axiosMock;
    const calculateUrl = `${getConfig().ECOMMERCE_BASE_URL}/api/v2/baskets/calculate/?code=ZGY11119949&sku=8CF08E5&username=MockUser`;
    const courseMetadata = Factory.build('courseMetadata');
    const courseHomeMetadata = Factory.build('courseHomeMetadata', { celebrations: { streak_length_to_celebrate: 3 } });
    function setDiscount(percent) {
        mockData.streakDiscountCouponEnabled = true;
        axiosMock.onGet(calculateUrl).reply(200, {
            total_incl_tax: 100 - percent,
            total_incl_tax_excl_discounts: 100,
        });
    }
    function setDiscountViaDiscountCodeInfo(percent) {
        const discountURLParams = new URLSearchParams();
        discountURLParams.append('code', 'ZGY11119949');
        discountURLParams.append('course_run_key', courseMetadata.id);
        const discountURL = `${getConfig().DISCOUNT_CODE_INFO_URL}?${discountURLParams.toString()}`;
        mockData.streakDiscountCouponEnabled = true;
        axiosMock.onGet(discountURL).reply(200, {
            isApplicable: true,
            discountPercentage: percent / 100,
        });
    }
    function setDiscountError() {
        mockData.streakDiscountCouponEnabled = true;
        axiosMock.onGet(calculateUrl).reply(500);
    }
    function renderModal() {
        return __awaiter(this, void 0, void 0, function* () {
            yield act(() => __awaiter(this, void 0, void 0, function* () { return render(_jsx(StreakModal, Object.assign({}, mockData)), { store: testStore }); }));
        });
    }
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mockData = {
            closeStreakCelebration: jest.fn(),
            courseId: courseMetadata.id,
            isStreakCelebrationOpen: true,
            metadataModel: 'coursewareMeta',
            streakLengthToCelebrate: 3,
            verifiedMode: camelCaseObject(courseHomeMetadata.verified_mode),
        };
        testStore = yield initializeTestStore({ courseMetadata, courseHomeMetadata }, false);
        axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    }));
    beforeEach(() => {
        global.innerWidth = breakpoints.medium.minWidth;
    });
    it('shows streak celebration modal', () => __awaiter(void 0, void 0, void 0, function* () {
        yield renderModal();
        expect(screen.getByText('3 day streak')).toBeInTheDocument();
        expect(screen.getByText('Keep it up, you’re on a roll!')).toBeInTheDocument();
        expect(sendTrackEvent).toHaveBeenCalledTimes(1);
        expect(sendTrackEvent).toHaveBeenCalledWith('edx.ui.lms.celebration.streak.opened', {
            org_key: courseHomeMetadata.org,
            courserun_key: mockData.courseId,
            is_staff: false,
        });
    }));
    it('shows normal streak celebration modal when discount call fails', () => __awaiter(void 0, void 0, void 0, function* () {
        setDiscountError();
        yield renderModal();
        // This text is only for the non-discount case
        expect(screen.getByText('Keep it up')).toBeInTheDocument();
    }));
    it('shows normal streak celebration modal when discount is zero', () => __awaiter(void 0, void 0, void 0, function* () {
        setDiscount(0);
        yield renderModal();
        // This text is only for the non-discount case
        expect(screen.getByText('Keep it up')).toBeInTheDocument();
    }));
    it('shows discount version of streak celebration modal when available', () => __awaiter(void 0, void 0, void 0, function* () {
        global.innerWidth = breakpoints.extraSmall.maxWidth;
        setDiscount(14);
        yield renderModal();
        const endDateText = `Ends ${new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString({ timeZone: 'UTC' })}.`;
        expect(screen.getByText('You’ve unlocked a 14% off discount when you upgrade this course for a limited time only.', { exact: false })).toBeInTheDocument();
        expect(screen.getByText(endDateText, { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Continue with course')).toBeInTheDocument();
        expect(screen.queryByText('Keep it up')).not.toBeInTheDocument();
        expect(sendTrackEvent).toHaveBeenCalledWith('edx.bi.course.streak_discount_enabled', {
            course_id: mockData.courseId,
            sku: mockData.verifiedMode.sku,
        });
    }));
    it('shows discount version of streak celebration modal when discount available and info fetched using DISCOUNT_CODE_INFO_URL', () => __awaiter(void 0, void 0, void 0, function* () {
        mergeConfig({ DISCOUNT_CODE_INFO_URL: 'http://localhost:8140/lms/discount-code-info/' });
        global.innerWidth = breakpoints.extraSmall.maxWidth;
        setDiscountViaDiscountCodeInfo(14);
        yield renderModal();
        const endDateText = `Ends ${new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString({ timeZone: 'UTC' })}.`;
        expect(screen.getByText('You’ve unlocked a 14% off discount when you upgrade this course for a limited time only.', { exact: false })).toBeInTheDocument();
        expect(screen.getByText(endDateText, { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Continue with course')).toBeInTheDocument();
        expect(screen.queryByText('Keep it up')).not.toBeInTheDocument();
        expect(sendTrackEvent).toHaveBeenCalledWith('edx.bi.course.streak_discount_enabled', {
            course_id: mockData.courseId,
            sku: mockData.verifiedMode.sku,
        });
    }));
});
//# sourceMappingURL=StreakCelebrationModal.test.js.map