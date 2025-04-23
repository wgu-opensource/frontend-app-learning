"use strict";

var _frontendPlatform = require("@edx/frontend-platform");
var _queryString = require("query-string");
var _urls = require("./urls");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn()
}));
jest.mock('query-string', () => ({
  stringify: jest.fn(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return {
      stringify: args
    };
  })
}));
const config = {
  LMS_BASE_URL: 'test-lms-url'
};
_frontendPlatform.getConfig.mockReturnValue(config);
const props = {
  id: 'test-id',
  view: 'test-view',
  format: 'test-format',
  examAccess: {
    blockAccess: false,
    accessToken: 'test-access-token'
  }
};
describe('urls module getIFrameUrl', () => {
  test('format provided, exam access and token available', () => {
    const params = (0, _queryString.stringify)(_objectSpread(_objectSpread({}, _urls.iframeParams), {}, {
      view: props.view,
      format: props.format,
      exam_access: props.examAccess.accessToken
    }));
    expect((0, _urls.getIFrameUrl)(props)).toEqual(`${config.LMS_BASE_URL}/xblock/${props.id}?${params}`);
  });
  test('no format provided, exam access blocked', () => {
    const params = (0, _queryString.stringify)(_objectSpread(_objectSpread({}, _urls.iframeParams), {}, {
      view: props.view
    }));
    expect((0, _urls.getIFrameUrl)({
      id: props.id,
      view: props.view,
      examAccess: {
        blockAccess: true
      }
    })).toEqual(`${config.LMS_BASE_URL}/xblock/${props.id}?${params}`);
  });
  test('src and dest languages provided', () => {
    const params = (0, _queryString.stringify)(_objectSpread(_objectSpread({}, _urls.iframeParams), {}, {
      view: props.view,
      src_lang: 'test-src-lang',
      dest_lang: 'test-dest-lang'
    }));
    expect((0, _urls.getIFrameUrl)(_objectSpread(_objectSpread({}, props), {}, {
      srcLanguage: 'test-src-lang',
      destLanguage: 'test-dest-lang'
    }))).toEqual(`${config.LMS_BASE_URL}/xblock/${props.id}?${params}`);
  });
  test('src and dest languages provided are the same', () => {
    const params = (0, _queryString.stringify)(_objectSpread(_objectSpread({}, _urls.iframeParams), {}, {
      view: props.view
    }));
    expect((0, _urls.getIFrameUrl)(_objectSpread(_objectSpread({}, props), {}, {
      srcLanguage: 'test-lang',
      destLanguage: 'test-lang'
    }))).toEqual(`${config.LMS_BASE_URL}/xblock/${props.id}?${params}`);
  });
});
//# sourceMappingURL=urls.test.js.map