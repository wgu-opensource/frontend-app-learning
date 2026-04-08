"use strict";

var _frontendPlatform = require("@edx/frontend-platform");
var _mapSearchResponse = _interopRequireDefault(require("./map-search-response"));
var _mockedResponse = _interopRequireDefault(require("./test-data/mocked-response.json"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
describe('mapSearchResponse', () => {
  describe('when the response is correct', () => {
    let response;
    beforeEach(() => {
      response = (0, _mapSearchResponse.default)((0, _frontendPlatform.camelCaseObject)(_mockedResponse.default));
    });
    it('should match number of results', () => {
      expect(response.results.length).toBe(_mockedResponse.default.results.length);
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
    it('should match expected results', () => {
      const mockFirstResult = _mockedResponse.default.results[0];
      const expectedFirstResult = {
        id: mockFirstResult.data.id,
        title: mockFirstResult.data.content.display_name,
        type: mockFirstResult.data.content_type.toLowerCase(),
        location: mockFirstResult.data.location,
        url: mockFirstResult.data.url,
        contentHits: 0,
        score: mockFirstResult.score
      };
      expect(response.results[0]).toEqual(expectedFirstResult);
    });
    it('should match expected ms and max score', () => {
      expect(response.maxScore).toBe(_mockedResponse.default.max_score);
      expect(response.ms).toBe(_mockedResponse.default.took);
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