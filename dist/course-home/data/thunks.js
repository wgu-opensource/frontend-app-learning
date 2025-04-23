"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deprecatedSaveCourseGoal = deprecatedSaveCourseGoal;
exports.dismissWelcomeMessage = dismissWelcomeMessage;
exports.fetchCoursewareSearchSettings = fetchCoursewareSearchSettings;
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
exports.searchCourseContent = searchCourseContent;
var _logging = require("@edx/frontend-platform/logging");
var _frontendPlatform = require("@edx/frontend-platform");
var _api = require("./api");
var _modelStore = require("../../generic/model-store");
var _slice = require("./slice");
var _mapSearchResponse = _interopRequireDefault(require("../courseware-search/map-search-response"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const eventTypes = {
  POST_EVENT: 'post_event'
};
function fetchTab(courseId, tab, getTabData, targetUserId) {
  return async dispatch => {
    dispatch((0, _slice.fetchTabRequest)({
      courseId
    }));
    try {
      const promisesToFulfill = [(0, _api.getCourseHomeCourseMetadata)(courseId, 'outline')];
      if (getTabData) {
        promisesToFulfill.push(getTabData(courseId, targetUserId));
      }
      const [courseHomeCourseMetadataResult, tabDataResult] = await Promise.allSettled(promisesToFulfill);
      if (courseHomeCourseMetadataResult.status === 'fulfilled') {
        dispatch((0, _modelStore.addModel)({
          modelType: 'courseHomeMeta',
          model: _objectSpread({
            id: courseId
          }, courseHomeCourseMetadataResult.value)
        }));
      }
      if (tabDataResult?.status === 'fulfilled') {
        dispatch((0, _modelStore.addModel)({
          modelType: tab,
          model: _objectSpread({
            id: courseId
          }, tabDataResult.value)
        }));
      }
      if (courseHomeCourseMetadataResult.status === 'rejected') {
        throw courseHomeCourseMetadataResult.reason;
      } else if (!courseHomeCourseMetadataResult.value.courseAccess.hasAccess) {
        // If the learner does not have access to the course, short cut to dispatch to a denied response regardless of
        // the tabDataResult.
        dispatch((0, _slice.fetchTabDenied)({
          courseId
        }));
      } else if (tabDataResult?.status === 'rejected') {
        throw tabDataResult.reason;
      } else {
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
async function fetchCoursewareSearchSettings(courseId) {
  try {
    const {
      enabled
    } = await (0, _api.getCoursewareSearchEnabledFlag)(courseId);
    return {
      enabled
    };
  } catch (e) {
    return {
      enabled: false
    };
  }
}
function searchCourseContent(courseId, searchKeyword) {
  return async dispatch => {
    const start = new Date();
    dispatch((0, _modelStore.addModel)({
      modelType: 'contentSearchResults',
      model: {
        id: courseId,
        searchKeyword,
        results: [],
        errors: undefined,
        loading: true
      }
    }));
    let data;
    let curatedResponse;
    let errors;
    try {
      ({
        data
      } = await (0, _api.searchCourseContentFromAPI)(courseId, searchKeyword));
      curatedResponse = (0, _mapSearchResponse.default)(data, searchKeyword);
    } catch (e) {
      // TODO: Remove when publishing to prod. Just temporary for performance debugging.
      // eslint-disable-next-line no-console
      console.error('Error on Courseware Search: ', e.message);
      errors = e.message;
    }
    dispatch((0, _modelStore.updateModel)({
      modelType: 'contentSearchResults',
      model: _objectSpread(_objectSpread({}, curatedResponse), {}, {
        id: courseId,
        searchKeyword,
        errors,
        loading: false
      })
    }));
    const end = new Date();
    const clientMs = end - start;
    const {
      took,
      total,
      maxScore,
      accessDeniedCount
    } = data;

    // TODO: Remove when publishing to prod. Just temporary for performance debugging.
    // eslint-disable-next-line no-console
    console.table({
      'Search Keyword': searchKeyword,
      'Client time (ms)': clientMs,
      'Server time (ms)': took,
      'Total matches': total,
      'Max score': maxScore,
      'Access denied count': accessDeniedCount
    });
  };
}
//# sourceMappingURL=thunks.js.map