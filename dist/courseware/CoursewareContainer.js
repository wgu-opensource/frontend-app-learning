"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _frontendPlatform = require("@edx/frontend-platform");
var _toolkit = require("@reduxjs/toolkit");
var _reselect = require("reselect");
var _data = require("./data");
var _tabPage = require("../tab-page");
var _course = _interopRequireDefault(require("./course"));
var _celebration = require("./course/celebration");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // Look at where this is called in componentDidUpdate for more info about its usage
const checkResumeRedirect = (0, _reselect.defaultMemoize)((courseStatus, courseId, sequenceId, firstSequenceId) => {
  if (courseStatus === 'loaded' && !sequenceId) {
    // Note that getResumeBlock is just an API call, not a redux thunk.
    (0, _data.getResumeBlock)(courseId).then(data => {
      // This is a replace because we don't want this change saved in the browser's history.
      if (data.sectionId && data.unitId) {
        _frontendPlatform.history.replace(`/course/${courseId}/${data.sectionId}/${data.unitId}`);
      } else if (firstSequenceId) {
        _frontendPlatform.history.replace(`/course/${courseId}/${firstSequenceId}`);
      }
    });
  }
});

// Look at where this is called in componentDidUpdate for more info about its usage
const checkSectionUnitToUnitRedirect = (0, _reselect.defaultMemoize)((courseStatus, courseId, sequenceStatus, section, unitId) => {
  if (courseStatus === 'loaded' && sequenceStatus === 'failed' && section && unitId) {
    _frontendPlatform.history.replace(`/course/${courseId}/${unitId}`);
  }
});

// Look at where this is called in componentDidUpdate for more info about its usage
const checkSectionToSequenceRedirect = (0, _reselect.defaultMemoize)((courseStatus, courseId, sequenceStatus, section, unitId) => {
  if (courseStatus === 'loaded' && sequenceStatus === 'failed' && section && !unitId) {
    // If the section is non-empty, redirect to its first sequence.
    if (section.sequenceIds && section.sequenceIds[0]) {
      _frontendPlatform.history.replace(`/course/${courseId}/${section.sequenceIds[0]}`);
      // Otherwise, just go to the course root, letting the resume redirect take care of things.
    } else {
      _frontendPlatform.history.replace(`/course/${courseId}`);
    }
  }
});

// Look at where this is called in componentDidUpdate for more info about its usage
const checkUnitToSequenceUnitRedirect = (0, _reselect.defaultMemoize)((courseStatus, courseId, sequenceStatus, sequenceMightBeUnit, sequenceId, section, routeUnitId) => {
  if (courseStatus === 'loaded' && sequenceStatus === 'failed' && !section && !routeUnitId) {
    if (sequenceMightBeUnit) {
      // If the sequence failed to load as a sequence, but it is marked as a possible unit, then
      // we need to look up the correct parent sequence for it, and redirect there.
      const unitId = sequenceId; // just for clarity during the rest of this method
      (0, _data.getSequenceForUnitDeprecated)(courseId, unitId).then(parentId => {
        if (parentId) {
          _frontendPlatform.history.replace(`/course/${courseId}/${parentId}/${unitId}`);
        } else {
          _frontendPlatform.history.replace(`/course/${courseId}`);
        }
      }, () => {
        // error case
        _frontendPlatform.history.replace(`/course/${courseId}`);
      });
    } else {
      // Invalid sequence that isn't a unit either. Redirect up to main course.
      _frontendPlatform.history.replace(`/course/${courseId}`);
    }
  }
});

// Look at where this is called in componentDidUpdate for more info about its usage
const checkSequenceToSequenceUnitRedirect = (0, _reselect.defaultMemoize)((courseId, sequenceStatus, sequence, unitId) => {
  if (sequenceStatus === 'loaded' && sequence.id && !unitId) {
    if (sequence.unitIds !== undefined && sequence.unitIds.length > 0) {
      const nextUnitId = sequence.unitIds[sequence.activeUnitIndex];
      // This is a replace because we don't want this change saved in the browser's history.
      _frontendPlatform.history.replace(`/course/${courseId}/${sequence.id}/${nextUnitId}`);
    }
  }
});

