"use strict";

var _react = _interopRequireDefault(require("react"));
var _reactUnitTestUtils = require("@edx/react-unit-test-utils");
var _modelStore = require("@src/generic/model-store");
var _constants = require("../constants");
var _useShouldDisplayHonorCode = _interopRequireWildcard(require("./useShouldDisplayHonorCode"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
jest.mock('react', () => _objectSpread(_objectSpread({}, jest.requireActual('react')), {}, {
  useEffect: jest.fn()
}));
jest.mock('@src/generic/model-store', () => ({
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