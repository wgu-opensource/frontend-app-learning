"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _frontendPlatform = require("@edx/frontend-platform");

var _i18n = require("@edx/frontend-platform/i18n");

var _react = _interopRequireWildcard(require("react"));

var _modelStore = require("../../../../../generic/model-store");

var _SidebarBase = _interopRequireDefault(require("../../common/SidebarBase"));

var _SidebarContext = _interopRequireDefault(require("../../SidebarContext"));

var _DiscussionsTrigger = require("./DiscussionsTrigger");

var _messages = _interopRequireDefault(require("./messages"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

(0, _frontendPlatform.ensureConfig)(['DISCUSSIONS_MFE_BASE_URL']);

function DiscussionsSidebar(_ref) {
  let {
    intl
  } = _ref;
  const {
    unitId,
    courseId
  } = (0, _react.useContext)(_SidebarContext.default);
  const topic = (0, _modelStore.useModel)('discussionTopics', unitId);

  if (!topic?.id) {
    return null;
  }

  const discussionsUrl = `${(0, _frontendPlatform.getConfig)().DISCUSSIONS_MFE_BASE_URL}/${courseId}/category/${unitId}`;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SidebarBase.default, {
    title: intl.formatMessage(_messages.default.discussionsTitle),
    ariaLabel: intl.formatMessage(_messages.default.discussionsTitle),
    sidebarId: _DiscussionsTrigger.ID,
    width: "50rem",
    showTitleBar: false,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("iframe", {
      src: `${discussionsUrl}?inContext`,
      className: "d-flex w-100 border-0",
      style: {
        minHeight: '60rem'
      },
      title: intl.formatMessage(_messages.default.discussionsTitle)
    })
  });
}

DiscussionsSidebar.propTypes = {
  intl: _i18n.intlShape.isRequired
};
DiscussionsSidebar.Trigger = DiscussionsSidebar;
DiscussionsSidebar.ID = _DiscussionsTrigger.ID;

var _default = (0, _i18n.injectIntl)(DiscussionsSidebar);

exports.default = _default;
//# sourceMappingURL=DiscussionsSidebar.js.map