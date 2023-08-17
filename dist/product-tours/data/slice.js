"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTourData = exports.reducer = exports.launchCourseHomeTour = exports.disableNewUserCourseHomeModal = exports.disableCoursewareTour = exports.disableCourseHomeTour = void 0;

var _toolkit = require("@reduxjs/toolkit");

/* eslint-disable no-param-reassign */
const slice = (0, _toolkit.createSlice)({
  name: 'tours',
  initialState: {
    showCoursewareTour: false,
    showExistingUserCourseHomeTour: false,
    showNewUserCourseHomeModal: false,
    showNewUserCourseHomeTour: false,
    toursEnabled: false
  },
  reducers: {
    disableCourseHomeTour: state => {
      state.showNewUserCourseHomeModal = false;
      state.showNewUserCourseHomeTour = false;
      state.showExistingUserCourseHomeTour = false;
    },
    disableCoursewareTour: state => {
      state.showCoursewareTour = false;
    },
    disableNewUserCourseHomeModal: state => {
      state.showNewUserCourseHomeModal = false;
    },
    launchCourseHomeTour: state => {
      if (state.showExistingUserCourseHomeTour) {
        state.showExistingUserCourseHomeTour = false;
      }

      if (!state.showNewUserCourseHomeModal || !state.showNewUserCourseHomeTour) {
        state.showNewUserCourseHomeTour = true;
      }
    },
    setTourData: (state, _ref) => {
      let {
        payload
      } = _ref;
      const {
        courseHomeTourStatus,
        showCoursewareTour,
        toursEnabled
      } = payload;
      state.showCoursewareTour = showCoursewareTour;
      state.showExistingUserCourseHomeTour = courseHomeTourStatus === 'show-existing-user-tour';
      state.showNewUserCourseHomeModal = courseHomeTourStatus === 'show-new-user-tour';
      state.toursEnabled = toursEnabled;
    }
  }
});
const {
  disableCourseHomeTour,
  disableCoursewareTour,
  disableNewUserCourseHomeModal,
  launchCourseHomeTour,
  setTourData
} = slice.actions;
exports.setTourData = setTourData;
exports.launchCourseHomeTour = launchCourseHomeTour;
exports.disableNewUserCourseHomeModal = disableNewUserCourseHomeModal;
exports.disableCoursewareTour = disableCoursewareTour;
exports.disableCourseHomeTour = disableCourseHomeTour;
const {
  reducer
} = slice;
exports.reducer = reducer;
//# sourceMappingURL=slice.js.map