// Look at where this is called in componentDidUpdate for more info about its usage
const checkSequenceUnitMarkerToSequenceUnitRedirect = (0, _reselect.defaultMemoize)((courseId, sequenceStatus, sequence, unitId) => {
  if (sequenceStatus !== 'loaded' || !sequence.id) {
    return;
  }
  const hasUnits = sequence.unitIds?.length > 0;
  if (unitId === 'first') {
    if (hasUnits) {
      const firstUnitId = sequence.unitIds[0];
      _frontendPlatform.history.replace(`/course/${courseId}/${sequence.id}/${firstUnitId}`);
    } else {
      // No units... go to general sequence page
      _frontendPlatform.history.replace(`/course/${courseId}/${sequence.id}`);
    }
  } else if (unitId === 'last') {
    if (hasUnits) {
      const lastUnitId = sequence.unitIds[sequence.unitIds.length - 1];
      _frontendPlatform.history.replace(`/course/${courseId}/${sequence.id}/${lastUnitId}`);
    } else {
      // No units... go to general sequence page
      _frontendPlatform.history.replace(`/course/${courseId}/${sequence.id}`);
    }
  }
});
class CoursewareContainer extends _react.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "checkSaveSequencePosition", (0, _reselect.defaultMemoize)(unitId => {
      const {
        courseId,
        sequenceId,
        sequenceStatus,
        sequence
      } = this.props;
      if (sequenceStatus === 'loaded' && sequence.saveUnitPosition && unitId) {
        const activeUnitIndex = sequence.unitIds.indexOf(unitId);
        this.props.saveSequencePosition(courseId, sequenceId, activeUnitIndex);
      }
    }));
    _defineProperty(this, "checkFetchCourse", (0, _reselect.defaultMemoize)(courseId => {
      this.props.fetchCourse(courseId);
    }));
    _defineProperty(this, "checkFetchSequence", (0, _reselect.defaultMemoize)(sequenceId => {
      if (sequenceId) {
        this.props.fetchSequence(sequenceId);
      }
    }));
    _defineProperty(this, "handleUnitNavigationClick", nextUnitId => {
      const {
        courseId,
        sequenceId,
        match: {
          params: {
            unitId: routeUnitId
          }
        }
      } = this.props;
      this.props.checkBlockCompletion(courseId, sequenceId, routeUnitId);
      _frontendPlatform.history.push(`/course/${courseId}/${sequenceId}/${nextUnitId}`);
    });
    _defineProperty(this, "handleNextSequenceClick", () => {
      const {
        course,
        courseId,
        nextSequence,
        sequence,
        sequenceId
      } = this.props;
      if (nextSequence !== null) {
        _frontendPlatform.history.push(`/course/${courseId}/${nextSequence.id}/first`);
        const celebrateFirstSection = course && course.celebrations && course.celebrations.firstSection;
        if (celebrateFirstSection && sequence.sectionId !== nextSequence.sectionId) {
          (0, _celebration.handleNextSectionCelebration)(sequenceId, nextSequence.id);
        }
      }
    });
    _defineProperty(this, "handlePreviousSequenceClick", () => {
      const {
        previousSequence,
        courseId
      } = this.props;
      if (previousSequence !== null) {
        _frontendPlatform.history.push(`/course/${courseId}/${previousSequence.id}/last`);
      }
    });
  }
  componentDidMount() {
    const {
      match: {
        params: {
          courseId: routeCourseId,
          sequenceId: routeSequenceId
        }
      }
    } = this.props;
    // Load data whenever the course or sequence ID changes.
    this.checkFetchCourse(routeCourseId);
    this.checkFetchSequence(routeSequenceId);
  }
  componentDidUpdate() {
    const {
      courseId,
      sequenceId,
      courseStatus,
      sequenceStatus,
      sequenceMightBeUnit,
      sequence,
      firstSequenceId,
      sectionViaSequenceId,
      match: {
        params: {
          courseId: routeCourseId,
          sequenceId: routeSequenceId,
          unitId: routeUnitId
        }
      }
    } = this.props;

    // Load data whenever the course or sequence ID changes.
    this.checkFetchCourse(routeCourseId);
    this.checkFetchSequence(routeSequenceId);

    // Check if we should save our sequence position.  Only do this when the route unit ID changes.
    this.checkSaveSequencePosition(routeUnitId);

    // Coerce the route ids into null here because they can be undefined, but the redux ids would be null instead.
    if (courseId !== (routeCourseId || null) || sequenceId !== (routeSequenceId || null)) {
      // The non-route ids are pulled from redux state - they are changed at the same time as the status variables.
      // But the route ids are pulled directly from the route. So if the route changes, and we start a fetch above,
      // there's a race condition where the route ids are for one course, but the status and the other ids are for a
      // different course. Since all the logic below depends on the status variables and the route unit id, we'll wait
      // until the ids match and thus the redux states got updated. So just bail for now.
      return;
    }

    // All courseware URLs should normalize to the format /course/:courseId/:sequenceId/:unitId
    // via the series of redirection rules below.
    // See docs/decisions/0008-liberal-courseware-path-handling.md for more context.
    // (It would be ideal to move this logic into the thunks layer and perform
    //  all URL-changing checks at once. See TNL-8182.)

    // Check resume redirect:
    //   /course/:courseId -> /course/:courseId/:sequenceId/:unitId
    // based on sequence/unit where user was last active.
    checkResumeRedirect(courseStatus, courseId, sequenceId, firstSequenceId);

    // Check section-unit to unit redirect:
    //    /course/:courseId/:sectionId/:unitId -> /course/:courseId/:unitId
    // by simply ignoring the :sectionId.
    // (It may be desirable at some point to be smarter here; for example, we could replace
    //  :sectionId with the parent sequence of :unitId and/or check whether the :unitId
    //  is actually within :sectionId. However, the way our Redux store is currently factored,
    //  the unit's metadata is not available to us if the section isn't loadable.)
    // Before performing this redirect, we *do* still check that a section is loadable;
    // otherwise, we could get stuck in a redirect loop, since a sequence that failed to load
    // would endlessly redirect to itself through `checkSectionUnitToUnitRedirect`
    // and `checkUnitToSequenceUnitRedirect`.
    checkSectionUnitToUnitRedirect(courseStatus, courseId, sequenceStatus, sectionViaSequenceId, routeUnitId);

    // Check section to sequence redirect:
    //    /course/:courseId/:sectionId         -> /course/:courseId/:sequenceId
    // by redirecting to the first sequence within the section.
    checkSectionToSequenceRedirect(courseStatus, courseId, sequenceStatus, sectionViaSequenceId, routeUnitId);

    // Check unit to sequence-unit redirect:
    //    /course/:courseId/:unitId -> /course/:courseId/:sequenceId/:unitId
    // by filling in the ID of the parent sequence of :unitId.
    checkUnitToSequenceUnitRedirect((courseStatus, courseId, sequenceStatus, sequenceMightBeUnit, sequenceId, sectionViaSequenceId, routeUnitId));

    // Check sequence to sequence-unit redirect:
    //    /course/:courseId/:sequenceId -> /course/:courseId/:sequenceId/:unitId
    // by filling in the ID the most-recently-active unit in the sequence, OR
    // the ID of the first unit the sequence if none is active.
    checkSequenceToSequenceUnitRedirect(courseId, sequenceStatus, sequence, routeUnitId);

    // Check sequence-unit marker to sequence-unit redirect:
    //    /course/:courseId/:sequenceId/first -> /course/:courseId/:sequenceId/:unitId
    //    /course/:courseId/:sequenceId/last -> /course/:courseId/:sequenceId/:unitId
    // by filling in the ID the first or last unit in the sequence.
    // "Sequence unit marker" is an invented term used only in this component.
    checkSequenceUnitMarkerToSequenceUnitRedirect(courseId, sequenceStatus, sequence, routeUnitId);
  }
  render() {
    const {
      courseStatus,
      courseId,
      sequenceId,
      match: {
        params: {
          unitId: routeUnitId
        }
      }
    } = this.props;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_tabPage.TabPage, {
      activeTabSlug: "courseware",
      courseId: courseId,
      unitId: routeUnitId,
      courseStatus: courseStatus,
      metadataModel: "coursewareMeta",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_course.default, {
        courseId: courseId,
        sequenceId: sequenceId,
        unitId: routeUnitId,
        nextSequenceHandler: this.handleNextSequenceClick,
        previousSequenceHandler: this.handlePreviousSequenceClick,
        unitNavigationHandler: this.handleUnitNavigationClick
      })
    });
  }
}
const sequenceShape = _propTypes.default.shape({
  id: _propTypes.default.string.isRequired,
  unitIds: _propTypes.default.arrayOf(_propTypes.default.string),
  sectionId: _propTypes.default.string.isRequired,
  saveUnitPosition: _propTypes.default.any // eslint-disable-line
});

