"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactDom = require("react-dom");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _frontendLibLearningAssistant = require("@edx/frontend-lib-learning-assistant");
var _i18n = require("@edx/frontend-platform/i18n");
var _analytics = require("@edx/frontend-platform/analytics");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Chat = _ref => {
  let {
    enabled,
    enrollmentMode,
    isStaff,
    courseId,
    contentToolsEnabled
  } = _ref;
  const VERIFIED_MODES = ['professional', 'verified', 'no-id-professional', 'credit', 'masters', 'executive-education', 'paid-executive-education', 'paid-bootcamp'];
  const AUDIT_MODES = ['audit', 'honor', 'unpaid-executive-education', 'unpaid-bootcamp'];
  const isEnrolled = enrollmentMode !== null && enrollmentMode !== undefined && [...VERIFIED_MODES, ...AUDIT_MODES].some(mode => mode === enrollmentMode);
  const shouldDisplayChat = enabled && (isEnrolled || isStaff) // display only to enrolled or staff
  ;

  // TODO: Remove this Segment alert. This has been added purely to diagnose whether
  //       usage issues are as a result of the Xpert toggle button not appearing.
  if (shouldDisplayChat) {
    (0, _analytics.sendTrackEvent)('edx.ui.lms.learning_assistant.render', {
      course_id: courseId
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: shouldDisplayChat && /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendLibLearningAssistant.Xpert, {
      courseId: courseId,
      contentToolsEnabled: contentToolsEnabled
    }), document.body)
  });
};
Chat.propTypes = {
  isStaff: _propTypes.default.bool.isRequired,
  enabled: _propTypes.default.bool.isRequired,
  enrollmentMode: _propTypes.default.string,
  courseId: _propTypes.default.string.isRequired,
  contentToolsEnabled: _propTypes.default.bool.isRequired
};
Chat.defaultProps = {
  enrollmentMode: null
};
var _default = (0, _i18n.injectIntl)(Chat);
exports.default = _default;
//# sourceMappingURL=Chat.js.map