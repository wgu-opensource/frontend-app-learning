"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _analytics = require("@edx/frontend-platform/analytics");

var _auth = require("@edx/frontend-platform/auth");

var _paragon = require("@edx/paragon");

var _AbandonTour = _interopRequireDefault(require("./AbandonTour"));

var _CoursewareTour = _interopRequireDefault(require("./CoursewareTour"));

var _ExistingUserCourseHomeTour = _interopRequireDefault(require("./ExistingUserCourseHomeTour"));

var _NewUserCourseHomeTour = _interopRequireDefault(require("./newUserCourseHomeTour/NewUserCourseHomeTour"));

var _NewUserCourseHomeTourModal = _interopRequireDefault(require("./newUserCourseHomeTour/NewUserCourseHomeTourModal"));

var _data = require("./data");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ProductTours(_ref) {
  let {
    activeTab,
    courseId,
    isStreakCelebrationOpen,
    org
  } = _ref;

  if (isStreakCelebrationOpen) {
    return null;
  }

  const {
    proctoringPanelStatus
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    showCoursewareTour,
    showExistingUserCourseHomeTour,
    showNewUserCourseHomeModal,
    showNewUserCourseHomeTour
  } = (0, _reactRedux.useSelector)(state => state.tours);
  const [isAbandonTourEnabled, setIsAbandonTourEnabled] = (0, _react.useState)(false);
  const [isCoursewareTourEnabled, setIsCoursewareTourEnabled] = (0, _react.useState)(false);
  const [isExistingUserCourseHomeTourEnabled, setIsExistingUserCourseHomeTourEnabled] = (0, _react.useState)(false);
  const [isNewUserCourseHomeTourEnabled, setIsNewUserCourseHomeTourEnabled] = (0, _react.useState)(false);
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    administrator,
    username
  } = (0, _auth.getAuthenticatedUser)() || {};
  const isCoursewareTab = activeTab === 'courseware';
  const isOutlineTab = activeTab === 'outline';
  (0, _react.useEffect)(() => {
    const isOutlineTabResolved = isOutlineTab && proctoringPanelStatus === 'loaded';
    const userIsAuthenticated = !!username; // Tours currently only exist on the Outline Tab and within Courseware, so we'll avoid
    // calling the tour endpoint unnecessarily.

    if (userIsAuthenticated && (isCoursewareTab || isOutlineTabResolved)) {
      dispatch((0, _data.fetchTourData)(username));
    }
  }, [proctoringPanelStatus]);
  (0, _react.useEffect)(() => {
    if (isCoursewareTab && showCoursewareTour) {
      setIsCoursewareTourEnabled(true);
    }
  }, [showCoursewareTour]);
  (0, _react.useEffect)(() => {
    if (isOutlineTab) {
      setIsExistingUserCourseHomeTourEnabled(!!showExistingUserCourseHomeTour);
    }
  }, [showExistingUserCourseHomeTour]);
  (0, _react.useEffect)(() => {
    if (isOutlineTab && showNewUserCourseHomeTour) {
      setIsAbandonTourEnabled(false);
      setIsNewUserCourseHomeTourEnabled(true);
    }
  }, [showNewUserCourseHomeTour]); // The <ProductTour /> component cannot handle rendering multiple enabled tours at once.
  // I.e. when adding new tours, beware that if multiple tours are enabled,
  // the first enabled tour in the following array will be the only one that renders.
  // The suggestion for populating these tour objects is to ensure only one tour is enabled at a time.

  const tours = [(0, _AbandonTour.default)({
    enabled: isAbandonTourEnabled,
    onEnd: () => setIsAbandonTourEnabled(false)
  }), (0, _CoursewareTour.default)({
    enabled: isCoursewareTourEnabled,
    onEnd: () => {
      setIsCoursewareTourEnabled(false);
      (0, _analytics.sendTrackEvent)('edx.ui.lms.courseware_tour.completed', {
        org_key: org,
        courserun_key: courseId,
        is_staff: administrator
      });
      dispatch((0, _data.endCoursewareTour)(username));
    }
  }), (0, _ExistingUserCourseHomeTour.default)({
    enabled: isExistingUserCourseHomeTourEnabled,
    onEnd: () => {
      setIsExistingUserCourseHomeTourEnabled(false);
      (0, _analytics.sendTrackEvent)('edx.ui.lms.existing_user_tour.completed', {
        org_key: org,
        courserun_key: courseId,
        is_staff: administrator
      });
      dispatch((0, _data.endCourseHomeTour)(username));
    }
  }), (0, _NewUserCourseHomeTour.default)({
    enabled: isNewUserCourseHomeTourEnabled,
    onDismiss: () => {
      setIsNewUserCourseHomeTourEnabled(false);
      setIsAbandonTourEnabled(true);
      (0, _analytics.sendTrackEvent)('edx.ui.lms.new_user_tour.dismissed', {
        org_key: org,
        courserun_key: courseId,
        is_staff: administrator
      });
      dispatch((0, _data.endCourseHomeTour)(username));
      dispatch((0, _data.endCoursewareTour)(username));
    },
    onEnd: () => {
      setIsNewUserCourseHomeTourEnabled(false);
      (0, _analytics.sendTrackEvent)('edx.ui.lms.new_user_tour.completed', {
        org_key: org,
        courserun_key: courseId,
        is_staff: administrator
      });
      dispatch((0, _data.endCourseHomeTour)(username));
    }
  })];
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.ProductTour, {
      tours: tours
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_NewUserCourseHomeTourModal.default, {
      isOpen: isOutlineTab && showNewUserCourseHomeModal,
      onDismiss: () => {
        (0, _analytics.sendTrackEvent)('edx.ui.lms.new_user_modal.dismissed', {
          org_key: org,
          courserun_key: courseId,
          is_staff: administrator
        });
        dispatch((0, _data.closeNewUserCourseHomeModal)());
        setIsAbandonTourEnabled(true);
        dispatch((0, _data.endCourseHomeTour)(username));
      },
      onStartTour: () => {
        (0, _analytics.sendTrackEvent)('edx.ui.lms.new_user_tour.started', {
          org_key: org,
          courserun_key: courseId,
          is_staff: administrator
        });
        dispatch((0, _data.closeNewUserCourseHomeModal)());
        setIsNewUserCourseHomeTourEnabled(true);
      }
    })]
  });
}

ProductTours.propTypes = {
  activeTab: _propTypes.default.string.isRequired,
  courseId: _propTypes.default.string.isRequired,
  isStreakCelebrationOpen: _propTypes.default.bool.isRequired,
  org: _propTypes.default.string.isRequired
};
var _default = ProductTours;
exports.default = _default;
//# sourceMappingURL=ProductTours.js.map