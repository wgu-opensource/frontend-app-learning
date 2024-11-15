"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.fetchCourseRecommendationsSuccess = exports.fetchCourseRecommendationsRequest = exports.fetchCourseRecommendationsFailure = exports.LOADING = exports.LOADED = exports.FAILED = void 0;
var _toolkit = require("@reduxjs/toolkit");
/* eslint-disable no-param-reassign */

const LOADING = 'loading';
exports.LOADING = LOADING;
const LOADED = 'loaded';
exports.LOADED = LOADED;
const FAILED = 'failed';
exports.FAILED = FAILED;
const slice = (0, _toolkit.createSlice)({
  courseId: null,
  name: 'recommendations',
  initialState: {
    recommendationsStatus: LOADING
  },
  reducers: {
    fetchCourseRecommendationsRequest: (state, _ref) => {
      let {
        payload
      } = _ref;
      state.courseId = payload.courseId;
      state.recommendationsStatus = LOADING;
    },
    fetchCourseRecommendationsSuccess: (state, _ref2) => {
      let {
        payload
      } = _ref2;
      state.courseId = payload.courseId;
      state.recommendationsStatus = LOADED;
    },
    fetchCourseRecommendationsFailure: (state, _ref3) => {
      let {
        payload
      } = _ref3;
      state.courseId = payload.courseId;
      state.recommendationsStatus = FAILED;
    }
  }
});
const {
  fetchCourseRecommendationsRequest,
  fetchCourseRecommendationsSuccess,
  fetchCourseRecommendationsFailure
} = slice.actions;
exports.fetchCourseRecommendationsFailure = fetchCourseRecommendationsFailure;
exports.fetchCourseRecommendationsSuccess = fetchCourseRecommendationsSuccess;
exports.fetchCourseRecommendationsRequest = fetchCourseRecommendationsRequest;
const {
  reducer
} = slice;
exports.reducer = reducer;
//# sourceMappingURL=slice.js.map