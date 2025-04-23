"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _classnames = _interopRequireDefault(require("classnames"));
var _frontendPlatform = require("@edx/frontend-platform");
var _i18n = require("@edx/frontend-platform/i18n");
var _modelStore = require("@src/generic/model-store");
var _SidebarBase = _interopRequireDefault(require("../../common/SidebarBase"));
var _SidebarContext = _interopRequireDefault(require("../../SidebarContext"));
var _DiscussionsTrigger = require("./DiscussionsTrigger");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _frontendPlatform.ensureConfig)(['DISCUSSIONS_MFE_BASE_URL']);
const DiscussionsSidebar = _ref => {
  let {
    intl
  } = _ref;
  const {
    unitId,
    courseId,
    shouldDisplayFullScreen
  } = (0, _react.useContext)(_SidebarContext.default);
  const topic = (0, _modelStore.useModel)('discussionTopics', unitId);
  const discussionsUrl = `${(0, _frontendPlatform.getConfig)().DISCUSSIONS_MFE_BASE_URL}/${courseId}/category/${unitId}`;
  if (!topic?.id || !topic?.enabledInContext) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SidebarBase.default, {
    title: intl.formatMessage(_messages.default.discussionsTitle),
    ariaLabel: intl.formatMessage(_messages.default.discussionsTitle),
    sidebarId: _DiscussionsTrigger.ID,
    width: "45rem",
    showTitleBar: false,
    className: (0, _classnames.default)({
      'ml-4': !shouldDisplayFullScreen
    }),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("iframe", {
      src: `${discussionsUrl}?inContextSidebar`,
      className: "d-flex sticky-top vh-100 w-100 border-0 discussions-sidebar-frame",
      title: intl.formatMessage(_messages.default.discussionsTitle),
      allow: "clipboard-write",
      loading: "lazy"
    })
  });
};
DiscussionsSidebar.propTypes = {
  intl: _i18n.intlShape.isRequired
};
DiscussionsSidebar.Trigger = DiscussionsSidebar;
DiscussionsSidebar.ID = _DiscussionsTrigger.ID;
var _default = exports.default = (0, _i18n.injectIntl)(DiscussionsSidebar);
//# sourceMappingURL=DiscussionsSidebar.js.map