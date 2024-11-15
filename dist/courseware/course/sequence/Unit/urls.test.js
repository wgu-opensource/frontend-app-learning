"use strict";

var _frontendPlatform = require("@edx/frontend-platform");
var _queryString = require("query-string");
var _urls = require("./urls");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
describe('urls module', () => {
  describe('getIFrameUrl', () => {
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
  });
});
//# sourceMappingURL=urls.test.js.map