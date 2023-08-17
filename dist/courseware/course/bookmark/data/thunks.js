"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addBookmark = addBookmark;
exports.removeBookmark = removeBookmark;

var _logging = require("@edx/frontend-platform/logging");

var _api = require("./api");

var _modelStore = require("../../../../generic/model-store");

function addBookmark(unitId) {
  return async dispatch => {
    // Optimistically update the bookmarked flag.
    dispatch((0, _modelStore.updateModel)({
      modelType: 'units',
      model: {
        id: unitId,
        bookmarked: true,
        bookmarkedUpdateState: 'loading'
      }
    }));

    try {
      await (0, _api.createBookmark)(unitId);
      dispatch((0, _modelStore.updateModel)({
        modelType: 'units',
        model: {
          id: unitId,
          bookmarked: true,
          bookmarkedUpdateState: 'loaded'
        }
      }));
    } catch (error) {
      (0, _logging.logError)(error);
      dispatch((0, _modelStore.updateModel)({
        modelType: 'units',
        model: {
          id: unitId,
          bookmarked: false,
          bookmarkedUpdateState: 'failed'
        }
      }));
    }
  };
}

function removeBookmark(unitId) {
  return async dispatch => {
    // Optimistically update the bookmarked flag.
    dispatch((0, _modelStore.updateModel)({
      modelType: 'units',
      model: {
        id: unitId,
        bookmarked: false,
        bookmarkedUpdateState: 'loading'
      }
    }));

    try {
      await (0, _api.deleteBookmark)(unitId);
      dispatch((0, _modelStore.updateModel)({
        modelType: 'units',
        model: {
          id: unitId,
          bookmarked: false,
          bookmarkedUpdateState: 'loaded'
        }
      }));
    } catch (error) {
      (0, _logging.logError)(error);
      dispatch((0, _modelStore.updateModel)({
        modelType: 'units',
        model: {
          id: unitId,
          bookmarked: true,
          bookmarkedUpdateState: 'failed'
        }
      }));
    }
  };
}
//# sourceMappingURL=thunks.js.map