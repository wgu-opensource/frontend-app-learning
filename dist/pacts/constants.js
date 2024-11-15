"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usageId = exports.sequenceId = exports.opaqueKeysRegex = exports.dateTypeRegex = exports.dateRegex = exports.courseId = void 0;
const courseId = 'course-v1:edX+DemoX+Demo_Course';
exports.courseId = courseId;
const dateRegex = '^(?:[1-9]\\d{3}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[1-9]\\d(?:0[48]|[2468][048]|[13579][26])|(?:[2468][048]|[13579][26])00)-02-29)T(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:Z|[+-][01]\\d:[0-5]\\d)$';
exports.dateRegex = dateRegex;
const opaqueKeysRegex = '[\\w\\-~.:]';
exports.opaqueKeysRegex = opaqueKeysRegex;
const sequenceId = 'block-v1:edX+DemoX+Demo_Course+type@sequential+block@basic_questions';
exports.sequenceId = sequenceId;
const usageId = 'block-v1:edX+DemoX+Demo_Course+type@vertical+block@47dbd5f836544e61877a483c0b75606c';
exports.usageId = usageId;
const dateTypeRegex = '^(event|todays-date|course-start-date|course-end-date|assignment-due-date|course-expired-date|certificate-available-date|verified-upgrade-deadline|verification-deadline-date)$';
exports.dateTypeRegex = dateTypeRegex;
//# sourceMappingURL=constants.js.map