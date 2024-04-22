"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deprecatedSaveCourseGoal = deprecatedSaveCourseGoal;
exports.dismissWelcomeMessage = dismissWelcomeMessage;
exports.fetchDatesTab = fetchDatesTab;
exports.fetchDiscussionTab = fetchDiscussionTab;
exports.fetchLiveTab = fetchLiveTab;
exports.fetchOutlineTab = fetchOutlineTab;
exports.fetchProgressTab = fetchProgressTab;
exports.fetchTab = fetchTab;
exports.processEvent = processEvent;
exports.requestCert = requestCert;
exports.resetDeadlines = resetDeadlines;
exports.saveWeeklyLearningGoal = saveWeeklyLearningGoal;
var _logging = require("@edx/frontend-platform/logging");
var _frontendPlatform = require("@edx/frontend-platform");
var _api = require("./api");
var _modelStore = require("../../generic/model-store");
var _slice = require("./slice");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const eventTypes = {
  POST_EVENT: 'post_event'
};
function fetchTab(courseId, tab, getTabData, targetUserId) {
  return async dispatch => {
    dispatch((0, _slice.fetchTabRequest)({
      courseId
    }));
    try {
      const courseHomeCourseMetadata = await (0, _api.getCourseHomeCourseMetadata)(courseId, 'outline');
      dispatch((0, _modelStore.addModel)({
        modelType: 'courseHomeMeta',
        model: _objectSpread({
          id: courseId
        }, courseHomeCourseMetadata)
      }));
      const tabDataResult = getTabData && (await getTabData(courseId, targetUserId));
      if (tabDataResult) {
        dispatch((0, _modelStore.addModel)({
          modelType: tab,
          model: _objectSpread({
            id: courseId
          }, tabDataResult)
        }));
      }
      // Disable the access-denied path for now - it caused a regression
      if (!courseHomeCourseMetadata.courseAccess.hasAccess) {
        dispatch((0, _slice.fetchTabDenied)({
          courseId
        }));
      } else if (tabDataResult || !getTabData) {
        dispatch((0, _slice.fetchTabSuccess)({
          courseId,
          targetUserId
        }));
      }
    } catch (e) {
      dispatch((0, _slice.fetchTabFailure)({
        courseId
      }));
      (0, _logging.logError)(e);
    }
  };
}
function fetchDatesTab(courseId) {
  return fetchTab(courseId, 'dates', _api.getDatesTabData);
}
function fetchProgressTab(courseId, targetUserId) {
  return fetchTab(courseId, 'progress', _api.getProgressTabData, parseInt(targetUserId, 10) || targetUserId);
}
function fetchOutlineTab(courseId) {
  return fetchTab(courseId, 'outline', _api.getOutlineTabData);
}
function fetchLiveTab(courseId) {
  return fetchTab(courseId, 'live', _api.getLiveTabIframe);
}
function fetchDiscussionTab(courseId) {
  return fetchTab(courseId, 'discussion');
}
function dismissWelcomeMessage(courseId) {
  return async () => (0, _api.postDismissWelcomeMessage)(courseId);
}
function requestCert(courseId) {
  return async () => (0, _api.postRequestCert)(courseId);
}
function resetDeadlines(courseId, model, getTabData) {
  return async dispatch => {
    (0, _api.postCourseDeadlines)(courseId, model).then(response => {
      const {
        data
      } = response;
      const {
        header,
        link,
        link_text: linkText
      } = data;
      dispatch(getTabData(courseId));
      dispatch((0, _slice.setCallToActionToast)({
        header,
        link,
        linkText
      }));
    });
  };
}
async function deprecatedSaveCourseGoal(courseId, goalKey) {
  return (0, _api.deprecatedPostCourseGoals)(courseId, goalKey);
}
async function saveWeeklyLearningGoal(courseId, daysPerWeek, subscribedToReminders) {
  return (0, _api.postWeeklyLearningGoal)(courseId, daysPerWeek, subscribedToReminders);
}
function processEvent(eventData, getTabData) {
  return async dispatch => {
    // Pulling this out early so the data doesn't get camelCased and is easier
    // to use when it's passed to the backend
    const {
      research_event_data: researchEventData
    } = eventData;
    const event = (0, _frontendPlatform.camelCaseObject)(eventData);
    if (event.eventName === eventTypes.POST_EVENT) {
      (0, _api.executePostFromPostEvent)(event.postData, researchEventData).then(response => {
        const {
          data
        } = response;
        const {
          header,
          link,
          link_text: linkText
        } = data;
        dispatch(getTabData(event.postData.bodyParams.courseId));
        dispatch((0, _slice.setCallToActionToast)({
          header,
          link,
          linkText
        }));
      });
    }
  };
}
//# sourceMappingURL=thunks.js.map