const sectionShape = _propTypes.default.shape({
  id: _propTypes.default.string.isRequired,
  sequenceIds: _propTypes.default.arrayOf(_propTypes.default.string).isRequired
});
const courseShape = _propTypes.default.shape({
  celebrations: _propTypes.default.shape({
    firstSection: _propTypes.default.bool
  })
});
CoursewareContainer.propTypes = {
  match: _propTypes.default.shape({
    params: _propTypes.default.shape({
      courseId: _propTypes.default.string.isRequired,
      sequenceId: _propTypes.default.string,
      unitId: _propTypes.default.string
    }).isRequired
  }).isRequired,
  courseId: _propTypes.default.string,
  sequenceId: _propTypes.default.string,
  firstSequenceId: _propTypes.default.string,
  courseStatus: _propTypes.default.oneOf(['loaded', 'loading', 'failed', 'denied']).isRequired,
  sequenceStatus: _propTypes.default.oneOf(['loaded', 'loading', 'failed']).isRequired,
  sequenceMightBeUnit: _propTypes.default.bool.isRequired,
  nextSequence: sequenceShape,
  previousSequence: sequenceShape,
  sectionViaSequenceId: sectionShape,
  course: courseShape,
  sequence: sequenceShape,
  saveSequencePosition: _propTypes.default.func.isRequired,
  checkBlockCompletion: _propTypes.default.func.isRequired,
  fetchCourse: _propTypes.default.func.isRequired,
  fetchSequence: _propTypes.default.func.isRequired
};
CoursewareContainer.defaultProps = {
  courseId: null,
  sequenceId: null,
  firstSequenceId: null,
  nextSequence: null,
  previousSequence: null,
  sectionViaSequenceId: null,
  course: null,
  sequence: null
};
const currentCourseSelector = (0, _toolkit.createSelector)(state => state.models.coursewareMeta || {}, state => state.courseware.courseId, (coursesById, courseId) => coursesById[courseId] ? coursesById[courseId] : null);
const currentSequenceSelector = (0, _toolkit.createSelector)(state => state.models.sequences || {}, state => state.courseware.sequenceId, (sequencesById, sequenceId) => sequencesById[sequenceId] ? sequencesById[sequenceId] : null);
const sequenceIdsSelector = (0, _toolkit.createSelector)(state => state.courseware.courseStatus, currentCourseSelector, state => state.models.sections, (courseStatus, course, sectionsById) => {
  if (courseStatus !== 'loaded') {
    return [];
  }
  const {
    sectionIds = []
  } = course;
  return sectionIds.flatMap(sectionId => sectionsById[sectionId].sequenceIds);
});
const previousSequenceSelector = (0, _toolkit.createSelector)(sequenceIdsSelector, state => state.models.sequences || {}, state => state.courseware.sequenceId, (sequenceIds, sequencesById, sequenceId) => {
  if (!sequenceId || sequenceIds.length === 0) {
    return null;
  }
  const sequenceIndex = sequenceIds.indexOf(sequenceId);
  const previousSequenceId = sequenceIndex > 0 ? sequenceIds[sequenceIndex - 1] : null;
  return previousSequenceId !== null ? sequencesById[previousSequenceId] : null;
});
const nextSequenceSelector = (0, _toolkit.createSelector)(sequenceIdsSelector, state => state.models.sequences || {}, state => state.courseware.sequenceId, (sequenceIds, sequencesById, sequenceId) => {
  if (!sequenceId || sequenceIds.length === 0) {
    return null;
  }
  const sequenceIndex = sequenceIds.indexOf(sequenceId);
  const nextSequenceId = sequenceIndex < sequenceIds.length - 1 ? sequenceIds[sequenceIndex + 1] : null;
  return nextSequenceId !== null ? sequencesById[nextSequenceId] : null;
});
const firstSequenceIdSelector = (0, _toolkit.createSelector)(state => state.courseware.courseStatus, currentCourseSelector, state => state.models.sections || {}, (courseStatus, course, sectionsById) => {
  if (courseStatus !== 'loaded') {
    return null;
  }
  const {
    sectionIds = []
  } = course;
  if (sectionIds.length === 0) {
    return null;
  }
  return sectionsById[sectionIds[0]].sequenceIds[0];
});
const sectionViaSequenceIdSelector = (0, _toolkit.createSelector)(state => state.models.sections || {}, state => state.courseware.sequenceId, (sectionsById, sequenceId) => sectionsById[sequenceId] ? sectionsById[sequenceId] : null);
const mapStateToProps = state => {
  const {
    courseId,
    sequenceId,
    courseStatus,
    sequenceStatus,
    sequenceMightBeUnit
  } = state.courseware;
  return {
    courseId,
    sequenceId,
    courseStatus,
    sequenceStatus,
    sequenceMightBeUnit,
    course: currentCourseSelector(state),
    sequence: currentSequenceSelector(state),
    previousSequence: previousSequenceSelector(state),
    nextSequence: nextSequenceSelector(state),
    firstSequenceId: firstSequenceIdSelector(state),
    sectionViaSequenceId: sectionViaSequenceIdSelector(state)
  };
};
var _default = (0, _reactRedux.connect)(mapStateToProps, {
  checkBlockCompletion: _data.checkBlockCompletion,
  saveSequencePosition: _data.saveSequencePosition,
  fetchCourse: _data.fetchCourse,
  fetchSequence: _data.fetchSequence
})(CoursewareContainer);
exports.default = _default;
//# sourceMappingURL=CoursewareContainer.js.map