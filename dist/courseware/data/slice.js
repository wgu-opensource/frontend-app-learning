"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCourseOutlineCompletion = exports.setCoursewareOutlineSidebarToggles = exports.reducer = exports.fetchSequenceSuccess = exports.fetchSequenceRequest = exports.fetchSequenceFailure = exports.fetchCourseSuccess = exports.fetchCourseRequest = exports.fetchCourseRecommendationsSuccess = exports.fetchCourseRecommendationsRequest = exports.fetchCourseRecommendationsFailure = exports.fetchCourseOutlineSuccess = exports.fetchCourseOutlineRequest = exports.fetchCourseOutlineFailure = exports.fetchCourseFailure = exports.fetchCourseDenied = exports.LOADING = exports.LOADED = exports.FAILED = exports.DENIED = void 0;
var _toolkit = require("@reduxjs/toolkit");
/* eslint-disable no-param-reassign */

const LOADING = exports.LOADING = 'loading';
const LOADED = exports.LOADED = 'loaded';
const FAILED = exports.FAILED = 'failed';
const DENIED = exports.DENIED = 'denied';
const slice = (0, _toolkit.createSlice)({
  name: 'courseware',
  initialState: {
    courseId: null,
    courseStatus: LOADING,
    sequenceId: null,
    sequenceMightBeUnit: false,
    sequenceStatus: LOADING,
    courseOutline: {},
    coursewareOutlineSidebarSettings: {},
    courseOutlineStatus: LOADING,
    courseOutlineShouldUpdate: false
  },
  reducers: {
    fetchCourseRequest: (state, _ref) => {
      let {
        payload
      } = _ref;
      state.courseId = payload.courseId;
      state.courseStatus = LOADING;
    },
    fetchCourseSuccess: (state, _ref2) => {
      let {
        payload
      } = _ref2;
      state.courseId = payload.courseId;
      state.courseStatus = LOADED;
    },
    fetchCourseFailure: (state, _ref3) => {
      let {
        payload
      } = _ref3;
      state.courseId = payload.courseId;
      state.courseStatus = FAILED;
    },
    fetchCourseDenied: (state, _ref4) => {
      let {
        payload
      } = _ref4;
      state.courseId = payload.courseId;
      state.courseStatus = DENIED;
    },
    fetchSequenceRequest: (state, _ref5) => {
      let {
        payload
      } = _ref5;
      state.sequenceId = payload.sequenceId;
      state.sequenceStatus = LOADING;
      state.sequenceMightBeUnit = false;
    },
    fetchSequenceSuccess: (state, _ref6) => {
      let {
        payload
      } = _ref6;
      state.sequenceId = payload.sequenceId;
      state.sequenceStatus = LOADED;
      state.sequenceMightBeUnit = false;
    },
    fetchSequenceFailure: (state, _ref7) => {
      let {
        payload
      } = _ref7;
      state.sequenceId = payload.sequenceId;
      state.sequenceStatus = FAILED;
      state.sequenceMightBeUnit = payload.sequenceMightBeUnit || false;
    },
    fetchCourseOutlineRequest: state => {
      state.courseOutline = {};
      state.courseOutlineStatus = LOADING;
    },
    fetchCourseOutlineSuccess: (state, _ref8) => {
      let {
        payload
      } = _ref8;
      state.courseOutline = payload.courseOutline;
      state.courseOutlineStatus = LOADED;
      state.courseOutlineShouldUpdate = false;
    },
    fetchCourseOutlineFailure: state => {
      state.courseOutline = {};
      state.courseOutlineStatus = FAILED;
    },
    setCoursewareOutlineSidebarToggles: (state, _ref9) => {
      let {
        payload
      } = _ref9;
      state.coursewareOutlineSidebarSettings = payload;
    },
    updateCourseOutlineCompletion: (state, _ref10) => {
      let {
        payload
      } = _ref10;
      const {
        unitId,
        isComplete: isUnitComplete
      } = payload;
      if (!isUnitComplete) {
        return state;
      }
      state.courseOutline.units[unitId].complete = true;
      const sequenceId = Object.keys(state.courseOutline.sequences).find(id => state.courseOutline.sequences[id].unitIds.includes(unitId));
      const sequenceUnits = state.courseOutline.sequences[sequenceId].unitIds;
      const completedUnits = sequenceUnits.filter(id => state.courseOutline.units[id].complete);
      const isAllUnitsAreComplete = sequenceUnits.every(id => state.courseOutline.units[id].complete);

      // Update amount of completed units of the sequence
      state.courseOutline.sequences[sequenceId].completionStat.completed = completedUnits.length;
      if (isAllUnitsAreComplete) {
        state.courseOutline.sequences[sequenceId].complete = true;
      }
      const sectionId = Object.keys(state.courseOutline.sections).find(id => state.courseOutline.sections[id].sequenceIds.includes(sequenceId));
      const sectionSequences = state.courseOutline.sections[sectionId].sequenceIds;
      const isAllSequencesAreComplete = sectionSequences.every(id => state.courseOutline.sequences[id].complete);
      const hasLockedSequence = sectionSequences.some(id => state.courseOutline.sequences[id].type === 'lock');

      // This block of code checks whether all units in the current sequence are complete
      // and if the parent section has a locked (prerequisites) sequence. If both conditions
      // are met, it switches the state of the 'courseOutlineShouldUpdate' flag to true,
      // indicating that the sidebar outline structure needs to be refetched.
      if (isAllUnitsAreComplete && hasLockedSequence) {
        state.courseOutlineShouldUpdate = true;
      }

      // Update amount of completed units of the section
      state.courseOutline.sections[sectionId].completionStat.completed = sectionSequences.reduce((acc, id) => acc + state.courseOutline.sequences[id].completionStat.completed, 0);
      if (isAllSequencesAreComplete) {
        state.courseOutline.sections[sectionId].complete = true;
      }
      return state;
    }
  }
});
const {
  fetchCourseRequest,
  fetchCourseSuccess,
  fetchCourseFailure,
  fetchCourseDenied,
  fetchSequenceRequest,
  fetchSequenceSuccess,
  fetchSequenceFailure,
  fetchCourseRecommendationsRequest,
  fetchCourseRecommendationsSuccess,
  fetchCourseRecommendationsFailure,
  fetchCourseOutlineRequest,
  fetchCourseOutlineSuccess,
  fetchCourseOutlineFailure,
  setCoursewareOutlineSidebarToggles,
  updateCourseOutlineCompletion
} = slice.actions;
exports.updateCourseOutlineCompletion = updateCourseOutlineCompletion;
exports.setCoursewareOutlineSidebarToggles = setCoursewareOutlineSidebarToggles;
exports.fetchCourseOutlineFailure = fetchCourseOutlineFailure;
exports.fetchCourseOutlineSuccess = fetchCourseOutlineSuccess;
exports.fetchCourseOutlineRequest = fetchCourseOutlineRequest;
exports.fetchCourseRecommendationsFailure = fetchCourseRecommendationsFailure;
exports.fetchCourseRecommendationsSuccess = fetchCourseRecommendationsSuccess;
exports.fetchCourseRecommendationsRequest = fetchCourseRecommendationsRequest;
exports.fetchSequenceFailure = fetchSequenceFailure;
exports.fetchSequenceSuccess = fetchSequenceSuccess;
exports.fetchSequenceRequest = fetchSequenceRequest;
exports.fetchCourseDenied = fetchCourseDenied;
exports.fetchCourseFailure = fetchCourseFailure;
exports.fetchCourseSuccess = fetchCourseSuccess;
exports.fetchCourseRequest = fetchCourseRequest;
const {
  reducer
} = slice;
exports.reducer = reducer;
//# sourceMappingURL=slice.js.map