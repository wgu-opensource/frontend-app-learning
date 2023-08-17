"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18n = require("@edx/frontend-platform/i18n");

const messages = (0, _i18n.defineMessages)({
  completed: {
    id: 'learning.dates.badge.completed',
    defaultMessage: 'Completed',
    description: 'shown as label for the assignments which learner has completed.'
  },
  dueNext: {
    id: 'learning.dates.badge.dueNext',
    defaultMessage: 'Due next',
    description: 'Shown as label for the assignment which date is in the future'
  },
  pastDue: {
    id: 'learning.dates.badge.pastDue',
    defaultMessage: 'Past due',
    description: 'Shown as label for the assignments which deadline has passed'
  },
  title: {
    id: 'learning.dates.title',
    defaultMessage: 'Important dates',
    description: 'The title of dates tab (course timeline).'
  },
  today: {
    id: 'learning.dates.badge.today',
    defaultMessage: 'Today',
    description: 'Label used when the scheduled date for the assignment matches the current day'
  },
  unreleased: {
    id: 'learning.dates.badge.unreleased',
    defaultMessage: 'Not yet released',
    description: 'Shown as label for assignments which date is unknown yet'
  },
  verifiedOnly: {
    id: 'learning.dates.badge.verifiedOnly',
    defaultMessage: 'Verified only',
    description: 'Shown as label for assignments which learner has no access to.'
  }
});
var _default = messages;
exports.default = _default;
//# sourceMappingURL=messages.js.map