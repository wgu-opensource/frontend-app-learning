var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { recordFirstSectionCelebration } from './utils';
jest.mock('@edx/frontend-platform/analytics');
jest.mock('./data/api');
jest.mock('@edx/frontend-platform/auth', () => ({
    getAuthenticatedUser: jest.fn(() => ({ administrator: 'admin' })),
}));
describe('recordFirstSectionCelebration', () => {
    it('updates the local copy of the course data from the LMS', () => __awaiter(void 0, void 0, void 0, function* () {
        const dispatchMock = jest.fn();
        recordFirstSectionCelebration('org', 'courseId', 'celebration', dispatchMock);
        expect(dispatchMock).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=utils.test.js.map