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

const existingUserCourseHomeTour = _ref => {
  let {
    enabled,
    onEnd
  } = _ref;
  return {
    checkpoints: [{
      body: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "tours.existingUserTour.launchTourCheckpoint.body",
        defaultMessage: "We\u2019ve recently added a few new features to the course experience. Want some help looking around? Take a tour to learn more."
      }),
      placement: 'left',
      target: '#courseHome-launchTourLink'
    }],
    enabled,
    endButtonText: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericTourFormattedMessages.OkayButtonFormattedMessage, {}),
    onEnd,
    onEscape: onEnd,
    tourId: 'existingUserCourseHomeTour'
  };
};

var _default = existingUserCourseHomeTour;
exports.default = _default;
//# sourceMappingURL=ExistingUserCourseHomeTour.js.map