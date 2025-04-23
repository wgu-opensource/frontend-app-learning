"use strict";

var _reactUnitTestUtils = require("@edx/react-unit-test-utils");
var _hooks = require("@src/generic/hooks");
var _constants = require("../constants");
var _useModalIFrameData = _interopRequireWildcard(require("./useModalIFrameData"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
jest.mock('react', () => _objectSpread(_objectSpread({}, jest.requireActual('react')), {}, {
  useCallback: jest.fn((cb, prereqs) => ({
    cb,
    prereqs
  }))
}));
jest.mock('@src/generic/hooks', () => ({
  useEventListener: jest.fn()
}));
const state = (0, _reactUnitTestUtils.mockUseKeyedState)(_useModalIFrameData.stateKeys);
describe('useModalIFrameData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    state.mock();
  });
  const testHandleModalClose = _ref => {
    let {
      trigger
    } = _ref;
    const postMessage = jest.fn();
    document.querySelector = jest.fn().mockReturnValue({
      contentWindow: {
        postMessage
      }
    });
    trigger();
    state.expectSetStateCalledWith(_useModalIFrameData.stateKeys.isOpen, false);
    expect(postMessage).toHaveBeenCalledWith({
      type: 'plugin.modal-close'
    }, '*');
  };
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
      const oldOptions = {
        some: 'old',
        options: 'yeah'
      };
      const prepareListener = () => {
        (0, _useModalIFrameData.default)();
        expect(_hooks.useEventListener).toHaveBeenCalled();
        const call = _hooks.useEventListener.mock.calls[0][1];
        expect(call.prereqs).toEqual([]);
        return call.cb;
      };
      it('consumes modal events and opens sets modal options with open: true', () => {
        state.mockVals({
          [_useModalIFrameData.stateKeys.isOpen]: false,
          [_useModalIFrameData.stateKeys.options]: oldOptions
        });
        const receiveMessage = prepareListener();
        const payload = {
          test: 'values'
        };
        receiveMessage({
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
      it('ignores events with no type', () => {
        state.mockVals({
          [_useModalIFrameData.stateKeys.isOpen]: false,
          [_useModalIFrameData.stateKeys.options]: oldOptions
        });
        const receiveMessage = prepareListener();
        const payload = {
          test: 'values'
        };
        receiveMessage({
          data: {
            payload
          }
        });
        expect(state.setState.isOpen).not.toHaveBeenCalled();
        expect(state.setState.options).not.toHaveBeenCalled();
      });
      it('calls handleModalClose behavior when receiving a "plugin.modal-close" event', () => {
        const receiveMessage = prepareListener();
        testHandleModalClose({
          trigger: () => {
            receiveMessage({
              data: {
                type: 'plugin.modal-close'
              }
            });
          }
        });
      });
    });
  });
  describe('output', () => {
    test('returns handleModalClose callback', () => {
      testHandleModalClose({
        trigger: (0, _useModalIFrameData.default)().handleModalClose
      });
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