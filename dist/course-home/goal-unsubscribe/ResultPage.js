"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _frontendPlatform = require("@edx/frontend-platform");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _messages = _interopRequireDefault(require("./messages"));
var _unsubscribe = require("./unsubscribe.svg");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ResultPage = _ref => {
  let {
    courseTitle,
    error,
    intl
  } = _ref;
  const errorDescription = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
    id: "learning.goals.unsubscribe.errorDescription",
    defaultMessage: "We were unable to unsubscribe you from goal reminder emails. Please try again later or {contactSupport} for help.",
    values: {
      contactSupport: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
        className: "text-reset",
        style: {
          textDecoration: 'underline'
        },
        destination: `${(0, _frontendPlatform.getConfig)().CONTACT_URL}`,
        children: intl.formatMessage(_messages.default.contactSupport)
      })
    }
  });
  const header = error ? intl.formatMessage(_messages.default.errorHeader) : intl.formatMessage(_messages.default.header);
  const description = error ? errorDescription : intl.formatMessage(_messages.default.description, {
    courseTitle
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_unsubscribe.ReactComponent, {
      className: "text-primary",
      alt: ""
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      role: "heading",
      "aria-level": "1",
      className: "h2",
      children: header
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "row justify-content-center",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "col-xl-7 col-12 p-0",
        children: description
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
      variant: "brand",
      href: `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/dashboard`,
      className: "mt-4",
      children: intl.formatMessage(_messages.default.goToDashboard)
    })]
  });
};
ResultPage.defaultProps = {
  courseTitle: null,
  error: false
};
ResultPage.propTypes = {
  courseTitle: _propTypes.default.string,
  error: _propTypes.default.bool,
  intl: _i18n.intlShape.isRequired
};
var _default = (0, _i18n.injectIntl)(ResultPage);
exports.default = _default;
//# sourceMappingURL=ResultPage.js.map