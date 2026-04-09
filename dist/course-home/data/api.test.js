var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getTimeOffsetMillis } from './api';
describe('Calculate the time offset properly', () => {
    it('Should return 0 if the headerDate is not set', () => __awaiter(void 0, void 0, void 0, function* () {
        const offset = getTimeOffsetMillis(undefined, undefined, undefined);
        expect(offset).toBe(0);
    }));
    it('Should return the offset', () => __awaiter(void 0, void 0, void 0, function* () {
        const headerDate = '2021-04-13T11:01:58.135Z';
        const requestTime = new Date('2021-04-12T11:01:57.135Z');
        const responseTime = new Date('2021-04-12T11:01:58.635Z');
        const offset = getTimeOffsetMillis(headerDate, requestTime, responseTime);
        expect(offset).toBe(86398750);
    }));
});
//# sourceMappingURL=api.test.js.map