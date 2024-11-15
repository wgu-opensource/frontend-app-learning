"use strict";

var _react = _interopRequireDefault(require("react"));
var _reactUnitTestUtils = require("@edx/react-unit-test-utils");
var _modelStore = require("../../../../../generic/model-store");
var _constants = require("../constants");
var _useShouldDisplayHonorCode = _interopRequireWildcard(require("./useShouldDisplayHonorCode"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
jest.mock('react', () => _objectSpread(_objectSpread({}, jest.requireActual('react')), {}, {
  useEffect: jest.fn()
}));
jest.mock('../../../../../generic/model-store', () => ({
  useModel: jest.fn()
}));
const state = (0, _reactUnitTestUtils.mockUseKeyedState)(_useShouldDisplayHonorCode.stateKeys);
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
describe('useShouldDisplayHonorCode hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockModels(false, false);
    state.mock();
  });
  describe('behavior', () => {
    it('initializes shouldDisplay to false', () => {
      (0, _useShouldDisplayHonorCode.default)(props);
      state.expectInitializedWith(_useShouldDisplayHonorCode.stateKeys.shouldDisplay, false);
    });
    describe('effect - on userNeedsIntegritySignature', () => {
      describe('graded and needs integrity signature', () => {
        it('sets shouldDisplay(true)', () => {
          mockModels(true, true);
          (0, _useShouldDisplayHonorCode.default)(props);
          const cb = (0, _reactUnitTestUtils.getEffects)([state.setState.shouldDisplay, true], _react.default)[0];
          cb();
          expect(state.setState.shouldDisplay).toHaveBeenCalledWith(true);
        });
      });
      describe('not graded', () => {
        it('sets should not display', () => {
          mockModels(true, false);
          (0, _useShouldDisplayHonorCode.default)(props);
          const cb = (0, _reactUnitTestUtils.getEffects)([state.setState.shouldDisplay, false], _react.default)[0];
          cb();
          expect(state.setState.shouldDisplay).toHaveBeenCalledWith(false);
        });
      });
      describe('does not need integrity signature', () => {
        it('sets should not display', () => {
          mockModels(false, true);
          (0, _useShouldDisplayHonorCode.default)(props);
          const cb = (0, _reactUnitTestUtils.getEffects)([state.setState.shouldDisplay, true], _react.default)[0];
          cb();
          expect(state.setState.shouldDisplay).toHaveBeenCalledWith(false);
        });
      });
    });
  });
  describe('output', () => {
    it('returns shouldDisplay value from state', () => {
      const testValue = 'test-value';
      state.mockVal(_useShouldDisplayHonorCode.stateKeys.shouldDisplay, testValue);
      expect((0, _useShouldDisplayHonorCode.default)(props)).toEqual(testValue);
    });
  });
});
//# sourceMappingURL=useShouldDisplayHonorCode.test.js.map