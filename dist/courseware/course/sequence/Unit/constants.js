"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.views = exports.modelKeys = exports.messageTypes = exports.loadingState = exports.default = void 0;
var _dist = require("@edx/react-unit-test-utils/dist");
const modelKeys = (0, _dist.StrictDict)({
  units: 'units',
  coursewareMeta: 'coursewareMeta'
});
exports.modelKeys = modelKeys;
const views = (0, _dist.StrictDict)({
  student: 'student_view',
  public: 'public_view'
});
exports.views = views;
const loadingState = 'loading';
exports.loadingState = loadingState;
const messageTypes = (0, _dist.StrictDict)({
  modal: 'plugin.modal',
  resize: 'plugin.resize',
  videoFullScreen: 'plugin.videoFullScreen'
});
exports.messageTypes = messageTypes;
var _default = (0, _dist.StrictDict)({
  modelKeys,
  views,
  loadingState,
  messageTypes
});
exports.default = _default;
//# sourceMappingURL=constants.js.map