"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _auth = require("@edx/frontend-platform/auth");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _reactRedux = require("react-redux");
var _modelStore = require("../../generic/model-store");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ProgressHeader = () => {
  const intl = (0, _i18n.useIntl)();
  const {
    courseId,
    targetUserId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    administrator,
    userId
  } = (0, _auth.getAuthenticatedUser)();
  const {
    studioUrl,
    username
  } = (0, _modelStore.useModel)('progress', courseId);
  const viewingOtherStudentsProgressPage = targetUserId && targetUserId !== userId;
  const pageTitle = viewingOtherStudentsProgressPage ? intl.formatMessage(_messages.default.progressHeaderForTargetUser, {
    username
  }) : intl.formatMessage(_messages.default.progressHeader);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "row w-100 m-0 mt-3 mb-4 justify-content-between",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
      children: pageTitle
    }), administrator && studioUrl && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
      variant: "outline-primary",
      size: "sm",
      className: "align-self-center",
      href: studioUrl,
      children: intl.formatMessage(_messages.default.studioLink)
    })]
  });
};
var _default = exports.default = ProgressHeader;
//# sourceMappingURL=ProgressHeader.js.map