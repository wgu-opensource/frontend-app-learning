"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setShowSearch = exports.setCallToActionToast = exports.reducer = exports.fetchTabSuccess = exports.fetchTabRequest = exports.fetchTabFailure = exports.fetchTabDenied = exports.fetchProctoringInfoResolved = exports.LOADING = exports.LOADED = exports.FAILED = exports.DENIED = void 0;
var _toolkit = require("@reduxjs/toolkit");
/* eslint-disable no-param-reassign */

const LOADING = exports.LOADING = 'loading';
const LOADED = exports.LOADED = 'loaded';
const FAILED = exports.FAILED = 'failed';
const DENIED = exports.DENIED = 'denied';
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
    },
    setShowSearch: (state, _ref6) => {
      let {
        payload
      } = _ref6;
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