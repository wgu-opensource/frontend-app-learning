"use strict";

var _react = _interopRequireDefault(require("react"));
var _useLoadBearingHook = _interopRequireDefault(require("./useLoadBearingHook"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
jest.mock('react', () => _objectSpread(_objectSpread({}, jest.requireActual('react')), {}, {
  useState: jest.fn(),
  useLayoutEffect: jest.fn()
}));
const setState = jest.fn();
_react.default.useState.mockImplementation(val => [val, setState]);
const id = 'test-id';
describe('useLoadBearingHook', () => {
  it('increments a simple value w/ useLayoutEffect', () => {
    (0, _useLoadBearingHook.default)(id);
    expect(_react.default.useState).toHaveBeenCalledWith(0);
    const [[layoutCb, prereqs]] = _react.default.useLayoutEffect.mock.calls;
    expect(prereqs).toEqual([id]);
    layoutCb();
    const [[setValueCb]] = setState.mock.calls;
    expect(setValueCb(1)).toEqual(2);
  });
});
//# sourceMappingURL=useLoadBearingHook.test.js.map