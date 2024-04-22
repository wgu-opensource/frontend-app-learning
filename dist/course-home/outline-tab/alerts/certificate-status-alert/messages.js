"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _i18n = require("@edx/frontend-platform/i18n");
const messages = (0, _i18n.defineMessages)({
  certStatusEarnedNotAvailableHeader: {
    id: 'cert.alert.earned.unavailable.header.v2',
    defaultMessage: 'Your grade and certificate status will be available soon.',
    description: 'Header alerting the user that their certificate will be available soon.'
  },
  certStatusDownloadableHeader: {
    id: 'cert.alert.earned.ready.header',
    defaultMessage: 'Congratulations! Your certificate is ready.',
    description: 'Header alerting the user that their certificate is ready.'
  },
  certStatusNotPassingHeader: {
    id: 'cert.alert.notPassing.header',
    defaultMessage: 'You are not yet eligible for a certificate'
  },
  certStatusNotPassingButton: {
    id: 'cert.alert.notPassing.button',
    defaultMessage: 'View grades'
  }
});
var _default = messages;
exports.default = _default;
//# sourceMappingURL=messages.js.map