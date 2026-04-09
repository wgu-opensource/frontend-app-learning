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
import { initializeMockApp, render } from '../../setupTest';
import { AlertList } from './index';
describe('Alert List', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // We need to mock AuthService to implicitly use `getAuthenticatedUser` within `AppContext.Provider`.
        yield initializeMockApp();
    }));
    it('renders empty div by default', () => {
        const { container } = render(_jsx(AlertList, {}));
        expect(container).toBeEmptyDOMElement();
    });
    // FIXME: Currently these alerts are tested in `OutlineTab.test` and `Course.test`, because creating
    //  `UserMessagesProvider` for testing would introduce a lot of boilerplate code that could get outdated quickly.
});
//# sourceMappingURL=AlertList.test.js.map