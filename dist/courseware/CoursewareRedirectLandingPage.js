"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouter = require("react-router");

var _frontendPlatform = require("@edx/frontend-platform");

var _i18n = require("@edx/frontend-platform/i18n");

var _react2 = require("@edx/frontend-platform/react");

var _queryString = _interopRequireDefault(require("query-string"));

var _PageLoading = _interopRequireDefault(require("../generic/PageLoading"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = () => {
  const {
    path
  } = (0, _reactRouter.useRouteMatch)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "flex-grow-1",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_PageLoading.default, {
      srMessage: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "learn.redirect.interstitial.message",
        description: "The screen-reader message when a page is about to redirect",
        defaultMessage: "Redirecting..."
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouter.Switch, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.PageRoute, {
        path: `${path}/survey/:courseId`,
        render: _ref => {
          let {
            match
          } = _ref;
          global.location.assign(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/courses/${match.params.courseId}/survey`);
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.PageRoute, {
        path: `${path}/dashboard`,
        render: _ref2 => {
          let {
            location
          } = _ref2;
          global.location.assign(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/dashboard${location.search}`);
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.PageRoute, {
        path: `${path}/consent/`,
        render: _ref3 => {
          let {
            location
          } = _ref3;

          const {
            consentPath
          } = _queryString.default.parse(location.search);

          global.location.assign(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}${consentPath}`);
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.PageRoute, {
        path: `${path}/home/:courseId`,
        render: _ref4 => {
          let {
            match
          } = _ref4;
          global.location.assign(`/course/${match.params.courseId}/home`);
        }
      })]
    })]
  });
};

exports.default = _default;
//# sourceMappingURL=CoursewareRedirectLandingPage.js.map