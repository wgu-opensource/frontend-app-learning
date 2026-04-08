"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSequenceStatus = exports.getSequenceId = exports.getCoursewareOutlineSidebarSettings = exports.getCourseOutlineStatus = exports.getCourseOutlineShouldUpdate = exports.getCourseOutline = void 0;
exports.sequenceIdsSelector = sequenceIdsSelector;
var _constants = require("@src/constants");
function sequenceIdsSelector(state) {
  if (state.courseware.courseStatus !== _constants.LOADED) {
    return [];
  }
  const {
    sectionIds = []
  } = state.models.coursewareMeta[state.courseware.courseId];
  return sectionIds.flatMap(sectionId => state.models.sections[sectionId].sequenceIds);
}
const getSequenceId = state => state.courseware.sequenceId;
exports.getSequenceId = getSequenceId;
const getCourseOutline = state => state.courseware.courseOutline;
exports.getCourseOutline = getCourseOutline;
const getCourseOutlineStatus = state => state.courseware.courseOutlineStatus;
exports.getCourseOutlineStatus = getCourseOutlineStatus;
const getSequenceStatus = state => state.courseware.sequenceStatus;
exports.getSequenceStatus = getSequenceStatus;
const getCoursewareOutlineSidebarSettings = state => state.courseware.coursewareOutlineSidebarSettings;
exports.getCoursewareOutlineSidebarSettings = getCoursewareOutlineSidebarSettings;
const getCourseOutlineShouldUpdate = state => state.courseware.courseOutlineShouldUpdate;
exports.getCourseOutlineShouldUpdate = getCourseOutlineShouldUpdate;
//# sourceMappingURL=selectors.js.map