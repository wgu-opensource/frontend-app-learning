"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _frontendPlatform = require("@edx/frontend-platform");

var _auth = require("@edx/frontend-platform/auth");

var _i18n = require("@edx/frontend-platform/i18n");

var _paragon = require("@edx/paragon");

var _modelStore = require("../../../../generic/model-store");

var _data = require("../../../data");

var _messages = _interopRequireDefault(require("./messages"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HonorCode(_ref) {
  let {
    intl,
    courseId
  } = _ref;
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    isMasquerading,
    username
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const authUser = (0, _auth.getAuthenticatedUser)();
  const siteName = (0, _frontendPlatform.getConfig)().SITE_NAME;
  const honorCodeUrl = `${(0, _frontendPlatform.getConfig)().TERMS_OF_SERVICE_URL}#honor-code`;

  const handleCancel = () => _frontendPlatform.history.push(`/course/${courseId}/home`);

  const handleAgree = () => dispatch( // If the request is made by a staff user masquerading as a specific learner,
  // don't actually create a signature for them on the backend.
  // Only the modal dialog will be dismissed.
  // Otherwise, even for staff users, we want to record the signature.
  (0, _data.saveIntegritySignature)(courseId, isMasquerading && username !== authUser.username));

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Alert, {
    variant: "light",
    "aria-live": "off",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("h4", {
      "aria-level": "3",
      children: [siteName, ' ', intl.formatMessage(_messages.default['learn.honorCode.name'])]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "learn.honorCode.content",
        defaultMessage: "Honesty and academic integrity are important to {siteName} and the institutions providing courses and programs on the {siteName} site. By clicking \u201CI agree\u201D below, I confirm that I have read, understand, and will abide by the {link} for the {siteName} Site.",
        values: {
          siteName,
          link: /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
            href: honorCodeUrl,
            children: intl.formatMessage(_messages.default['learn.honorCode.name'])
          })
        },
        description: "This is shown to learner, when course author wants to learners to explicity agree on their (Term of use or conduct), hence it links honor code page. "
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.ActionRow, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.ActionRow.Spacer, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
        variant: "tertiary",
        onClick: handleCancel,
        children: intl.formatMessage(_messages.default['learn.honorCode.cancel'])
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
        variant: "primary",
        onClick: handleAgree,
        children: intl.formatMessage(_messages.default['learn.honorCode.agree'])
      })]
    })]
  });
}

HonorCode.propTypes = {
  intl: _i18n.intlShape.isRequired,
  courseId: _propTypes.default.string.isRequired
};

var _default = (0, _i18n.injectIntl)(HonorCode);

exports.default = _default;
//# sourceMappingURL=HonorCode.js.map