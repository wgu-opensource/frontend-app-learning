"use strict";

var _react = require("@testing-library/react");
var _modelStore = require("@src/generic/model-store");
var _useShouldDisplayHonorCode = _interopRequireDefault(require("./useShouldDisplayHonorCode"));
var _constants = require("../constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
jest.mock('@src/generic/model-store', () => ({
  useModel: jest.fn()
}));
const props = {
  id: 'test-id',
  courseId: 'test-course-id'
};
const mockModels = (graded, userNeedsIntegritySignature) => {
  _modelStore.useModel.mockImplementation(key => key === _constants.modelKeys.units ? {
    graded
  } : {
    userNeedsIntegritySignature
  });
};
describe('useShouldDisplayHonorCode', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return false when userNeedsIntegritySignature is false', () => {
    mockModels(true, false);
    const {
      result
    } = (0, _react.renderHook)(() => (0, _useShouldDisplayHonorCode.default)(props));
    expect(result.current).toBe(false);
  });
  it('should return false when graded is false', () => {
    mockModels(false, true);
    const {
      result
    } = (0, _react.renderHook)(() => (0, _useShouldDisplayHonorCode.default)(props));
    expect(result.current).toBe(false);
  });
  it('should return true when both userNeedsIntegritySignature and graded are true', () => {
    mockModels(true, true);
    const {
      result
    } = (0, _react.renderHook)(() => (0, _useShouldDisplayHonorCode.default)(props));
    expect(result.current).toBe(true);
  });
});
//# sourceMappingURL=useShouldDisplayHonorCode.test.js.map