"use strict";

var _reactRedux = require("react-redux");
var _react = require("@testing-library/react");
var _logging = require("@edx/frontend-platform/logging");
var _frontendPlatform = require("@edx/frontend-platform");
var _analytics = require("@edx/frontend-platform/analytics");
var _data = require("@src/courseware/data");
var _thunks = require("@src/course-home/data/thunks");
var _hooks = require("@src/generic/hooks");
var _hooks2 = require("@src/courseware/course/sequence/sequence-navigation/hooks");
var _constants = require("../constants");
var _useIFrameBehavior = _interopRequireWildcard(require("./useIFrameBehavior"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const mockNavigate = jest.fn();
jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn()
}));
jest.mock('@edx/frontend-platform/analytics');
jest.mock('react', () => _objectSpread(_objectSpread({}, jest.requireActual('react')), {}, {
  useCallback: jest.fn((cb, prereqs) => ({
    cb,
    prereqs
  }))
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));
jest.mock('@edx/frontend-platform/logging', () => ({
  logError: jest.fn()
}));
jest.mock('@src/courseware/data', () => ({
  fetchCourse: jest.fn()
}));
jest.mock('@src/course-home/data/thunks', () => ({
  processEvent: jest.fn((...args) => ({
    processEvent: args
  }))
}));
jest.mock('@src/generic/hooks', () => ({
  useEventListener: jest.fn()
}));
jest.mock('@src/generic/model-store', () => ({
  useModel: () => ({
    unitIds: ['unit1', 'unit2'],
    entranceExamData: {
      entranceExamPassed: null
    }
  })
}));
jest.mock('react-router-dom', () => _objectSpread(_objectSpread({}, jest.requireActual('react-router-dom')), {}, {
  useNavigate: () => mockNavigate
}));
jest.mock('@src/courseware/course/sequence/sequence-navigation/hooks');
_hooks2.useSequenceNavigationMetadata.mockReturnValue({
  isLastUnit: false,
  nextLink: '/next-unit-link'
});
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
  },
  getBoundingClientRect: jest.fn(() => ({
    top: 100
  }))
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
const setIframeHeight = jest.fn();
const setHasLoaded = jest.fn();
const setShowError = jest.fn();
const setWindowTopOffset = jest.fn();
const mockState = state => {
  const {
    iframeHeight,
    hasLoaded,
    showError,
    windowTopOffset
  } = state;
  if ('iframeHeight' in state) {
    jest.spyOn(_useIFrameBehavior.iframeBehaviorState, 'iframeHeight').mockImplementation(() => [iframeHeight, setIframeHeight]);
  }
  if ('hasLoaded' in state) {
    jest.spyOn(_useIFrameBehavior.iframeBehaviorState, 'hasLoaded').mockImplementation(() => [hasLoaded, setHasLoaded]);
  }
  if ('showError' in state) {
    jest.spyOn(_useIFrameBehavior.iframeBehaviorState, 'showError').mockImplementation(() => [showError, setShowError]);
  }
  if ('windowTopOffset' in state) {
    jest.spyOn(_useIFrameBehavior.iframeBehaviorState, 'windowTopOffset').mockImplementation(() => [windowTopOffset, setWindowTopOffset]);
  }
};
describe('useIFrameBehavior hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.document.getElementById = mockGetElementById;
    global.window.addEventListener = jest.fn();
    global.window.removeEventListener = jest.fn();
    global.window.innerHeight = 800;
  });
  describe('behavior', () => {
    it('initializes iframe height to 0 and error/loaded values to false', () => {
      mockState(defaultStateVals);
      const {
        result
      } = (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
      expect(result.current.iframeHeight).toBe(0);
      expect(result.current.showError).toBe(false);
      expect(result.current.hasLoaded).toBe(false);
    });
    describe('effects - on frame change', () => {
      let oldGetElement;
      beforeEach(() => {
        global.window ??= Object.create(window);
        Object.defineProperty(window, 'location', {
          value: {},
          writable: true
        });
        oldGetElement = document.getElementById;
        document.getElementById = mockGetElementById;
        mockState(defaultStateVals);
      });
      afterEach(() => {
        jest.clearAllMocks();
        document.getElementById = oldGetElement;
      });
      it('does not post url hash if the window does not have one', () => {
        window.location.hash = '';
        (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
        expect(postMessage).not.toHaveBeenCalled();
      });
      it('posts url hash if the window has one', () => {
        window.location.hash = testHash;
        (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
        expect(postMessage).toHaveBeenCalledWith({
          hashName: testHash
        }, config.LMS_BASE_URL);
      });
    });
    describe('event listener', () => {
      it('calls eventListener with prepared callback', () => {
        mockState(stateVals);
        (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
        const [call] = _hooks.useEventListener.mock.calls;
        expect(call[0]).toEqual('message');
        expect(call[1].prereqs).toEqual([props.id, props.onLoaded, stateVals.hasLoaded, setHasLoaded, stateVals.iframeHeight, setIframeHeight, stateVals.windowTopOffset, setWindowTopOffset]);
      });
      describe('resize message', () => {
        const customHeight = 25;
        const defaultHeight = 23;
        const resizeMessage = (height = defaultHeight) => ({
          data: {
            type: _constants.messageTypes.resize,
            payload: {
              height
            }
          }
        });
        const videoFullScreenMessage = (open = false) => ({
          data: {
            type: _constants.messageTypes.videoFullScreen,
            payload: {
              open
            }
          }
        });
        const testSetIFrameHeight = (height = defaultHeight) => {
          const {
            cb
          } = _hooks.useEventListener.mock.calls[0][1];
          cb(resizeMessage(height));
          expect(setIframeHeight).toHaveBeenCalledWith(height);
        };
        describe('hasLoaded', () => {
          it('sets iframe height with payload height', () => {
            mockState(_objectSpread(_objectSpread({}, defaultStateVals), {}, {
              hasLoaded: true
            }));
            (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
            const {
              cb
            } = _hooks.useEventListener.mock.calls[0][1];
            cb(resizeMessage(customHeight));
            expect(setIframeHeight).toHaveBeenCalledWith(0);
            expect(setIframeHeight).toHaveBeenCalledWith(customHeight);
            expect(setIframeHeight).not.toHaveBeenCalledWith(defaultHeight);
          });
        });
        describe('payload height is 0', () => {
          it('sets iframe height with payload height', () => {
            mockState(defaultStateVals);
            (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
            const {
              cb
            } = _hooks.useEventListener.mock.calls[0][1];
            cb(resizeMessage(0));
            expect(setIframeHeight).toHaveBeenCalledWith(0);
            expect(setIframeHeight).not.toHaveBeenCalledWith(customHeight);
            expect(setIframeHeight).not.toHaveBeenCalledWith(defaultHeight);
          });
        });
        describe('payload is present but uninitialized', () => {
          beforeEach(() => {
            mockState(defaultStateVals);
          });
          it('sets iframe height with payload height', () => {
            (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
            testSetIFrameHeight();
          });
          it('sets hasLoaded and calls onLoaded', () => {
            (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
            const {
              cb
            } = _hooks.useEventListener.mock.calls[0][1];
            cb(resizeMessage());
            expect(setHasLoaded).toHaveBeenCalledWith(true);
            expect(props.onLoaded).toHaveBeenCalled();
          });
          test('onLoaded is optional', () => {
            (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(_objectSpread(_objectSpread({}, props), {}, {
              onLoaded: undefined
            })));
            const {
              cb
            } = _hooks.useEventListener.mock.calls[0][1];
            cb(resizeMessage());
            expect(setHasLoaded).toHaveBeenCalledWith(true);
          });
        });
        it('scrolls to current window vertical offset if one is set', () => {
          const windowTopOffset = 32;
          mockState(_objectSpread(_objectSpread({}, defaultStateVals), {}, {
            windowTopOffset
          }));
          (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
          const {
            cb
          } = _hooks.useEventListener.mock.calls[0][1];
          cb(videoFullScreenMessage());
          expect(window.scrollTo).toHaveBeenCalledWith(0, windowTopOffset);
        });
        it('does not scroll if towverticalp offset is not set', () => {
          (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
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
          (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
          [[, {
            cb
          }]] = _hooks.useEventListener.mock.calls;
        });
        it('sets window top offset based on window.scrollY if opening the video', () => {
          cb(fullScreenMessage(true));
          expect(setWindowTopOffset).toHaveBeenCalledWith(scrollY);
        });
        it('sets window top offset to null if closing the video', () => {
          cb(fullScreenMessage(false));
          expect(setWindowTopOffset).toHaveBeenCalledWith(null);
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
          (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
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
    describe('visibility tracking', () => {
      it('sets up visibility tracking after iframe loads', () => {
        mockState(_objectSpread(_objectSpread({}, defaultStateVals), {}, {
          hasLoaded: true
        }));
        (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
        expect(global.window.addEventListener).toHaveBeenCalledTimes(2);
        expect(global.window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
        expect(global.window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
        // Initial visibility update is handled by the `handleIFrameLoad` method.
        expect(postMessage).not.toHaveBeenCalledWith(expect.objectContaining({
          type: 'unit.visibilityStatus'
        }), config.LMS_BASE_URL);
      });
      it('does not set up visibility tracking before iframe has loaded', () => {
        window.location.hash = ''; // Avoid posting hash message.
        mockState(_objectSpread(_objectSpread({}, defaultStateVals), {}, {
          hasLoaded: false
        }));
        (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
        expect(global.window.addEventListener).not.toHaveBeenCalled();
        expect(postMessage).not.toHaveBeenCalled();
      });
      it('cleans up event listeners on unmount', () => {
        mockState(_objectSpread(_objectSpread({}, defaultStateVals), {}, {
          hasLoaded: true
        }));
        const {
          unmount
        } = (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
        unmount(); // Call the cleanup function.

        expect(global.window.removeEventListener).toHaveBeenCalledTimes(2);
        expect(global.window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
        expect(global.window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
      });
    });
  });
  describe('output', () => {
    describe('handleIFrameLoad', () => {
      it('sets and logs error if has not loaded', () => {
        mockState(defaultStateVals);
        const {
          result
        } = (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
        result.current.handleIFrameLoad();
        expect(setShowError).toHaveBeenCalledWith(true);
        expect(_logging.logError).toHaveBeenCalled();
      });
      it('sends track event if has not loaded', () => {
        mockState(defaultStateVals);
        const {
          result
        } = (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
        result.current.handleIFrameLoad();
        const eventName = 'edx.bi.error.learning.iframe_load_failed';
        const eventProperties = {
          unitId: props.id,
          iframeUrl: props.iframeUrl
        };
        expect(_analytics.sendTrackEvent).toHaveBeenCalledWith(eventName, eventProperties);
      });
      it('does not set/log errors if loaded', () => {
        mockState(_objectSpread(_objectSpread({}, defaultStateVals), {}, {
          hasLoaded: true
        }));
        const {
          result
        } = (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
        result.current.handleIFrameLoad();
        expect(setShowError).not.toHaveBeenCalled();
        expect(_logging.logError).not.toHaveBeenCalled();
      });
      it('does not send track event if loaded', () => {
        mockState(_objectSpread(_objectSpread({}, defaultStateVals), {}, {
          hasLoaded: true
        }));
        const {
          result
        } = (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
        result.current.handleIFrameLoad();
        expect(_analytics.sendTrackEvent).not.toHaveBeenCalled();
      });
      it('registers an event handler to process fetchCourse events.', () => {
        mockState(defaultStateVals);
        const {
          result
        } = (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
        result.current.handleIFrameLoad();
        const eventName = 'test-event-name';
        const event = {
          data: {
            event_name: eventName
          }
        };
        window.onmessage(event);
        expect(dispatch).toHaveBeenCalledWith((0, _thunks.processEvent)(event.data, _data.fetchCourse));
      });
      it('updates initial iframe visibility on load', () => {
        const {
          result
        } = (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
        result.current.handleIFrameLoad();
        expect(postMessage).toHaveBeenCalledWith({
          type: 'unit.visibilityStatus',
          data: {
            topPosition: 100,
            viewportHeight: 800
          }
        }, config.LMS_BASE_URL);
      });
    });
    it('forwards handleIframeLoad, showError, and hasLoaded from state fields', () => {
      mockState(stateVals);
      const {
        result
      } = (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
      expect(result.current.iframeHeight).toBe(stateVals.iframeHeight);
      expect(result.current.showError).toBe(stateVals.showError);
      expect(result.current.hasLoaded).toBe(stateVals.hasLoaded);
    });
  });
  describe('navigate link for the next unit on auto advance', () => {
    it('test for link when it is not last unit', () => {
      mockState(defaultStateVals);
      (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
      const {
        cb
      } = _hooks.useEventListener.mock.calls[0][1];
      const autoAdvanceMessage = () => ({
        data: {
          type: _constants.messageTypes.autoAdvance
        }
      });
      cb(autoAdvanceMessage());
      expect(mockNavigate).toHaveBeenCalledWith('/next-unit-link');
    });
    it('test for link when it is last unit', () => {
      mockState(defaultStateVals);
      _hooks2.useSequenceNavigationMetadata.mockReset();
      _hooks2.useSequenceNavigationMetadata.mockReturnValue({
        isLastUnit: true,
        nextLink: '/next-unit-link'
      });
      (0, _react.renderHook)(() => (0, _useIFrameBehavior.default)(props));
      const {
        cb
      } = _hooks.useEventListener.mock.calls[0][1];
      const autoAdvanceMessage = () => ({
        data: {
          type: _constants.messageTypes.autoAdvance
        }
      });
      cb(autoAdvanceMessage());
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
//# sourceMappingURL=useIFrameBehavior.test.js.map