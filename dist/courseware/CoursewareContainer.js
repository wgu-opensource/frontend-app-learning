"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.checkUnitToSequenceUnitRedirect = exports.checkSequenceUnitMarkerToSequenceUnitRedirect = exports.checkSequenceToSequenceUnitRedirect = exports.checkSectionUnitToUnitRedirect = exports.checkSectionToSequenceRedirect = exports.checkResumeRedirect = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _toolkit = require("@reduxjs/toolkit");
var _reselect = require("reselect");
var _data = require("./data");
var _tabPage = require("../tab-page");
var _course = _interopRequireDefault(require("./course"));
var _celebration = require("./course/celebration");
var _utils = _interopRequireDefault(require("./utils"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Look at where this is called in componentDidUpdate for more info about its usage
const checkResumeRedirect = exports.checkResumeRedirect = (0, _reselect.defaultMemoize)((courseStatus, courseId, sequenceId, firstSequenceId, navigate, isPreview) => {
  if (courseStatus === 'loaded' && !sequenceId) {
    // Note that getResumeBlock is just an API call, not a redux thunk.
    (0, _data.getResumeBlock)(courseId).then(data => {
      // This is a replace because we don't want this change saved in the browser's history.
      if (data.sectionId && data.unitId) {
        const baseUrl = `/course/${courseId}/${data.sectionId}`;
        const sequenceUrl = isPreview ? `/preview${baseUrl}` : baseUrl;
        navigate(`${sequenceUrl}/${data.unitId}`, {
          replace: true
        });
      } else if (firstSequenceId) {
        navigate(`/course/${courseId}/${firstSequenceId}`, {
          replace: true
        });
      }
    }, () => {});
  }
});

// Look at where this is called in componentDidUpdate for more info about its usage
const checkSectionUnitToUnitRedirect = exports.checkSectionUnitToUnitRedirect = (0, _reselect.defaultMemoize)((courseStatus, courseId, sequenceStatus, section, unitId, navigate, isPreview) => {
  if (courseStatus === 'loaded' && sequenceStatus === 'failed' && section && unitId) {
    const baseUrl = `/course/${courseId}`;
    const courseUrl = isPreview ? `/preview${baseUrl}` : baseUrl;
    navigate(`${courseUrl}/${unitId}`, {
      replace: true
    });
  }
});

// Look at where this is called in componentDidUpdate for more info about its usage
const checkSectionToSequenceRedirect = exports.checkSectionToSequenceRedirect = (0, _reselect.defaultMemoize)((courseStatus, courseId, sequenceStatus, section, unitId, navigate) => {
  if (courseStatus === 'loaded' && sequenceStatus === 'failed' && section && !unitId) {
    // If the section is non-empty, redirect to its first sequence.
    if (section.sequenceIds && section.sequenceIds[0]) {
      navigate(`/course/${courseId}/${section.sequenceIds[0]}`, {
        replace: true
      });
      // Otherwise, just go to the course root, letting the resume redirect take care of things.
    } else {
      navigate(`/course/${courseId}`, {
        replace: true
      });
    }
  }
});

// Look at where this is called in componentDidUpdate for more info about its usage
const checkUnitToSequenceUnitRedirect = exports.checkUnitToSequenceUnitRedirect = (0, _reselect.defaultMemoize)((courseStatus, courseId, sequenceStatus, sequenceMightBeUnit, sequenceId, section, routeUnitId, navigate, isPreview) => {
  if (courseStatus === 'loaded' && sequenceStatus === 'failed' && !section && !routeUnitId) {
    if (sequenceMightBeUnit) {
      // If the sequence failed to load as a sequence, but it is marked as a possible unit, then
      // we need to look up the correct parent sequence for it, and redirect there.
      const unitId = sequenceId; // just for clarity during the rest of this method
      (0, _data.getSequenceForUnitDeprecated)(courseId, unitId).then(parentId => {
        if (parentId) {
          const baseUrl = `/course/${courseId}/${parentId}`;
          const sequenceUrl = isPreview ? `/preview${baseUrl}` : baseUrl;
          navigate(`${sequenceUrl}/${unitId}`, {
            replace: true
          });
        } else {
          navigate(`/course/${courseId}`, {
            replace: true
          });
        }
      }, () => {
        // error case
        navigate(`/course/${courseId}`, {
          replace: true
        });
      });
    } else {
      // Invalid sequence that isn't a unit either. Redirect up to main course.
      navigate(`/course/${courseId}`, {
        replace: true
      });
    }
  }
});

// Look at where this is called in componentDidUpdate for more info about its usage
const checkSequenceToSequenceUnitRedirect = exports.checkSequenceToSequenceUnitRedirect = (0, _reselect.defaultMemoize)((courseId, sequenceStatus, sequence, unitId, navigate, isPreview) => {
  if (sequenceStatus === 'loaded' && sequence.id && !unitId) {
    if (sequence.unitIds !== undefined && sequence.unitIds.length > 0) {
      const baseUrl = `/course/${courseId}/${sequence.id}`;
      const sequenceUrl = isPreview ? `/preview${baseUrl}` : baseUrl;
      const nextUnitId = sequence.unitIds[sequence.activeUnitIndex];
      // This is a replace because we don't want this change saved in the browser's history.
      navigate(`${sequenceUrl}/${nextUnitId}`, {
        replace: true
      });
    }
  }
});

// Look at where this is called in componentDidUpdate for more info about its usage
const checkSequenceUnitMarkerToSequenceUnitRedirect = exports.checkSequenceUnitMarkerToSequenceUnitRedirect = (0, _reselect.defaultMemoize)((courseId, sequenceStatus, sequence, unitId, navigate, isPreview) => {
  if (sequenceStatus !== 'loaded' || !sequence.id) {
    return;
  }
  const baseUrl = `/course/${courseId}/${sequence.id}`;
  const hasUnits = sequence.unitIds?.length > 0;
  if (hasUnits) {
    const sequenceUrl = isPreview ? `/preview${baseUrl}` : baseUrl;
    if (unitId === 'first') {
      const firstUnitId = sequence.unitIds[0];
      navigate(`${sequenceUrl}/${firstUnitId}`, {
        replace: true
      });
    } else if (unitId === 'last') {
      const lastUnitId = sequence.unitIds[sequence.unitIds.length - 1];
      navigate(`${sequenceUrl}/${lastUnitId}`, {
        replace: true
      });
    }
  } else {
    // No units... go to general sequence page
    navigate(baseUrl, {
      replace: true
    });
  }
});
class CoursewareContainer extends _react.Component {
  constructor(...args) {
    super(...args);
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
        this.props.fetchSequence(sequenceId, this.props.isPreview);
      }
    }));
    _defineProperty(this, "handleUnitNavigationClick", () => {
      const {
        courseId,
        sequenceId,
        routeUnitId
      } = this.props;
      this.props.checkBlockCompletion(courseId, sequenceId, routeUnitId);
    });
    _defineProperty(this, "handleNextSequenceClick", () => {
      const {
        course,
        nextSequence,
        sequence,
        sequenceId
      } = this.props;
      if (nextSequence !== null) {
        const celebrateFirstSection = course && course.celebrations && course.celebrations.firstSection;
        if (celebrateFirstSection && sequence.sectionId !== nextSequence.sectionId) {
          (0, _celebration.handleNextSectionCelebration)(sequenceId, nextSequence.id);
        }
      }
    });
    _defineProperty(this, "handlePreviousSequenceClick", () => {});
  }
  componentDidMount() {
    const {
      routeCourseId,
      routeSequenceId
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
      routeCourseId,
      routeSequenceId,
      routeUnitId,
      navigate,
      isPreview
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
    checkResumeRedirect(courseStatus, courseId, sequenceId, firstSequenceId, navigate, isPreview);

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
    checkSectionUnitToUnitRedirect(courseStatus, courseId, sequenceStatus, sectionViaSequenceId, routeUnitId, navigate, isPreview);

    // Check section to sequence redirect:
    //    /course/:courseId/:sectionId         -> /course/:courseId/:sequenceId
    // by redirecting to the first sequence within the section.
    checkSectionToSequenceRedirect(courseStatus, courseId, sequenceStatus, sectionViaSequenceId, routeUnitId, navigate);

    // Check unit to sequence-unit redirect:
    //    /course/:courseId/:unitId -> /course/:courseId/:sequenceId/:unitId
    // by filling in the ID of the parent sequence of :unitId.
    checkUnitToSequenceUnitRedirect(courseStatus, courseId, sequenceStatus, sequenceMightBeUnit, sequenceId, sectionViaSequenceId, routeUnitId, navigate, isPreview);

    // Check sequence to sequence-unit redirect:
    //    /course/:courseId/:sequenceId -> /course/:courseId/:sequenceId/:unitId
    // by filling in the ID the most-recently-active unit in the sequence, OR
    // the ID of the first unit the sequence if none is active.
    checkSequenceToSequenceUnitRedirect(courseId, sequenceStatus, sequence, routeUnitId, navigate, isPreview);

    // Check sequence-unit marker to sequence-unit redirect:
    //    /course/:courseId/:sequenceId/first -> /course/:courseId/:sequenceId/:unitId
    //    /course/:courseId/:sequenceId/last -> /course/:courseId/:sequenceId/:unitId
    // by filling in the ID the first or last unit in the sequence.
    // "Sequence unit marker" is an invented term used only in this component.
    checkSequenceUnitMarkerToSequenceUnitRedirect(courseId, sequenceStatus, sequence, routeUnitId, navigate, isPreview);
  }
  render() {
    const {
      courseStatus,
      courseId,
      sequenceId,
      routeUnitId
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
  routeCourseId: _propTypes.default.string.isRequired,
  routeSequenceId: _propTypes.default.string,
  routeUnitId: _propTypes.default.string,
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
  fetchSequence: _propTypes.default.func.isRequired,
  navigate: _propTypes.default.func.isRequired,
  isPreview: _propTypes.default.bool.isRequired
};
CoursewareContainer.defaultProps = {
  courseId: null,
  sequenceId: null,
  routeSequenceId: null,
  routeUnitId: null,
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
var _default = exports.default = (0, _reactRedux.connect)(mapStateToProps, {
  checkBlockCompletion: _data.checkBlockCompletion,
  saveSequencePosition: _data.saveSequencePosition,
  fetchCourse: _data.fetchCourse,
  fetchSequence: _data.fetchSequence
})((0, _utils.default)(CoursewareContainer));
//# sourceMappingURL=CoursewareContainer.js.map