"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.daycmp = daycmp;
exports.isLearnerAssignment = isLearnerAssignment;
function daycmp(a, b) {
  if (a.getFullYear() < b.getFullYear()) {
    return -1;
  }
  if (a.getFullYear() > b.getFullYear()) {
    return 1;
  }
  if (a.getMonth() < b.getMonth()) {
    return -1;
  }
  if (a.getMonth() > b.getMonth()) {
    return 1;
  }
  if (a.getDate() < b.getDate()) {
    return -1;
  }
  if (a.getDate() > b.getDate()) {
    return 1;
  }
  return 0;
}

// item is a date block returned from the API
function isLearnerAssignment(item) {
  return item.learnerHasAccess && item.dateType === 'assignment-due-date';
}
//# sourceMappingURL=utils.js.map