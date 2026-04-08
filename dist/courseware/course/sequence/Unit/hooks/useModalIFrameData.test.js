"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _hooks = require("@src/generic/hooks");
var _constants = require("../constants");
var _useModalIFrameData = _interopRequireWildcard(require("./useModalIFrameData"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
jest.mock('react', () => _objectSpread(_objectSpread({}, jest.requireActual('react')), {}, {
  useCallback: jest.fn((cb, prereqs) => ({
    cb,
    prereqs
  })),
  useState: jest.fn(initialValue => [initialValue, jest.fn()])
}));
jest.mock('@src/generic/hooks', () => ({
  useEventListener: jest.fn()
}));
const setIsOpen = jest.fn();
const setOptions = jest.fn();
const defaultState = {
  isOpen: false,
  options: {
    height: _useModalIFrameData.DEFAULT_HEIGHT
  }
};
const mockUseStateWithValues = values => {
  jest.spyOn(_react.default, 'useState').mockReturnValueOnce([values.isOpen, setIsOpen]).mockReturnValueOnce([values.options, setOptions]);
};
describe('useModalIFrameData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const testHandleModalClose = ({
    trigger
  }) => {
    const postMessage = jest.fn();
    document.querySelector = jest.fn().mockReturnValue({
      contentWindow: {
        postMessage
      }
    });
    trigger();
    expect(_react.default.useState).toHaveBeenNthCalledWith(1, false);
    expect(postMessage).toHaveBeenCalledWith({
      type: 'plugin.modal-close'
    }, '*');
  };
  describe('behavior', () => {
    it('should initialize with modal closed and default height', () => {
      const {
        result
      } = (0, _react2.renderHook)(() => (0, _useModalIFrameData.default)());
      expect(result.current.modalOptions).toEqual({
        isOpen: false,
        height: _useModalIFrameData.DEFAULT_HEIGHT
      });
    });
    describe('eventListener', () => {
      const oldOptions = {
        some: 'old',
        options: 'yeah'
      };
      const prepareListener = () => {
        expect(_hooks.useEventListener).toHaveBeenCalled();
        const call = _hooks.useEventListener.mock.calls[0][1];
        expect(call.prereqs).toEqual([]);
        return call.cb;
      };
      it('consumes modal events and opens sets modal options with open: true', () => {
        mockUseStateWithValues({
          isOpen: false,
          options: oldOptions
        });
        (0, _react2.renderHook)(() => (0, _useModalIFrameData.default)());
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
        expect(setIsOpen).toHaveBeenCalledWith(true);
        expect(setOptions).toHaveBeenCalled();
        const [[setOptionsCb]] = setOptions.mock.calls;
        expect(setOptionsCb(oldOptions)).toEqual(_objectSpread(_objectSpread({}, oldOptions), payload));
      });
      it('ignores events with no type', () => {
        const {
          result
        } = (0, _react2.renderHook)(() => (0, _useModalIFrameData.default)());
        const initialState = result.current.modalOptions;
        const receiveMessage = prepareListener();
        const payload = {
          test: 'values'
        };
        receiveMessage({
          data: {
            payload
          }
        });
        expect(result.current.modalOptions).toEqual(initialState);
      });
      it('calls handleModalClose behavior when receiving a "plugin.modal-close" event', () => {
        (0, _react2.renderHook)(() => (0, _useModalIFrameData.default)());
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
      mockUseStateWithValues(defaultState);
      testHandleModalClose({
        trigger: (0, _useModalIFrameData.default)().handleModalClose
      });
    });
    it('forwards modalOptions from state values', () => {
      const modalOptions = {
        test: 'options'
      };
      mockUseStateWithValues({
        isOpen: true,
        options: modalOptions
      });
      expect((0, _useModalIFrameData.default)().modalOptions).toEqual(_objectSpread(_objectSpread({}, modalOptions), {}, {
        isOpen: true
      }));
    });
  });
});
//# sourceMappingURL=useModalIFrameData.test.js.map