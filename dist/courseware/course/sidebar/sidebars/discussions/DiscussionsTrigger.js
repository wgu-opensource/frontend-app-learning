"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ID = void 0;

var _frontendPlatform = require("@edx/frontend-platform");

var _i18n = require("@edx/frontend-platform/i18n");

var _paragon = require("@edx/paragon");

var _icons = require("@edx/paragon/icons");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _modelStore = require("../../../../../generic/model-store");

var _thunks = require("../../../../data/thunks");

var _TriggerBase = _interopRequireDefault(require("../../common/TriggerBase"));

var _SidebarContext = _interopRequireDefault(require("../../SidebarContext"));

var _messages = _interopRequireDefault(require("./messages"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _frontendPlatform.ensureConfig)(['DISCUSSIONS_MFE_BASE_URL']);
const ID = 'DISCUSSIONS';
exports.ID = ID;

function DiscussionsTrigger(_ref) {
  let {
    intl,
    onClick
  } = _ref;
  const {
    unitId,
    courseId
  } = (0, _react.useContext)(_SidebarContext.default);
  const dispatch = (0, _reactRedux.useDispatch)();
  const topic = (0, _modelStore.useModel)('discussionTopics', unitId);
  const baseUrl = (0, _frontendPlatform.getConfig)().DISCUSSIONS_MFE_BASE_URL;
  (0, _react.useEffect)(() => {
    // Only fetch the topic data if the MFE is configured.
    if (baseUrl) {
      dispatch((0, _thunks.getCourseDiscussionTopics)(courseId));
    }
  }, [courseId, baseUrl]);

  if (!topic.id) {
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
}

DiscussionsTrigger.propTypes = {
  intl: _i18n.intlShape.isRequired,
  onClick: _propTypes.default.func.isRequired
};

var _default = (0, _i18n.injectIntl)(DiscussionsTrigger);

exports.default = _default;
//# sourceMappingURL=DiscussionsTrigger.js.map