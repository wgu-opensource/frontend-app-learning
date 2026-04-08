"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _i18n = require("@edx/frontend-platform/i18n");
var _GenericTourFormattedMessages = require("./GenericTourFormattedMessages");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const coursewareTour = ({
  enabled,
  onEnd
}) => ({
  checkpoints: [{
    body: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "tours.sequenceNavigationCheckpoint.body",
      defaultMessage: "The top bar within your course allows you to easily jump to different sections and shows you what\u2019s coming up."
    }),
    placement: 'bottom',
    target: '#courseware-sequence-navigation'
  }],
  enabled,
  endButtonText: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericTourFormattedMessages.OkayButtonFormattedMessage, {}),
  onEnd,
  onEscape: onEnd,
  tourId: 'coursewareTour'
});
var _default = exports.default = coursewareTour;
//# sourceMappingURL=CoursewareTour.js.map