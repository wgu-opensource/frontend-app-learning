"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.views = exports.modelKeys = exports.messageTypes = exports.loadingState = exports.default = void 0;
var _dist = require("@edx/react-unit-test-utils/dist");
const modelKeys = exports.modelKeys = (0, _dist.StrictDict)({
  units: 'units',
  coursewareMeta: 'coursewareMeta'
});
const views = exports.views = (0, _dist.StrictDict)({
  student: 'student_view',
  public: 'public_view'
});
const loadingState = exports.loadingState = 'loading';
const messageTypes = exports.messageTypes = (0, _dist.StrictDict)({
  modal: 'plugin.modal',
  resize: 'plugin.resize',
  videoFullScreen: 'plugin.videoFullScreen'
});
var _default = exports.default = (0, _dist.StrictDict)({
  modelKeys,
  views,
  loadingState,
  messageTypes
});
//# sourceMappingURL=constants.js.map