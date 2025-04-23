"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initializeStore;
var _frontendLibLearningAssistant = require("@edx/frontend-lib-learning-assistant");
var _frontendLibSpecialExams = require("@edx/frontend-lib-special-exams");
var _toolkit = require("@reduxjs/toolkit");
var _data = require("./course-home/data");
var _slice = require("./courseware/data/slice");
var _slice2 = require("./courseware/course/course-exit/data/slice");
var _data2 = require("./product-tours/data");
var _modelStore = require("./generic/model-store");
var _pluginStore = require("./generic/plugin-store");
function initializeStore() {
  return (0, _toolkit.configureStore)({
    reducer: {
      models: _modelStore.reducer,
      courseware: _slice.reducer,
      courseHome: _data.reducer,
      learningAssistant: _frontendLibLearningAssistant.reducer,
      specialExams: _frontendLibSpecialExams.reducer,
      recommendations: _slice2.reducer,
      tours: _data2.reducer,
      plugins: _pluginStore.reducer
    },
    // temporarily solutions to disable serializable check for plugin actions
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['plugin/registerOverrideMethod'],
        ignoredPaths: ['plugins']
      }
    })
  });
}
//# sourceMappingURL=store.js.map