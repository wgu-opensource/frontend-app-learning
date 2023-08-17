"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18n = require("@edx/frontend-platform/i18n");

const messages = (0, _i18n.defineMessages)({
  'learn.contentLock.content.locked': {
    id: 'learn.contentLock.content.locked',
    defaultMessage: 'Content Locked',
    description: 'Message shown to indicate that a piece of content is unavailable and has a prerequisite.'
  },
  'learn.contentLock.complete.prerequisite': {
    id: 'learn.contentLock.complete.prerequisite',
    defaultMessage: "You must complete the prerequisite: ''{prereqSectionName}'' to access this content.",
    description: 'Message shown to indicate which prerequisite the student must complete prior to accessing the locked content.  {prereqSectionName} is the name of the prerequisite.'
  },
  'learn.contentLock.goToSection': {
    id: 'learn.contentLock.goToSection',
    defaultMessage: 'Go To Prerequisite Section',
    description: 'A button users can click that navigates their browser to the prerequisite of this section.'
  }
});
var _default = messages;
exports.default = _default;
//# sourceMappingURL=messages.js.map