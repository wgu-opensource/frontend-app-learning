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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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