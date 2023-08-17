"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _auth = require("@edx/frontend-platform/auth");

var _i18n = require("@edx/frontend-platform/i18n");

var _paragon = require("@edx/paragon");

var _modelStore = require("../../generic/model-store");

var _messages = _interopRequireDefault(require("./messages"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ProgressHeader(_ref) {
  let {
    intl
  } = _ref;
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
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
    })
  });
}

ProgressHeader.propTypes = {
  intl: _i18n.intlShape.isRequired
};

var _default = (0, _i18n.injectIntl)(ProgressHeader);

exports.default = _default;
//# sourceMappingURL=ProgressHeader.js.map