"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _rosie = require("rosie");
require("./tab.factory");
/* A basic course metadata factory, to be specialized in courseware and course-home., */
// eslint-disable-line import/no-extraneous-dependencies
var _default = new _rosie.Factory().option('host').attrs({
  id: 'course-v1:edX+DemoX+Demo_Course'
});
exports.default = _default;
//# sourceMappingURL=courseMetadataBase.factory.js.map