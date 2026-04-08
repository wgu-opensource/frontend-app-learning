"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setShowSearch = exports.setCallToActionToast = exports.reducer = exports.fetchTabSuccess = exports.fetchTabRequest = exports.fetchTabFailure = exports.fetchTabDenied = exports.fetchProctoringInfoResolved = void 0;
var _toolkit = require("@reduxjs/toolkit");
var _constants = require("@src/constants");
/* eslint-disable no-param-reassign */

const slice = (0, _toolkit.createSlice)({
  name: 'course-home',
  initialState: {
    courseStatus: 'loading',
    courseId: null,
    proctoringPanelStatus: 'loading',
    toastBodyText: null,
    toastBodyLink: null,
    toastHeader: '',
    showSearch: false
  },
  reducers: {
    fetchProctoringInfoResolved: state => {
      state.proctoringPanelStatus = _constants.LOADED;
    },
    fetchTabDenied: (state, {
      payload
    }) => {
      state.courseId = payload.courseId;
      state.courseStatus = _constants.DENIED;
    },
    fetchTabFailure: (state, {
      payload
    }) => {
      state.courseId = payload.courseId;
      state.courseStatus = _constants.FAILED;
    },
    fetchTabRequest: (state, {
      payload
    }) => {
      state.courseId = payload.courseId;
      state.courseStatus = _constants.LOADING;
    },
    fetchTabSuccess: (state, {
      payload
    }) => {
      state.courseId = payload.courseId;
      state.targetUserId = payload.targetUserId;
      state.courseStatus = _constants.LOADED;
    },
    setCallToActionToast: (state, {
      payload
    }) => {
      const {
        header,
        link,
        linkText
      } = payload;
      state.toastBodyLink = link;
      state.toastBodyText = linkText;
      state.toastHeader = header;
    },
    setShowSearch: (state, {
      payload
    }) => {
      state.showSearch = payload;
    }
  }
});
const {
  fetchProctoringInfoResolved,
  fetchTabDenied,
  fetchTabFailure,
  fetchTabRequest,
  fetchTabSuccess,
  setCallToActionToast,
  setShowSearch
} = slice.actions;
exports.setShowSearch = setShowSearch;
exports.setCallToActionToast = setCallToActionToast;
exports.fetchTabSuccess = fetchTabSuccess;
exports.fetchTabRequest = fetchTabRequest;
exports.fetchTabFailure = fetchTabFailure;
exports.fetchTabDenied = fetchTabDenied;
exports.fetchProctoringInfoResolved = fetchProctoringInfoResolved;
const {
  reducer
} = slice;
exports.reducer = reducer;
//# sourceMappingURL=slice.js.map