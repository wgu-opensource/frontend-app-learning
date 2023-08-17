"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequenceIdsSelector = sequenceIdsSelector;

/* eslint-disable import/prefer-default-export */
function sequenceIdsSelector(state) {
  if (state.courseware.courseStatus !== 'loaded') {
    return [];
  }

  const {
    sectionIds = []
  } = state.models.coursewareMeta[state.courseware.courseId];
  const sequenceIds = sectionIds.flatMap(sectionId => state.models.sections[sectionId].sequenceIds);
  return sequenceIds;
}
//# sourceMappingURL=selectors.js.map