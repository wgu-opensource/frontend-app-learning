"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleNextSectionCelebration = handleNextSectionCelebration;
exports.recordFirstSectionCelebration = recordFirstSectionCelebration;
exports.recordWeeklyGoalCelebration = recordWeeklyGoalCelebration;
exports.shouldCelebrateOnSectionLoad = shouldCelebrateOnSectionLoad;
var _analytics = require("@edx/frontend-platform/analytics");
var _auth = require("@edx/frontend-platform/auth");
var _api = require("./data/api");
var _localStorage = require("../../../data/localStorage");
var _modelStore = require("../../../generic/model-store");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const CELEBRATION_LOCAL_STORAGE_KEY = 'CelebrationModal.showOnSectionLoad';

// Records clicks through the end of a section, so that we can know whether we should celebrate when we finish loading
function handleNextSectionCelebration(sequenceId, nextSequenceId) {
  (0, _localStorage.setLocalStorage)(CELEBRATION_LOCAL_STORAGE_KEY, {
    prevSequenceId: sequenceId,
    nextSequenceId
  });
}
function recordFirstSectionCelebration(org, courseId, celebrations, dispatch) {
  // Tell the LMS
  (0, _api.postCelebrationComplete)(courseId, {
    first_section: false
  });
  // Update our local copy of course data from LMS
  dispatch((0, _modelStore.updateModel)({
    modelType: 'courseHomeMeta',
    model: {
      id: courseId,
      celebrations: _objectSpread(_objectSpread({}, celebrations), {}, {
        firstSection: false
      })
    }
  }));

  // Tell our analytics
  const {
    administrator
  } = (0, _auth.getAuthenticatedUser)();
  (0, _analytics.sendTrackEvent)('edx.ui.lms.celebration.first_section.opened', {
    org_key: org,
    courserun_key: courseId,
    course_id: courseId,
    // should only be courserun_key, but left as-is for historical reasons
    is_staff: administrator
  });
}
function recordWeeklyGoalCelebration(org, courseId) {
  // Tell the LMS
  (0, _api.postCelebrationComplete)(courseId, {
    weekly_goal: false
  });

  // Tell our analytics
  const {
    administrator
  } = (0, _auth.getAuthenticatedUser)();
  (0, _analytics.sendTrackEvent)('edx.ui.lms.celebration.weekly_goal.opened', {
    org_key: org,
    courserun_key: courseId,
    is_staff: administrator
  });
}

// Looks at local storage to see whether we just came from the end of a section.
// Note! This does have side effects (will clear some local storage and may start an api call).
function shouldCelebrateOnSectionLoad(courseId, sequenceId, celebrateFirstSection, dispatch, celebrations) {
  const celebrationIds = (0, _localStorage.getLocalStorage)(CELEBRATION_LOCAL_STORAGE_KEY);
  if (!celebrationIds) {
    return false;
  }
  const {
    prevSequenceId,
    nextSequenceId
  } = celebrationIds;
  const onTargetSequence = sequenceId === nextSequenceId;
  let shouldCelebrate = onTargetSequence && celebrateFirstSection;
  if (shouldCelebrate && celebrations.streakLengthToCelebrate) {
    // We don't want two modals to show up on the same page.
    // If we are going to celebrate a streak then we will not also celebrate the first section.
    // We will still mark the first section as celebrated, so that we don't incorrectly celebrate the second section.
    shouldCelebrate = false;
    (0, _api.postCelebrationComplete)(courseId, {
      first_section: false
    });
  }
  if (sequenceId !== prevSequenceId && !onTargetSequence) {
    // Don't clear until we move off of current/prev sequence
    (0, _localStorage.clearLocalStorage)(CELEBRATION_LOCAL_STORAGE_KEY);

    // Update our local copy of course data from LMS
    dispatch((0, _modelStore.updateModel)({
      modelType: 'courseHomeMeta',
      model: {
        id: courseId,
        celebrations: _objectSpread(_objectSpread({}, celebrations), {}, {
          firstSection: false
        })
      }
    }));
  }
  return shouldCelebrate;
}
//# sourceMappingURL=utils.js.map