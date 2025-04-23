"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSequenceBannerTextAlert = useSequenceBannerTextAlert;
exports.useSequenceEntranceExamAlert = useSequenceEntranceExamAlert;
var _reactRedux = require("react-redux");
var _modelStore = require("../../generic/model-store");
var _userMessages = require("../../generic/user-messages");
var _messages = _interopRequireDefault(require("./messages"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function useSequenceBannerTextAlert(sequenceId) {
  const sequence = (0, _modelStore.useModel)('sequences', sequenceId);
  const sequenceStatus = (0, _reactRedux.useSelector)(state => state.courseware.sequenceStatus);

  // Show Alert that comes along with the sequence
  (0, _userMessages.useAlert)(sequenceStatus === 'loaded' && sequence.bannerText, {
    code: null,
    dismissible: false,
    text: sequence.bannerText,
    type: _userMessages.ALERT_TYPES.INFO,
    topic: 'sequence'
  });
}
function useSequenceEntranceExamAlert(courseId, sequenceId, intl) {
  const course = (0, _modelStore.useModel)('coursewareMeta', courseId);
  const sequence = (0, _modelStore.useModel)('sequences', sequenceId);
  const sequenceStatus = (0, _reactRedux.useSelector)(state => state.courseware.sequenceStatus);
  const {
    entranceExamCurrentScore,
    entranceExamEnabled,
    entranceExamId,
    entranceExamMinimumScorePct,
    entranceExamPassed
  } = course.entranceExamData || {};
  const entranceExamAlertVisible = sequenceStatus === 'loaded' && entranceExamEnabled && entranceExamId === sequence.sectionId;
  let entranceExamText;
  if (entranceExamPassed) {
    entranceExamText = intl.formatMessage(_messages.default.entranceExamTextPassed, {
      entranceExamCurrentScore: entranceExamCurrentScore * 100
    });
  } else {
    entranceExamText = intl.formatMessage(_messages.default.entranceExamTextNotPassing, {
      entranceExamCurrentScore: entranceExamCurrentScore * 100,
      entranceExamMinimumScorePct: entranceExamMinimumScorePct * 100
    });
  }
  (0, _userMessages.useAlert)(entranceExamAlertVisible, {
    code: null,
    dismissible: false,
    text: entranceExamText,
    type: _userMessages.ALERT_TYPES.INFO,
    topic: 'sequence'
  });
}
//# sourceMappingURL=hooks.js.map