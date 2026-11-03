"use strict";

var _api = require("./api");
describe('Calculate the time offset properly', () => {
  it('Should return 0 if the headerDate is not set', async () => {
    const offset = (0, _api.getTimeOffsetMillis)(undefined, undefined, undefined);
    expect(offset).toBe(0);
  });
  it('Should return the offset', async () => {
    const headerDate = '2021-04-13T11:01:58.135Z';
    const requestTime = new Date('2021-04-12T11:01:57.135Z');
    const responseTime = new Date('2021-04-12T11:01:58.635Z');
    const offset = (0, _api.getTimeOffsetMillis)(headerDate, requestTime, responseTime);
    expect(offset).toBe(86398750);
  });
});
//# sourceMappingURL=api.test.js.map