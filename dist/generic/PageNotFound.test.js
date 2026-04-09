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
import { getConfig, history } from '@edx/frontend-platform';
import { Routes, Route } from 'react-router-dom';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { initializeTestStore, render, screen, } from '../setupTest';
import PageNotFound from './PageNotFound';
import messages from './messages';
jest.mock('@edx/frontend-platform/analytics');
describe('PageNotFound', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield initializeTestStore();
        const invalidUrl = '/new/course';
        history.push(invalidUrl);
        render(_jsx(Routes, { children: _jsx(Route, { path: "*", element: _jsx(PageNotFound, {}) }) }), { wrapWithRouter: true });
    }));
    it('displays page not found header', () => {
        expect(screen.getByText(messages.pageNotFoundHeader.defaultMessage)).toBeVisible();
    });
    it('displays link back to learner dashboard', () => {
        const expected = getConfig().LMS_BASE_URL;
        const homepageLink = screen.getByRole('link', { name: messages.homepageLink.defaultMessage });
        expect(homepageLink).toHaveAttribute('href', expected);
    });
    it('calls tracking events', () => {
        expect(sendTrackEvent).toHaveBeenCalled();
    });
});
//# sourceMappingURL=PageNotFound.test.js.map