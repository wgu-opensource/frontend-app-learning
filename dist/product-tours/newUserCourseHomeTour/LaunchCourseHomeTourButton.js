"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _analytics = require("@edx/frontend-platform/analytics");
var _auth = require("@edx/frontend-platform/auth");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _icons = require("@edx/paragon/icons");
var _modelStore = require("../../generic/model-store");
var _slice = require("../data/slice");
var _messages = _interopRequireDefault(require("../messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const LaunchCourseHomeTourButton = _ref => {
  let {
    intl,
    srOnly
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    org
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    toursEnabled
  } = (0, _reactRedux.useSelector)(state => state.tours);
  const dispatch = (0, _reactRedux.useDispatch)();
  const handleClick = () => {
    const {
      administrator
    } = (0, _auth.getAuthenticatedUser)();
    (0, _analytics.sendTrackEvent)('edx.ui.lms.launch_tour.clicked', {
      org_key: org,
      courserun_key: courseId,
      is_staff: administrator,
      tour_variant: 'course_home'
    });
    dispatch((0, _slice.launchCourseHomeTour)());
  };
  return (
    /*#__PURE__*/
    // eslint-disable-next-line react/jsx-no-useless-fragment
    (0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
      children: toursEnabled && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Button, {
        variant: "link",
        size: "inline",
        className: `p-0 ${srOnly && 'sr-only sr-only-focusable'}`,
        onClick: handleClick,
        children: [!srOnly && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
          src: _icons.Compass,
          className: "mr-2",
          style: {
            height: '18px',
            width: '18px'
          }
        }), intl.formatMessage(_messages.default.launchTour)]
      })
    })
  );
};
LaunchCourseHomeTourButton.defaultProps = {
  srOnly: false
};
LaunchCourseHomeTourButton.propTypes = {
  intl: _i18n.intlShape.isRequired,
  srOnly: _propTypes.default.bool
};
var _default = (0, _i18n.injectIntl)(LaunchCourseHomeTourButton);
exports.default = _default;
//# sourceMappingURL=LaunchCourseHomeTourButton.js.map