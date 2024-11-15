"use strict";

var _reactUnitTestUtils = require("@edx/react-unit-test-utils");
var _hooks = require("../../../../../generic/hooks");
var _constants = require("../constants");
var _useModalIFrameData = _interopRequireWildcard(require("./useModalIFrameData"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
jest.mock('react', () => _objectSpread(_objectSpread({}, jest.requireActual('react')), {}, {
  useCallback: jest.fn((cb, prereqs) => ({
    cb,
    prereqs
  }))
}));
jest.mock('../../../../../generic/hooks', () => ({
  useEventListener: jest.fn()
}));
const state = (0, _reactUnitTestUtils.mockUseKeyedState)(_useModalIFrameData.stateKeys);
describe('useModalIFrameBehavior', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    state.mock();
  });
  describe('behavior', () => {
    it('initializes isOpen to false', () => {
      (0, _useModalIFrameData.default)();
      state.expectInitializedWith(_useModalIFrameData.stateKeys.isOpen, false);
    });
    it('initializes options with default height', () => {
      (0, _useModalIFrameData.default)();
      state.expectInitializedWith(_useModalIFrameData.stateKeys.options, {
        height: _useModalIFrameData.DEFAULT_HEIGHT
      });
    });
    describe('eventListener', () => {
      it('consumes modal events and opens sets modal options with open: true', () => {
        const oldOptions = {
          some: 'old',
          options: 'yeah'
        };
        state.mockVals({
          [_useModalIFrameData.stateKeys.isOpen]: false,
          [_useModalIFrameData.stateKeys.options]: oldOptions
        });
        (0, _useModalIFrameData.default)();
        expect(_hooks.useEventListener).toHaveBeenCalled();
        const {
          cb,
          prereqs
        } = _hooks.useEventListener.mock.calls[0][1];
        expect(prereqs).toEqual([]);
        const payload = {
          test: 'values'
        };
        cb({
          data: {
            type: _constants.messageTypes.modal,
            payload
          }
        });
        expect(state.setState.isOpen).toHaveBeenCalledWith(true);
        expect(state.setState.options).toHaveBeenCalled();
        const [[setOptionsCb]] = state.setState.options.mock.calls;
        expect(setOptionsCb(oldOptions)).toEqual(_objectSpread(_objectSpread({}, oldOptions), payload));
      });
    });
  });
  describe('output', () => {
    test('handleModalClose sets modal options to closed', () => {
      (0, _useModalIFrameData.default)().handleModalClose();
      state.expectSetStateCalledWith(_useModalIFrameData.stateKeys.isOpen, false);
    });
    it('forwards modalOptions from state values', () => {
      const modalOptions = {
        test: 'options'
      };
      state.mockVals({
        [_useModalIFrameData.stateKeys.options]: modalOptions,
        [_useModalIFrameData.stateKeys.isOpen]: true
      });
      expect((0, _useModalIFrameData.default)().modalOptions).toEqual(_objectSpread(_objectSpread({}, modalOptions), {}, {
        isOpen: true
      }));
    });
  });
});
//# sourceMappingURL=useModalIFrameData.test.js.map