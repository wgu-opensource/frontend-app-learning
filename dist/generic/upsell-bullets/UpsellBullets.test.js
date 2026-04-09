var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { initializeMockApp, render, screen, } from '../../setupTest';
import { VerifiedCertBullet, UnlockGradedBullet, FullAccessBullet, SupportMissionBullet, } from './UpsellBullets';
initializeMockApp();
describe('UpsellBullets', () => {
    const bullets = (_jsxs(_Fragment, { children: [_jsx(VerifiedCertBullet, {}), _jsx(UnlockGradedBullet, {}), _jsx(FullAccessBullet, {}), _jsx(SupportMissionBullet, {})] }));
    it('upsell bullet text properly rendered', () => __awaiter(void 0, void 0, void 0, function* () {
        render(bullets);
        expect(screen.getByText(/Earn a.*?of completion to showcase on your resumé/s).textContent).toMatch('Earn a verified certificate (learn more in a new tab) of completion to showcase on your resumé');
        expect(screen.getByText(/Unlock your access/s).textContent).toMatch('Unlock your access to all course activities, including graded assignments');
        expect(screen.getByText(/to course content and materials/s).textContent).toMatch('Full access to course content and materials, even after the course ends');
        expect(screen.getByText(/Support our.*?at edX/s).textContent).toMatch('Support our mission at edX');
    }));
});
//# sourceMappingURL=UpsellBullets.test.js.map