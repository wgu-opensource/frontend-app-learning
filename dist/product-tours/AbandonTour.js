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
const abandonTour = ({
  enabled,
  onEnd
}) => ({
  checkpoints: [{
    body: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "tours.abandonTour.launchTourCheckpoint.body",
      defaultMessage: "Feeling lost? Launch the tour any time for some quick tips to get the most out of the experience."
    }),
    placement: 'left',
    target: '#courseHome-launchTourLink'
  }],
  enabled,
  endButtonText: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericTourFormattedMessages.OkayButtonFormattedMessage, {}),
  onEnd,
  onEscape: onEnd,
  tourId: 'abandonTour'
});
var _default = exports.default = abandonTour;
//# sourceMappingURL=AbandonTour.js.map