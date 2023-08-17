"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ar = _interopRequireDefault(require("./messages/ar.json"));

var _ca = _interopRequireDefault(require("./messages/ca.json"));

var _es_ = _interopRequireDefault(require("./messages/es_419.json"));

var _fr = _interopRequireDefault(require("./messages/fr.json"));

var _zh_CN = _interopRequireDefault(require("./messages/zh_CN.json"));

var _he = _interopRequireDefault(require("./messages/he.json"));

var _id = _interopRequireDefault(require("./messages/id.json"));

var _ko_kr = _interopRequireDefault(require("./messages/ko_kr.json"));

var _pl = _interopRequireDefault(require("./messages/pl.json"));

var _pt_br = _interopRequireDefault(require("./messages/pt_br.json"));

var _ru = _interopRequireDefault(require("./messages/ru.json"));

var _th = _interopRequireDefault(require("./messages/th.json"));

var _uk = _interopRequireDefault(require("./messages/uk.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// no need to import en messages-- they are in the defaultMessage field
const messages = {
  ar: _ar.default,
  'es-419': _es_.default,
  fr: _fr.default,
  'zh-cn': _zh_CN.default,
  ca: _ca.default,
  he: _he.default,
  id: _id.default,
  'ko-kr': _ko_kr.default,
  pl: _pl.default,
  'pt-br': _pt_br.default,
  ru: _ru.default,
  th: _th.default,
  uk: _uk.default
};
var _default = messages;
exports.default = _default;
//# sourceMappingURL=index.js.map