"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18n = require("@edx/frontend-platform/i18n");

const messages = (0, _i18n.defineMessages)({
  completed: {
    id: 'progress.creditInformation.completed',
    defaultMessage: 'Completed',
    description: 'Label text if a requirement for (course credit) is satisfied'
  },
  courseCredit: {
    id: 'progress.creditInformation.courseCredit',
    defaultMessage: 'course credit',
    description: 'Anchor text for link that redirects (course credit) help page'
  },
  minimumGrade: {
    id: 'progress.creditInformation.minimumGrade',
    defaultMessage: 'Minimum grade for credit ({minGrade}%)'
  },
  requirementsHeader: {
    id: 'progress.creditInformation.requirementsHeader',
    defaultMessage: 'Requirements for course credit',
    description: 'Header for the requirements section in course credit'
  },
  upcoming: {
    id: 'progress.creditInformation.upcoming',
    defaultMessage: 'Upcoming',
    description: 'It indicate that the a (credit requirement) status is not known yet'
  },
  verificationFailed: {
    id: 'progress.creditInformation.verificationFailed',
    defaultMessage: 'Verification failed',
    description: 'It indicate that the learner submitted a requirement but is either failed or declined'
  },
  verificationSubmitted: {
    id: 'progress.creditInformation.verificationSubmitted',
    defaultMessage: 'Verification submitted',
    description: 'It indicate that the learner submitted a requirement but is not graded or reviewed yet'
  }
});
var _default = messages;
exports.default = _default;
//# sourceMappingURL=messages.js.map