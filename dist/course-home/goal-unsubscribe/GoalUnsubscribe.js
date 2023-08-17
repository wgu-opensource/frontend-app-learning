"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

var _analytics = require("@edx/frontend-platform/analytics");

var _i18n = require("@edx/frontend-platform/i18n");

var _frontendComponentHeader = require("@edx/frontend-component-header");

var _PageLoading = _interopRequireDefault(require("../../generic/PageLoading"));

var _api = require("../data/api");

var _messages = _interopRequireDefault(require("./messages"));

var _ResultPage = _interopRequireDefault(require("./ResultPage"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GoalUnsubscribe(_ref) {
  let {
    intl
  } = _ref;
  const {
    token
  } = (0, _reactRouterDom.useParams)();
  const [error, setError] = (0, _react.useState)(false);
  const [isLoading, setIsLoading] = (0, _react.useState)(true);
  const [data, setData] = (0, _react.useState)({}); // We don't need to bother with redux for this simple page. We're not sharing state with other pages at all.

  (0, _react.useEffect)(() => {
    (0, _api.unsubscribeFromCourseGoal)(token).then(result => {
      setIsLoading(false);
      setData(result.data);
    }, () => {
      setIsLoading(false);
      setError(true);
    }); // We unfortunately have no information about the user, course, org, or really anything
    // as visiting this page is allowed to be done anonymously and without the context of the course.
    // The token can be used to connect a user and course, it will just require some post-processing

    (0, _analytics.sendTrackEvent)('edx.ui.lms.goal.unsubscribe', {
      token
    });
  }, []); // deps=[] to only run once

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendComponentHeader.LearningHeader, {
      showUserDropdown: false
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
      id: "main-content",
      className: "container my-5 text-center",
      children: [isLoading && /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageLoading.default, {
        srMessage: `${intl.formatMessage(_messages.default.loading)}`
      }), !isLoading && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ResultPage.default, {
        error: error,
        courseTitle: data.courseTitle
      })]
    })]
  });
}

GoalUnsubscribe.propTypes = {
  intl: _i18n.intlShape.isRequired
};

var _default = (0, _i18n.injectIntl)(GoalUnsubscribe);

exports.default = _default;
//# sourceMappingURL=GoalUnsubscribe.js.map