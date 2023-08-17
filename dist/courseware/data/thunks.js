"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkBlockCompletion = checkBlockCompletion;
exports.fetchCourse = fetchCourse;
exports.fetchSequence = fetchSequence;
exports.getCourseDiscussionTopics = getCourseDiscussionTopics;
exports.saveIntegritySignature = saveIntegritySignature;
exports.saveSequencePosition = saveSequencePosition;

var _logging = require("@edx/frontend-platform/logging");

var _api = require("../../course-home/data/api");

var _modelStore = require("../../generic/model-store");

var _api2 = require("./api");

var _slice = require("./slice");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function fetchCourse(courseId) {
  return async dispatch => {
    dispatch((0, _slice.fetchCourseRequest)({
      courseId
    }));
    Promise.allSettled([(0, _api2.getCourseMetadata)(courseId), (0, _api2.getLearningSequencesOutline)(courseId), (0, _api.getCourseHomeCourseMetadata)(courseId, 'courseware')]).then(_ref => {
      let [courseMetadataResult, learningSequencesOutlineResult, courseHomeMetadataResult] = _ref;

      if (courseMetadataResult.status === 'fulfilled') {
        dispatch((0, _modelStore.addModel)({
          modelType: 'coursewareMeta',
          model: courseMetadataResult.value
        }));
      }

      if (courseHomeMetadataResult.status === 'fulfilled') {
        dispatch((0, _modelStore.addModel)({
          modelType: 'courseHomeMeta',
          model: _objectSpread({
            id: courseId
          }, courseHomeMetadataResult.value)
        }));
      }

      if (learningSequencesOutlineResult.status === 'fulfilled') {
        const {
          courses,
          sections,
          sequences
        } = learningSequencesOutlineResult.value; // This updates the course with a sectionIds array from the Learning Sequence data.

        dispatch((0, _modelStore.updateModelsMap)({
          modelType: 'coursewareMeta',
          modelsMap: courses
        }));
        dispatch((0, _modelStore.addModelsMap)({
          modelType: 'sections',
          modelsMap: sections
        })); // We update for sequences because the sequence metadata may have come back first.

        dispatch((0, _modelStore.updateModelsMap)({
          modelType: 'sequences',
          modelsMap: sequences
        }));
      }

      const fetchedMetadata = courseMetadataResult.status === 'fulfilled';
      const fetchedCourseHomeMetadata = courseHomeMetadataResult.status === 'fulfilled';
      const fetchedOutline = learningSequencesOutlineResult.status === 'fulfilled'; // Log errors for each request if needed. Outline failures may occur
      // even if the course metadata request is successful

      if (!fetchedOutline) {
        const {
          response
        } = learningSequencesOutlineResult.reason;

        if (response && response.status === 403) {
          // 403 responses are normal - they happen when the learner is logged out.
          // We'll redirect them in a moment to the outline tab by calling fetchCourseDenied() below.
          (0, _logging.logInfo)(learningSequencesOutlineResult.reason);
        } else {
          (0, _logging.logError)(learningSequencesOutlineResult.reason);
        }
      }

      if (!fetchedMetadata) {
        (0, _logging.logError)(courseMetadataResult.reason);
      }

      if (!fetchedCourseHomeMetadata) {
        (0, _logging.logError)(courseHomeMetadataResult.reason);
      }

      if (fetchedMetadata && fetchedCourseHomeMetadata) {
        if (courseHomeMetadataResult.value.courseAccess.hasAccess && fetchedOutline) {
          // User has access
          dispatch((0, _slice.fetchCourseSuccess)({
            courseId
          }));
          return;
        } // User either doesn't have access or only has partial access
        // (can't access course blocks)


        dispatch((0, _slice.fetchCourseDenied)({
          courseId
        }));
        return;
      } // Definitely an error happening


      dispatch((0, _slice.fetchCourseFailure)({
        courseId
      }));
    });
  };
}

