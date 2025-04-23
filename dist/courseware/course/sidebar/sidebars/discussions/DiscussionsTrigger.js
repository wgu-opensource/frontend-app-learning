"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ID = void 0;
var _frontendPlatform = require("@edx/frontend-platform");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = require("react");
var _reactRedux = require("react-redux");
var _modelStore = require("@src/generic/model-store");
var _constants = require("@src/constants");
var _thunks = require("../../../../data/thunks");
var _TriggerBase = _interopRequireDefault(require("../../common/TriggerBase"));
var _SidebarContext = _interopRequireDefault(require("../../SidebarContext"));
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _frontendPlatform.ensureConfig)(['DISCUSSIONS_MFE_BASE_URL']);
const ID = exports.ID = _constants.WIDGETS.DISCUSSIONS;
const DiscussionsTrigger = _ref => {
  let {
    intl,
    onClick
  } = _ref;
  const {
    unitId,
    courseId
  } = (0, _react.useContext)(_SidebarContext.default);
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    tabs
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const topic = (0, _modelStore.useModel)('discussionTopics', unitId);
  const baseUrl = (0, _frontendPlatform.getConfig)().DISCUSSIONS_MFE_BASE_URL;
  const edxProvider = (0, _react.useMemo)(() => tabs?.find(tab => tab.slug === 'discussion'), [tabs]);
  (0, _react.useEffect)(() => {
    if (baseUrl && edxProvider) {
      dispatch((0, _thunks.getCourseDiscussionTopics)(courseId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, baseUrl]);
  if (!topic?.id || !topic?.enabledInContext) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_TriggerBase.default, {
    onClick: onClick,
    ariaLabel: intl.formatMessage(_messages.default.openDiscussionsTrigger),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
      src: _icons.QuestionAnswer,
      className: "m-0 m-auto"
    })
  });
};
DiscussionsTrigger.propTypes = {
  intl: _i18n.intlShape.isRequired,
  onClick: _propTypes.default.func.isRequired
};
var _default = exports.default = (0, _i18n.injectIntl)(DiscussionsTrigger);
//# sourceMappingURL=DiscussionsTrigger.js.map