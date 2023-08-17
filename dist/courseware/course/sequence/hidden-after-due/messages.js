"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18n = require("@edx/frontend-platform/i18n");

const messages = (0, _i18n.defineMessages)({
  header: {
    id: 'learn.hiddenAfterDue.header',
    defaultMessage: 'The due date for this assignment has passed.',
    description: 'Shown when content of a course is longer available because due date passed'
  },
  description: {
    id: 'learn.hiddenAfterDue.description',
    defaultMessage: 'Because the due date has passed, this assignment is no longer available.',
    description: 'It explain why the content is not available'
  },
  gradeAvailable: {
    id: 'learn.hiddenAfterDue.gradeAvailable',
    defaultMessage: 'If you have completed this assignment, your grade is available on the {progressPage}.',
    description: 'Text that precedes link that redirect to progress page'
  },
  progressPage: {
    id: 'learn.hiddenAfterDue.progressPage',
    defaultMessage: 'progress page',
    description: 'This is the text for the link embedded in learn.hiddenAfterDue.gradeAvailable'
  }
});
var _default = messages;
exports.default = _default;
//# sourceMappingURL=messages.js.map