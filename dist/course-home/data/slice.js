"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCallToActionToast = exports.reducer = exports.fetchTabSuccess = exports.fetchTabRequest = exports.fetchTabFailure = exports.fetchTabDenied = exports.fetchProctoringInfoResolved = exports.LOADING = exports.LOADED = exports.FAILED = exports.DENIED = void 0;

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
  name: 'course-home',
  initialState: {
    courseStatus: 'loading',
    courseId: null,
    proctoringPanelStatus: 'loading',
    toastBodyText: null,
    toastBodyLink: null,
    toastHeader: ''
  },
  reducers: {
    fetchProctoringInfoResolved: state => {
      state.proctoringPanelStatus = LOADED;
    },
    fetchTabDenied: (state, _ref) => {
      let {
        payload
      } = _ref;
      state.courseId = payload.courseId;
      state.courseStatus = DENIED;
    },
    fetchTabFailure: (state, _ref2) => {
      let {
        payload
      } = _ref2;
      state.courseId = payload.courseId;
      state.courseStatus = FAILED;
    },
    fetchTabRequest: (state, _ref3) => {
      let {
        payload
      } = _ref3;
      state.courseId = payload.courseId;
      state.courseStatus = LOADING;
    },
    fetchTabSuccess: (state, _ref4) => {
      let {
        payload
      } = _ref4;
      state.courseId = payload.courseId;
      state.targetUserId = payload.targetUserId;
      state.courseStatus = LOADED;
    },
    setCallToActionToast: (state, _ref5) => {
      let {
        payload
      } = _ref5;
      const {
        header,
        link,
        linkText
      } = payload;
      state.toastBodyLink = link;
      state.toastBodyText = linkText;
      state.toastHeader = header;
    }
  }
});
const {
  fetchProctoringInfoResolved,
  fetchTabDenied,
  fetchTabFailure,
  fetchTabRequest,
  fetchTabSuccess,
  setCallToActionToast
} = slice.actions;
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