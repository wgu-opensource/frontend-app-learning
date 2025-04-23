"use strict";

var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _reactUnitTestUtils = require("@edx/react-unit-test-utils");
var _logging = require("@edx/frontend-platform/logging");
var _frontendPlatform = require("@edx/frontend-platform");
var _data = require("@src/courseware/data");
var _thunks = require("@src/course-home/data/thunks");
var _hooks = require("@src/generic/hooks");
var _constants = require("../constants");
var _useIFrameBehavior = _interopRequireWildcard(require("./useIFrameBehavior"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
jest.mock('@src/courseware/data', () => ({
  fetchCourse: jest.fn()
}));
jest.mock('@src/course-home/data/thunks', () => ({
  processEvent: jest.fn(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return {
      processEvent: args
    };
  })
}));
jest.mock('@src/generic/hooks', () => ({
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
        const videoFullScreenMessage = function () {
          let open = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          return {
            data: {
              type: _constants.messageTypes.videoFullScreen,
              payload: {
                open
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
          cb(videoFullScreenMessage());
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