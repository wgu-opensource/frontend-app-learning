"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _i18n = require("@edx/frontend-platform/i18n");
const messages = (0, _i18n.defineMessages)({
  progressHeader: {
    id: 'progress.header',
    defaultMessage: 'Your progress',
    description: 'Headline or title for the progress tab'
  },
  progressHeaderForTargetUser: {
    id: 'progress.header.targetUser',
    defaultMessage: 'Course progress for {username}',
    description: 'Header when displaying the progress for a different user'
  },
  studioLink: {
    id: 'progress.link.studio',
    defaultMessage: 'View grading in Studio',
    description: 'Text shown for button that redirects to the studio if the user is a staff memember'
  }
});
var _default = messages;
exports.default = _default;
//# sourceMappingURL=messages.js.map