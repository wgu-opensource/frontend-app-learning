"use strict";

var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _reactUnitTestUtils = require("@edx/react-unit-test-utils");
var _logging = require("@edx/frontend-platform/logging");
var _frontendPlatform = require("@edx/frontend-platform");
var _data = require("../../../../data");
var _thunks = require("../../../../../course-home/data/thunks");
var _hooks = require("../../../../../generic/hooks");
var _constants = require("../constants");
var _useIFrameBehavior = _interopRequireWildcard(require("./useIFrameBehavior"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn()
}));
jest.mock('react', () => _objectSpread(_objectSpread({}, jest.requireActual('react')), {}, {
  useEffect: jest.fn(),
  useCallback: jest.fn((cb, prereqs) => ({
    cb,
    prereqs
  }))
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));
jest.mock('./useLoadBearingHook', () => jest.fn());
jest.mock('@edx/frontend-platform/logging', () => ({
  logError: jest.fn()
}));
jest.mock('../../../../data', () => ({
  fetchCourse: jest.fn()
}));
jest.mock('../../../../../course-home/data/thunks', () => ({
  processEvent: jest.fn(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return {
      processEvent: args
    };
  })
}));
jest.mock('../../../../../generic/hooks', () => ({
  useEventListener: jest.fn()
}));
const state = (0, _reactUnitTestUtils.mockUseKeyedState)(_useIFrameBehavior.stateKeys);
const props = {
  elementId: 'test-element-id',
  id: 'test-id',
  iframeUrl: 'test-iframe-url',
  onLoaded: jest.fn()
};
const testIFrameHeight = 42;
const config = {
  LMS_BASE_URL: 'test-base-url'
};
_frontendPlatform.getConfig.mockReturnValue(config);
const dispatch = jest.fn();
_reactRedux.useDispatch.mockReturnValue(dispatch);
const postMessage = jest.fn();
const frame = {
  contentWindow: {
    postMessage
  }
};
const mockGetElementById = jest.fn(() => frame);
const testHash = '#test-hash';
const defaultStateVals = {
  iframeHeight: 0,
  hasLoaded: false,
  showError: false,
  windowTopOffset: null
};
const stateVals = {
  iframeHeight: testIFrameHeight,
  hasLoaded: true,
  showError: true,
  windowTopOffset: 32
};
describe('useIFrameBehavior hook', () => {
  let hook;
  beforeEach(() => {
    jest.clearAllMocks();
    state.mock();
  });
  afterEach(() => {
    state.resetVals();
  });
  describe('behavior', () => {
    it('initializes iframe height to 0 and error/loaded values to false', () => {
      hook = (0, _useIFrameBehavior.default)(props);
      state.expectInitializedWith(_useIFrameBehavior.stateKeys.iframeHeight, 0);
      state.expectInitializedWith(_useIFrameBehavior.stateKeys.hasLoaded, false);
      state.expectInitializedWith(_useIFrameBehavior.stateKeys.showError, false);
      state.expectInitializedWith(_useIFrameBehavior.stateKeys.windowTopOffset, null);
    });
    describe('effects - on frame change', () => {
      let oldGetElement;
      beforeEach(() => {
        global.window ??= Object.create(window);
        Object.defineProperty(window, 'location', {
          value: {},
          writable: true
        });
        state.mockVals(stateVals);
        oldGetElement = document.getElementById;
        document.getElementById = mockGetElementById;
      });
      afterEach(() => {
        state.resetVals();
        document.getElementById = oldGetElement;
      });
      it('does not post url hash if the window does not have one', () => {
        hook = (0, _useIFrameBehavior.default)(props);
        const cb = (0, _reactUnitTestUtils.getEffects)([props.id, props.onLoaded, testIFrameHeight, true], _react.default)[0];
        cb();
        expect(postMessage).not.toHaveBeenCalled();
      });
      it('posts url hash if the window has one', () => {
        window.location.hash = testHash;
        hook = (0, _useIFrameBehavior.default)(props);
        const cb = (0, _reactUnitTestUtils.getEffects)([props.id, props.onLoaded, testIFrameHeight, true], _react.default)[0];
        cb();
        expect(postMessage).toHaveBeenCalledWith({
          hashName: testHash
        }, config.LMS_BASE_URL);
      });
    });
    describe('event listener', () => {
      it('calls eventListener with prepared callback', () => {
        state.mockVals(stateVals);
        hook = (0, _useIFrameBehavior.default)(props);
        const [call] = _hooks.useEventListener.mock.calls;
        expect(call[0]).toEqual('message');
        expect(call[1].prereqs).toEqual([props.id, props.onLoaded, state.values.hasLoaded, state.setState.hasLoaded, state.values.iframeHeight, state.setState.iframeHeight, state.values.windowTopOffset, state.setState.windowTopOffset]);
      });
      describe('resize message', () => {
        const resizeMessage = function () {
          let height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 23;
          return {
            data: {
              type: _constants.messageTypes.resize,
              payload: {
                height
              }
            }
          };
        };
        const testSetIFrameHeight = function () {
          let height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 23;
          const {
            cb
          } = _hooks.useEventListener.mock.calls[0][1];
          cb(resizeMessage(height));
          expect(state.setState.iframeHeight).toHaveBeenCalledWith(height);
        };
        const testOnlySetsHeight = () => {
          it('sets iframe height with payload height', () => {
            testSetIFrameHeight();
          });
          it('does not set hasLoaded', () => {
            expect(state.setState.hasLoaded).not.toHaveBeenCalled();
          });
        };
        describe('hasLoaded', () => {
          beforeEach(() => {
            state.mockVals(_objectSpread(_objectSpread({}, defaultStateVals), {}, {
              hasLoaded: true
            }));
            hook = (0, _useIFrameBehavior.default)(props);
          });
          testOnlySetsHeight();
        });
        describe('iframeHeight is not 0', () => {
          beforeEach(() => {
            state.mockVals(_objectSpread(_objectSpread({}, defaultStateVals), {}, {
              hasLoaded: true
            }));
            hook = (0, _useIFrameBehavior.default)(props);
          });
          testOnlySetsHeight();
        });
        describe('payload height is 0', () => {
          beforeEach(() => {
            hook = (0, _useIFrameBehavior.default)(props);
          });
          testOnlySetsHeight(0);
        });
        describe('payload is present but uninitialized', () => {
          it('sets iframe height with payload height', () => {
            hook = (0, _useIFrameBehavior.default)(props);
            testSetIFrameHeight();
          });
          it('sets hasLoaded and calls onLoaded', () => {
            hook = (0, _useIFrameBehavior.default)(props);
            const {
              cb
            } = _hooks.useEventListener.mock.calls[0][1];
            cb(resizeMessage());
            expect(state.setState.hasLoaded).toHaveBeenCalledWith(true);
            expect(props.onLoaded).toHaveBeenCalled();
          });
          test('onLoaded is optional', () => {
            hook = (0, _useIFrameBehavior.default)(_objectSpread(_objectSpread({}, props), {}, {
              onLoaded: undefined
            }));
            const {
              cb
            } = _hooks.useEventListener.mock.calls[0][1];
            cb(resizeMessage());
            expect(state.setState.hasLoaded).toHaveBeenCalledWith(true);
          });
        });
        it('scrolls to current window vertical offset if one is set', () => {
          const windowTopOffset = 32;
          state.mockVals(_objectSpread(_objectSpread({}, defaultStateVals), {}, {
            windowTopOffset
          }));
          hook = (0, _useIFrameBehavior.default)(props);
          const {
            cb
          } = _hooks.useEventListener.mock.calls[0][1];
          cb(resizeMessage());
          expect(window.scrollTo).toHaveBeenCalledWith(0, windowTopOffset);
        });
        it('does not scroll if towverticalp offset is not set', () => {
          hook = (0, _useIFrameBehavior.default)(props);
          const {
            cb
          } = _hooks.useEventListener.mock.calls[0][1];
          cb(resizeMessage());
          expect(window.scrollTo).not.toHaveBeenCalled();
        });
      });
      describe('video fullscreen message', () => {
        let cb;
        const scrollY = 23;
        const fullScreenMessage = open => ({
          data: {
            type: _constants.messageTypes.videoFullScreen,
            payload: {
              open
            }
          }
        });
        beforeEach(() => {
          window.scrollY = scrollY;
          hook = (0, _useIFrameBehavior.default)(props);
          [[, {
            cb
          }]] = _hooks.useEventListener.mock.calls;
        });
        it('sets window top offset based on window.scrollY if opening the video', () => {
          cb(fullScreenMessage(true));
          expect(state.setState.windowTopOffset).toHaveBeenCalledWith(scrollY);
        });
        it('sets window top offset to null if closing the video', () => {
          cb(fullScreenMessage(false));
          expect(state.setState.windowTopOffset).toHaveBeenCalledWith(null);
        });
      });
      describe('offset message', () => {
        it('scrolls to data offset', () => {
          const offsetTop = 44;
          const mockGetEl = jest.fn(() => ({
            offsetTop
          }));
          const oldGetElement = document.getElementById;
          document.getElementById = mockGetEl;
          const oldScrollTo = window.scrollTo;
          window.scrollTo = jest.fn();
          hook = (0, _useIFrameBehavior.default)(props);
          const {
            cb
          } = _hooks.useEventListener.mock.calls[0][1];
          const offset = 99;
          cb({
            data: {
              offset
            }
          });
          expect(window.scrollTo).toHaveBeenCalledWith(0, offset + offsetTop);
          expect(mockGetEl).toHaveBeenCalledWith('unit-iframe');
          document.getElementById = oldGetElement;
          window.scrollTo = oldScrollTo;
        });
      });
    });
  });
  describe('output', () => {
    describe('handleIFrameLoad', () => {
      it('sets and logs error if has not loaded', () => {
        hook = (0, _useIFrameBehavior.default)(props);
        hook.handleIFrameLoad();
        expect(state.setState.showError).toHaveBeenCalledWith(true);
        expect(_logging.logError).toHaveBeenCalled();
      });
      it('does not set/log errors if loaded', () => {
        state.mockVals(_objectSpread(_objectSpread({}, defaultStateVals), {}, {
          hasLoaded: true
        }));
        hook = (0, _useIFrameBehavior.default)(props);
        hook.handleIFrameLoad();
        expect(state.setState.showError).not.toHaveBeenCalled();
        expect(_logging.logError).not.toHaveBeenCalled();
      });
      it('registers an event handler to process fetchCourse events.', () => {
        hook = (0, _useIFrameBehavior.default)(props);
        hook.handleIFrameLoad();
        const eventName = 'test-event-name';
        const event = {
          data: {
            event_name: eventName
          }
        };
        window.onmessage(event);
        expect(dispatch).toHaveBeenCalledWith((0, _thunks.processEvent)(event.data, _data.fetchCourse));
      });
    });
    it('forwards handleIframeLoad, showError, and hasLoaded from state fields', () => {
      state.mockVals(stateVals);
      hook = (0, _useIFrameBehavior.default)(props);
      expect(hook.iframeHeight).toEqual(stateVals.iframeHeight);
      expect(hook.showError).toEqual(stateVals.showError);
      expect(hook.hasLoaded).toEqual(stateVals.hasLoaded);
    });
  });
});
//# sourceMappingURL=useIFrameBehavior.test.js.map