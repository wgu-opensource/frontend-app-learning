"use strict";

var _frontendPlatform = require("@edx/frontend-platform");
var _mapSearchResponse = _interopRequireDefault(require("./map-search-response"));
var _mockedResponse = _interopRequireDefault(require("./test-data/mocked-response.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
describe('mapSearchResponse', () => {
  describe('when the response is correct', () => {
    let response;
    beforeEach(() => {
      response = (0, _mapSearchResponse.default)((0, _frontendPlatform.camelCaseObject)(_mockedResponse.default));
    });
    it('should match snapshot', () => {
      expect(response).toMatchSnapshot();
    });
    it('should match expected filters', () => {
      const expectedFilters = [{
        key: 'capa',
        label: 'CAPA',
        count: 7
      }, {
        key: 'sequence',
        label: 'Sequence',
        count: 2
      }, {
        key: 'text',
        label: 'Text',
        count: 9
      }, {
        key: 'unknown',
        label: 'Unknown',
        count: 1
      }, {
        key: 'video',
        label: 'Video',
        count: 2
      }];
      expect(response.filters).toEqual(expectedFilters);
    });
  });
  describe('when the a keyword is provided', () => {
    const searchText = 'Course';
    it('should not count matches title', () => {
      const response = (0, _mapSearchResponse.default)((0, _frontendPlatform.camelCaseObject)(_mockedResponse.default), searchText);
      expect(response.results[0].contentHits).toBe(0);
    });
    it('should count matches on content', () => {
      const response = (0, _mapSearchResponse.default)((0, _frontendPlatform.camelCaseObject)(_mockedResponse.default), searchText);
      expect(response.results[1].contentHits).toBe(1);
    });
    it('should ignore capitalization', () => {
      const response = (0, _mapSearchResponse.default)((0, _frontendPlatform.camelCaseObject)(_mockedResponse.default), searchText.toUpperCase());
      expect(response.results[1].contentHits).toBe(1);
    });
  });
  describe('when the response has a wrong format', () => {
    it('should throw an error', () => {
      expect(() => (0, _mapSearchResponse.default)({
        foo: 'bar'
      })).toThrow();
    });
  });
});
//# sourceMappingURL=map-search-response.test.js.map