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
    fetchTabDenied: (state, _ref) => {
      let {
        payload
      } = _ref;
      state.courseId = payload.courseId;
      state.courseStatus = _constants.DENIED;
    },
    fetchTabFailure: (state, _ref2) => {
      let {
        payload
      } = _ref2;
      state.courseId = payload.courseId;
      state.courseStatus = _constants.FAILED;
    },
    fetchTabRequest: (state, _ref3) => {
      let {
        payload
      } = _ref3;
      state.courseId = payload.courseId;
      state.courseStatus = _constants.LOADING;
    },
    fetchTabSuccess: (state, _ref4) => {
      let {
        payload
      } = _ref4;
      state.courseId = payload.courseId;
      state.targetUserId = payload.targetUserId;
      state.courseStatus = _constants.LOADED;
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