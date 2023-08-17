"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.fetchSequenceSuccess = exports.fetchSequenceRequest = exports.fetchSequenceFailure = exports.fetchCourseSuccess = exports.fetchCourseRequest = exports.fetchCourseRecommendationsSuccess = exports.fetchCourseRecommendationsRequest = exports.fetchCourseRecommendationsFailure = exports.fetchCourseFailure = exports.fetchCourseDenied = exports.LOADING = exports.LOADED = exports.FAILED = exports.DENIED = void 0;

var _toolkit = require("@reduxjs/toolkit");

/* eslint-disable no-param-reassign */
const LOADING = 'loading';
exports.LOADING = LOADING;
const LOADED = 'loaded';
exports.LOADED = LOADED;
const FAILED = 'failed';
exports.FAILED = FAILED;
const DENIED = 'denied';
exports.DENIED = DENIED;
const slice = (0, _toolkit.createSlice)({
  name: 'courseware',
  initialState: {
    courseStatus: 'loading',
    courseId: null,
    sequenceStatus: 'loading',
    sequenceId: null,
    sequenceMightBeUnit: false
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
  fetchCourseRecommendationsFailure
} = slice.actions;
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