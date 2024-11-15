"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _frontendComponentFooter = require("@edx/frontend-component-footer");
var _frontendComponentHeader = require("@edx/frontend-component-header");
var _paragon = require("@edx/paragon");
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
var _fa_IR = _interopRequireDefault(require("./messages/fa_IR.json"));
var _fr_CA = _interopRequireDefault(require("./messages/fr_CA.json"));
var _de_DE = _interopRequireDefault(require("./messages/de_DE.json"));
var _it_IT = _interopRequireDefault(require("./messages/it_IT.json"));
var _pt_PT = _interopRequireDefault(require("./messages/pt_PT.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// no need to import en messages-- they are in the defaultMessage field

const appMessages = {
  ar: _ar.default,
  'es-419': _es_.default,
  fr: _fr.default,
  'zh-cn': _zh_CN.default,
  pt: _pt.default,
  it: _it.default,
  de: _de.default,
  hi: _hi.default,
  'fa-ir': _fa_IR.default,
  'fr-ca': _fr_CA.default,
  ru: _ru.default,
  uk: _uk.default,
  'de-de': _de_DE.default,
  'it-it': _it_IT.default,
  'pt-pt': _pt_PT.default
};
var _default = [_paragon.messages, appMessages, _frontendComponentFooter.messages, _frontendComponentHeader.messages];
exports.default = _default;
//# sourceMappingURL=index.js.map