"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactDom = require("react-dom");
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _frontendLibLearningAssistant = require("@edx/frontend-lib-learning-assistant");
var _i18n = require("@edx/frontend-platform/i18n");
var _constants = require("@src/constants");
var _modelStore = require("../../../generic/model-store");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Chat = _ref => {
  let {
    enabled,
    enrollmentMode,
    isStaff,
    courseId,
    contentToolsEnabled,
    unitId
  } = _ref;
  const {
    activeAttempt,
    exam
  } = (0, _reactRedux.useSelector)(state => state.specialExams);
  const course = (0, _modelStore.useModel)('coursewareMeta', courseId);
  const hasVerifiedEnrollment = enrollmentMode !== null && enrollmentMode !== undefined && _constants.VERIFIED_MODES.includes(enrollmentMode);
  const validDates = () => {
    const date = new Date();
    const utcDate = date.toISOString();
    const startDate = course.start || utcDate;
    const endDate = course.end || utcDate;
    return startDate <= utcDate && utcDate <= endDate;
  };
  const shouldDisplayChat = enabled && (hasVerifiedEnrollment || isStaff) // display only to verified learners or staff
  && validDates()
  // it is necessary to check both whether the user is in an exam, and whether or not they are viewing an exam
  // this will prevent the learner from interacting with the tool at any point of the exam flow, even at the
  // entrance interstitial.
  && !(activeAttempt?.attempt_id || exam?.id);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: shouldDisplayChat && ( /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendLibLearningAssistant.Xpert, {
      courseId: courseId,
      contentToolsEnabled: contentToolsEnabled,
      unitId: unitId
    }), document.body))
  });
};
Chat.propTypes = {
  isStaff: _propTypes.default.bool.isRequired,
  enabled: _propTypes.default.bool.isRequired,
  enrollmentMode: _propTypes.default.string,
  courseId: _propTypes.default.string.isRequired,
  contentToolsEnabled: _propTypes.default.bool.isRequired,
  unitId: _propTypes.default.string.isRequired
};
Chat.defaultProps = {
  enrollmentMode: null
};
var _default = exports.default = (0, _i18n.injectIntl)(Chat);
//# sourceMappingURL=Chat.js.map