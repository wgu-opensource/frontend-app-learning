"use strict";

var _react = _interopRequireDefault(require("react"));
var _logging = require("@edx/frontend-platform/logging");
var _reactUnitTestUtils = require("@edx/react-unit-test-utils");
var _frontendLibSpecialExams = require("@edx/frontend-lib-special-exams");
var _lodash = require("lodash");
var _setupTest = require("../../../../../setupTest");
var _useExamAccess = _interopRequireWildcard(require("./useExamAccess"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const getEffect = prereqs => {
  const {
    calls
  } = _react.default.useEffect.mock;
  const match = calls.filter(call => (0, _lodash.isEqual)(call[1], prereqs));
  return match.length ? match[0][0] : null;
};
jest.mock('react', () => _objectSpread(_objectSpread({}, jest.requireActual('react')), {}, {
  useEffect: jest.fn()
}));
jest.mock('@edx/frontend-platform/logging', () => ({
  logError: jest.fn()
}));
jest.mock('@edx/frontend-lib-special-exams', () => ({
  getExamAccess: jest.fn(),
  fetchExamAccess: jest.fn(),
  isExam: jest.fn(() => false)
}));
const state = (0, _reactUnitTestUtils.mockUseKeyedState)(_useExamAccess.stateKeys);
const id = 'test-id';
const mockFetchExamAccess = Promise.resolve();
_frontendLibSpecialExams.fetchExamAccess.mockReturnValue(mockFetchExamAccess);
const testAccessToken = 'test-access-token';
_frontendLibSpecialExams.getExamAccess.mockReturnValue(testAccessToken);
describe('useExamAccess hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    state.mock();
  });
  describe('behavior', () => {
    it('initializes access token to empty string', () => {
      (0, _useExamAccess.default)({
        id
      });
      state.expectInitializedWith(_useExamAccess.stateKeys.accessToken, '');
    });
    it('initializes blockAccess to true if is an exam', () => {
      (0, _useExamAccess.default)({
        id
      });
      state.expectInitializedWith(_useExamAccess.stateKeys.blockAccess, false);
    });
    it('initializes blockAccess to false if is not an exam', () => {
      _frontendLibSpecialExams.isExam.mockReturnValueOnce(true);
      (0, _useExamAccess.default)({
        id
      });
      state.expectInitializedWith(_useExamAccess.stateKeys.blockAccess, true);
    });
    describe('effects - on id change', () => {
      let useEffectCb;
      beforeEach(() => {
        (0, _useExamAccess.default)({
          id
        });
        useEffectCb = getEffect([id], _react.default);
      });
      it('does not call fetchExamAccess if not an exam', () => {
        useEffectCb();
        expect(_frontendLibSpecialExams.fetchExamAccess).not.toHaveBeenCalled();
      });
      it('fetches and sets exam access if isExam', async () => {
        _frontendLibSpecialExams.isExam.mockReturnValueOnce(true);
        useEffectCb();
        await (0, _setupTest.waitFor)(() => expect(_frontendLibSpecialExams.fetchExamAccess).toHaveBeenCalled());
        state.expectSetStateCalledWith(_useExamAccess.stateKeys.accessToken, testAccessToken);
        state.expectSetStateCalledWith(_useExamAccess.stateKeys.blockAccess, false);
      });
      const testError = 'test-error';
      it('logs error if fetchExamAccess fails', async () => {
        _frontendLibSpecialExams.isExam.mockReturnValueOnce(true);
        _frontendLibSpecialExams.fetchExamAccess.mockReturnValueOnce(Promise.reject(testError));
        useEffectCb();
        await (0, _setupTest.waitFor)(() => expect(_frontendLibSpecialExams.fetchExamAccess).toHaveBeenCalled());
        expect(_logging.logError).toHaveBeenCalledWith(testError);
      });
    });
  });
  describe('output', () => {
    it('forwards blockAccess and accessToken from state fields', () => {
      const testBlockAccess = 'test-block-access';
      state.mockVals({
        blockAccess: testBlockAccess,
        accessToken: testAccessToken
      });
      const out = (0, _useExamAccess.default)({
        id
      });
      expect(out.blockAccess).toEqual(testBlockAccess);
      expect(out.accessToken).toEqual(testAccessToken);
      state.resetVals();
    });
  });
});
//# sourceMappingURL=useExamAccess.test.js.map