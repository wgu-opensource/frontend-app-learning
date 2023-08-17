"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18n = require("@edx/frontend-platform/i18n");

const messages = (0, _i18n.defineMessages)({
  activities: {
    id: 'learning.effortEstimation.activities',
    defaultMessage: '{activityCount, plural, one {# activity} other {# activities}}'
  },
  minutesAbbreviated: {
    id: 'learning.effortEstimation.minutesAbbreviated',
    defaultMessage: '{minuteCount, plural, one {# min} other {# min}}',
    description: 'Number of minutes in a casual, shorthand manner: 5 min'
  },
  minutesFull: {
    id: 'learning.effortEstimation.minutesFull',
    defaultMessage: '{minuteCount, plural, one {# minute} other {# minutes}}',
    description: 'Number of minutes spelled out: 5 minutes'
  }
});
var _default = messages;
exports.default = _default;
//# sourceMappingURL=messages.js.map