"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _i18n = require("@edx/frontend-platform/i18n");
var _GenericTourFormattedMessages = require("./GenericTourFormattedMessages");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const coursewareTour = _ref => {
  let {
    enabled,
    onEnd
  } = _ref;
  return {
    checkpoints: [{
      body: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "tours.sequenceNavigationCheckpoint.body",
        defaultMessage: "The top bar within your course allows you to easily jump to different sections and shows you what\u2019s coming up."
      }),
      placement: 'bottom',
      target: '#courseware-sequenceNavigation'
    }],
    enabled,
    endButtonText: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericTourFormattedMessages.OkayButtonFormattedMessage, {}),
    onEnd,
    onEscape: onEnd,
    tourId: 'coursewareTour'
  };
};
var _default = coursewareTour;
exports.default = _default;
//# sourceMappingURL=CoursewareTour.js.map