"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _i18n = require("@edx/frontend-platform/i18n");
var _react2 = require("@edx/frontend-platform/react");
var _PageLoading = _interopRequireDefault(require("../generic/PageLoading"));
var _decodePageRoute = _interopRequireDefault(require("../decode-page-route"));
var _constants = require("../constants");
var _RedirectPage = _interopRequireDefault(require("./RedirectPage"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CoursewareRedirectLandingPage = () => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
  className: "flex-grow-1",
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_PageLoading.default, {
    srMessage: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learn.redirect.interstitial.message",
      description: "The screen-reader message when a page is about to redirect",
      defaultMessage: "Redirecting..."
    })
  }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouterDom.Routes, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
      path: _constants.DECODE_ROUTES.REDIRECT_SURVEY,
      element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_decodePageRoute.default, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RedirectPage.default, {
          pattern: "/courses/:courseId/survey",
          mode: _constants.REDIRECT_MODES.SURVEY_REDIRECT
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
      path: _constants.ROUTES.DASHBOARD,
      element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.PageWrap, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RedirectPage.default, {
          pattern: "/dashboard",
          mode: _constants.REDIRECT_MODES.DASHBOARD_REDIRECT
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
      path: _constants.ROUTES.CONSENT,
      element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.PageWrap, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RedirectPage.default, {
          mode: _constants.REDIRECT_MODES.CONSENT_REDIRECT
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
      path: _constants.DECODE_ROUTES.REDIRECT_HOME,
      element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_decodePageRoute.default, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RedirectPage.default, {
          pattern: "/course/:courseId/home",
          mode: _constants.REDIRECT_MODES.HOME_REDIRECT
        })
      })
    })]
  })]
});
var _default = CoursewareRedirectLandingPage;
exports.default = _default;
//# sourceMappingURL=CoursewareRedirectLandingPage.js.map