function fetchSequence(sequenceId) {
  return async dispatch => {
    dispatch((0, _slice.fetchSequenceRequest)({
      sequenceId
    }));

    try {
      const {
        sequence,
        units
      } = await (0, _api2.getSequenceMetadata)(sequenceId);

      if (sequence.blockType !== 'sequential') {
        // Some other block types (particularly 'chapter') can be returned
        // by this API. We want to error in that case, since downstream
        // courseware code is written to render Sequences of Units.
        (0, _logging.logError)(`Requested sequence '${sequenceId}' ` + `has block type '${sequence.blockType}'; expected block type 'sequential'.`);
        dispatch((0, _slice.fetchSequenceFailure)({
          sequenceId
        }));
      } else {
        dispatch((0, _modelStore.updateModel)({
          modelType: 'sequences',
          model: sequence
        }));
        dispatch((0, _modelStore.updateModels)({
          modelType: 'units',
          models: units
        }));
        dispatch((0, _slice.fetchSequenceSuccess)({
          sequenceId
        }));
      }
    } catch (error) {
      // Some errors are expected - for example, CoursewareContainer may request sequence metadata for a unit and rely
      // on the request failing to notice that it actually does have a unit (mostly so it doesn't have to know anything
      // about the opaque key structure). In such cases, the backend gives us a 422.
      const sequenceMightBeUnit = error?.response?.status === 422;

      if (!sequenceMightBeUnit) {
        (0, _logging.logError)(error);
      }

      dispatch((0, _slice.fetchSequenceFailure)({
        sequenceId,
        sequenceMightBeUnit
      }));
    }
  };
}

function checkBlockCompletion(courseId, sequenceId, unitId) {
  return async (dispatch, getState) => {
    const {
      models
    } = getState();

    if (models.units[unitId].complete) {
      return {}; // do nothing. Things don't get uncompleted after they are completed.
    }

    try {
      const isComplete = await (0, _api2.getBlockCompletion)(courseId, sequenceId, unitId);
      dispatch((0, _modelStore.updateModel)({
        modelType: 'units',
        model: {
          id: unitId,
          complete: isComplete
        }
      }));
      return isComplete;
    } catch (error) {
      (0, _logging.logError)(error);
    }

    return {};
  };
}

function saveSequencePosition(courseId, sequenceId, activeUnitIndex) {
  return async (dispatch, getState) => {
    const {
      models
    } = getState();
    const initialActiveUnitIndex = models.sequences[sequenceId].activeUnitIndex; // Optimistically update the position.

    dispatch((0, _modelStore.updateModel)({
      modelType: 'sequences',
      model: {
        id: sequenceId,
        activeUnitIndex
      }
    }));

    try {
      await (0, _api2.postSequencePosition)(courseId, sequenceId, activeUnitIndex); // Update again under the assumption that the above call succeeded, since it doesn't return a
      // meaningful response.

      dispatch((0, _modelStore.updateModel)({
        modelType: 'sequences',
        model: {
          id: sequenceId,
          activeUnitIndex
        }
      }));
    } catch (error) {
      (0, _logging.logError)(error);
      dispatch((0, _modelStore.updateModel)({
        modelType: 'sequences',
        model: {
          id: sequenceId,
          activeUnitIndex: initialActiveUnitIndex
        }
      }));
    }
  };
}

function saveIntegritySignature(courseId, isMasquerading) {
  return async dispatch => {
    try {
      // If the request is made by a staff user masquerading as a specific learner,
      // don't actually create a signature for them on the backend,
      // only the modal dialog will be dismissed
      if (!isMasquerading) {
        await (0, _api2.postIntegritySignature)(courseId);
      }

      dispatch((0, _modelStore.updateModel)({
        modelType: 'coursewareMeta',
        model: {
          id: courseId,
          userNeedsIntegritySignature: false
        }
      }));
    } catch (error) {
      (0, _logging.logError)(error);
    }
  };
}

function getCourseDiscussionTopics(courseId) {
  return async dispatch => {
    try {
      const config = await (0, _api2.getCourseDiscussionConfig)(courseId); // Only load topics for the openedx provider, the legacy provider uses
      // the xblock

      if (config.provider === 'openedx') {
        const topics = await (0, _api2.getCourseTopics)(courseId);
        dispatch((0, _modelStore.updateModels)({
          modelType: 'discussionTopics',
          models: topics,
          idField: 'usageKey'
        }));
      }
    } catch (error) {
      (0, _logging.logError)(error);
    }
  };
}
//# sourceMappingURL=thunks.js.map