"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _i18n = require("@edx/frontend-platform/i18n");
const messages = (0, _i18n.defineMessages)({
  close: {
    id: 'general.altText.close',
    defaultMessage: 'Close',
    description: 'Text used as an aria-label to describe closing or dismissing a component'
  },
  registerLowercase: {
    id: 'learning.logistration.register',
    // ID left for historical purposes
    defaultMessage: 'register',
    description: 'Text in a link, prompting the user to create an account.  Used in "learning.logistration.alert"'
  },
  signInLowercase: {
    id: 'learning.logistration.login',
    // ID left for historical purposes
    defaultMessage: 'sign in',
    description: 'Text in a link, prompting the user to log in.  Used in "learning.logistration.alert"'
  },
  signInSentenceCase: {
    id: 'general.signIn.sentenceCase',
    defaultMessage: 'Sign in',
    description: 'Text in a button, prompting the user to log in.'
  }
});
var _default = messages;
exports.default = _default;
//# sourceMappingURL=messages.js.map