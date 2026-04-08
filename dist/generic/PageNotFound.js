"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _frontendPlatform = require("@edx/frontend-platform");
var _paragon = require("@openedx/paragon");
var _i18n = require("@edx/frontend-platform/i18n");
var _logging = require("@edx/frontend-platform/logging");
var _analytics = require("@edx/frontend-platform/analytics");
var _frontendComponentFooter = require("@edx/frontend-component-footer");
var _HeaderSlot = _interopRequireDefault(require("../plugin-slots/HeaderSlot"));
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const PageNotFound = () => {
  const {
    formatMessage
  } = (0, _i18n.useIntl)();
  const location = window.location.href;
  (0, _logging.logError)('Page failed to load, probably an invalid URL.', location);
  (0, _analytics.sendTrackEvent)('edx.ui.lms.page_not_found', {
    location
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_HeaderSlot.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
      id: "main-content",
      className: "main-content d-flex justify-content-center align-items-center flex-column",
      style: {
        height: '50vh'
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
        className: "h3",
        children: formatMessage(_messages.default.pageNotFoundHeader)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: formatMessage(_messages.default.pageNotFoundBody, {
          homepageLink: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
            destination: (0, _frontendPlatform.getConfig)().LMS_BASE_URL,
            children: formatMessage(_messages.default.homepageLink)
          })
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendComponentFooter.FooterSlot, {})]
  });
};
var _default = exports.default = PageNotFound;
//# sourceMappingURL=PageNotFound.js.map