"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ar = _interopRequireDefault(require("./messages/ar.json"));
var _fr = _interopRequireDefault(require("./messages/fr.json"));
var _es_ = _interopRequireDefault(require("./messages/es_419.json"));
var _zh_CN = _interopRequireDefault(require("./messages/zh_CN.json"));
var _pt = _interopRequireDefault(require("./messages/pt.json"));
var _it = _interopRequireDefault(require("./messages/it.json"));
var _uk = _interopRequireDefault(require("./messages/uk.json"));
var _de = _interopRequireDefault(require("./messages/de.json"));
var _ru = _interopRequireDefault(require("./messages/ru.json"));
var _hi = _interopRequireDefault(require("./messages/hi.json"));
var _fr_CA = _interopRequireDefault(require("./messages/fr_CA.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// no need to import en messages-- they are in the defaultMessage field

const messages = {
  ar: _ar.default,
  'es-419': _es_.default,
  fr: _fr.default,
  'zh-cn': _zh_CN.default,
  pt: _pt.default,
  it: _it.default,
  de: _de.default,
  hi: _hi.default,
  'fr-ca': _fr_CA.default,
  ru: _ru.default,
  uk: _uk.default
};
var _default = messages;
exports.default = _default;
//# sourceMappingURL=index.js.map