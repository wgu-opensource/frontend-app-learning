"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.fetchCourseRecommendationsSuccess = exports.fetchCourseRecommendationsRequest = exports.fetchCourseRecommendationsFailure = void 0;
var _toolkit = require("@reduxjs/toolkit");
var _constants = require("@src/constants");
/* eslint-disable no-param-reassign */

const slice = (0, _toolkit.createSlice)({
  courseId: null,
  name: 'recommendations',
  initialState: {
    recommendationsStatus: _constants.LOADING
  },
  reducers: {
    fetchCourseRecommendationsRequest: (state, {
      payload
    }) => {
      state.courseId = payload.courseId;
      state.recommendationsStatus = _constants.LOADING;
    },
    fetchCourseRecommendationsSuccess: (state, {
      payload
    }) => {
      state.courseId = payload.courseId;
      state.recommendationsStatus = _constants.LOADED;
    },
    fetchCourseRecommendationsFailure: (state, {
      payload
    }) => {
      state.courseId = payload.courseId;
      state.recommendationsStatus = _constants.FAILED;
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