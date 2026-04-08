"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactDom = require("react-dom");
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _frontendLibLearningAssistant = require("@edx/frontend-lib-learning-assistant");
var _frontendPlatform = require("@edx/frontend-platform");
var _constants = require("@src/constants");
var _modelStore = require("../../../generic/model-store");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Chat = ({
  enabled,
  enrollmentMode,
  isStaff,
  courseId,
  contentToolsEnabled,
  unitId
}) => {
  const {
    activeAttempt,
    exam
  } = (0, _reactRedux.useSelector)(state => state.specialExams);
  const course = (0, _modelStore.useModel)('coursewareMeta', courseId);

  // If is disabled or taking an exam, we don't show the chat.
  if (!enabled || activeAttempt?.attempt_id || exam?.id) {
    return null;
  }

  // If is not staff and doesn't have an enrollment, we don't show the chat.
  if (!isStaff && !enrollmentMode) {
    return null;
  }
  const verifiedMode = _constants.VERIFIED_MODES.includes(enrollmentMode); // Enrollment verified
  const auditMode = !isStaff && !verifiedMode && _constants.ALLOW_UPSELL_MODES.includes(enrollmentMode) // Can upgrade course
  && (0, _frontendPlatform.getConfig)().ENABLE_XPERT_AUDIT;
  // If user has no access, we don't show the chat.
  if (!isStaff && !(verifiedMode || auditMode)) {
    return null;
  }

  // Date validation
  const {
    accessExpiration,
    start,
    end
  } = course;
  const utcDate = new Date().toISOString();
  const expiration = accessExpiration?.expirationDate || utcDate;
  const validDate = (start ? start <= utcDate : true) && (end ? end >= utcDate : true) && (auditMode ? expiration >= utcDate : true);
  // If date is invalid, we don't show the chat.
  if (!validDate) {
    return null;
  }

  // Use a portal to ensure that component overlay does not compete with learning MFE styles.
  return /*#__PURE__*/(0, _reactDom.createPortal)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendLibLearningAssistant.Xpert, {
    courseId: courseId,
    contentToolsEnabled: contentToolsEnabled,
    unitId: unitId,
    isUpgradeEligible: auditMode
  }), document.body);
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
var _default = exports.default = Chat;
//# sourceMappingURL=Chat.js.map