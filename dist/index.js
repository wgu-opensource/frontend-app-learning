"use strict";

require("core-js/stable");
require("regenerator-runtime/runtime");
var _frontendPlatform = require("@edx/frontend-platform");
var _react = require("@edx/frontend-platform/react");
var _react2 = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _reactRouterDom = require("react-router-dom");
var _reactHelmet = require("react-helmet");
var _thunks = require("./course-home/data/thunks");
var _DiscussionTab = _interopRequireDefault(require("./course-home/discussion-tab/DiscussionTab"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _userMessages = require("./generic/user-messages");
require("./index.scss");
var _outlineTab = _interopRequireDefault(require("./course-home/outline-tab"));
var _courseExit = require("./courseware/course/course-exit");
var _courseware = _interopRequireDefault(require("./courseware"));
var _CoursewareRedirectLandingPage = _interopRequireDefault(require("./courseware/CoursewareRedirectLandingPage"));
var _datesTab = _interopRequireDefault(require("./course-home/dates-tab"));
var _goalUnsubscribe = _interopRequireDefault(require("./course-home/goal-unsubscribe"));
var _ProgressTab = _interopRequireDefault(require("./course-home/progress-tab/ProgressTab"));
var _tabPage = require("./tab-page");
var _data = require("./course-home/data");
var _data2 = require("./courseware/data");
var _store = _interopRequireDefault(require("./store"));
var _notices = _interopRequireDefault(require("./generic/notices"));
var _pathFixes = _interopRequireDefault(require("./generic/path-fixes"));
var _LiveTab = _interopRequireDefault(require("./course-home/live-tab/LiveTab"));
var _CourseAccessErrorPage = _interopRequireDefault(require("./generic/CourseAccessErrorPage"));
var _decodePageRoute = _interopRequireDefault(require("./decode-page-route"));
var _constants = require("./constants");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _frontendPlatform.subscribe)(_frontendPlatform.APP_READY, () => {
  _reactDom.default.render( /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.AppProvider, {
    store: (0, _store.default)(),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactHelmet.Helmet, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("link", {
        rel: "shortcut icon",
        href: (0, _frontendPlatform.getConfig)().FAVICON_URL,
        type: "image/x-icon"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_pathFixes.default, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_notices.default, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_userMessages.UserMessagesProvider, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouterDom.Routes, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
              path: _constants.ROUTES.UNSUBSCRIBE,
              element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.PageWrap, {
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_goalUnsubscribe.default, {})
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
              path: _constants.ROUTES.REDIRECT,
              element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.PageWrap, {
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CoursewareRedirectLandingPage.default, {})
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
              path: _constants.DECODE_ROUTES.ACCESS_DENIED,
              element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_decodePageRoute.default, {
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseAccessErrorPage.default, {})
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
              path: _constants.DECODE_ROUTES.HOME,
              element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_decodePageRoute.default, {
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_tabPage.TabContainer, {
                  tab: "outline",
                  fetch: _data.fetchOutlineTab,
                  slice: "courseHome",
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_outlineTab.default, {})
                })
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
              path: _constants.DECODE_ROUTES.LIVE,
              element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_decodePageRoute.default, {
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_tabPage.TabContainer, {
                  tab: "lti_live",
                  fetch: _thunks.fetchLiveTab,
                  slice: "courseHome",
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_LiveTab.default, {})
                })
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
              path: _constants.DECODE_ROUTES.DATES,
              element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_decodePageRoute.default, {
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_tabPage.TabContainer, {
                  tab: "dates",
                  fetch: _data.fetchDatesTab,
                  slice: "courseHome",
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_datesTab.default, {})
                })
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
              path: _constants.DECODE_ROUTES.DISCUSSION,
              element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_decodePageRoute.default, {
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_tabPage.TabContainer, {
                  tab: "discussion",
                  fetch: _thunks.fetchDiscussionTab,
                  slice: "courseHome",
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DiscussionTab.default, {})
                })
              })
            }), _constants.DECODE_ROUTES.PROGRESS.map(route => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
              path: route,
              element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_decodePageRoute.default, {
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_tabPage.TabContainer, {
                  tab: "progress",
                  fetch: _data.fetchProgressTab,
                  slice: "courseHome",
                  isProgressTab: true,
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProgressTab.default, {})
                })
              })
            })), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
              path: _constants.DECODE_ROUTES.COURSE_END,
              element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_decodePageRoute.default, {
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_tabPage.TabContainer, {
                  tab: "courseware",
                  fetch: _data2.fetchCourse,
                  slice: "courseware",
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_courseExit.CourseExit, {})
                })
              })
            }), _constants.DECODE_ROUTES.COURSEWARE.map(route => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
              path: route,
              element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_decodePageRoute.default, {
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_courseware.default, {})
              })
            }))]
          })
        })
      })
    })]
  }), document.getElementById('root'));
});
(0, _frontendPlatform.subscribe)(_frontendPlatform.APP_INIT_ERROR, error => {
  _reactDom.default.render( /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.ErrorPage, {
    message: error.message
  }), document.getElementById('root'));
});
(0, _frontendPlatform.initialize)({
  handlers: {
    config: () => {
      (0, _frontendPlatform.mergeConfig)({
        CONTACT_URL: process.env.CONTACT_URL || null,
        CREDENTIALS_BASE_URL: process.env.CREDENTIALS_BASE_URL || null,
        CREDIT_HELP_LINK_URL: process.env.CREDIT_HELP_LINK_URL || null,
        DISCUSSIONS_MFE_BASE_URL: process.env.DISCUSSIONS_MFE_BASE_URL || null,
        ENTERPRISE_LEARNER_PORTAL_HOSTNAME: process.env.ENTERPRISE_LEARNER_PORTAL_HOSTNAME || null,
        ENABLE_JUMPNAV: process.env.ENABLE_JUMPNAV || null,
        ENABLE_NOTICES: process.env.ENABLE_NOTICES || null,
        INSIGHTS_BASE_URL: process.env.INSIGHTS_BASE_URL || null,
        SEARCH_CATALOG_URL: process.env.SEARCH_CATALOG_URL || null,
        SOCIAL_UTM_MILESTONE_CAMPAIGN: process.env.SOCIAL_UTM_MILESTONE_CAMPAIGN || null,
        STUDIO_BASE_URL: process.env.STUDIO_BASE_URL || null,
        SUPPORT_URL: process.env.SUPPORT_URL || null,
        SUPPORT_URL_CALCULATOR_MATH: process.env.SUPPORT_URL_CALCULATOR_MATH || null,
        SUPPORT_URL_ID_VERIFICATION: process.env.SUPPORT_URL_ID_VERIFICATION || null,
        SUPPORT_URL_VERIFIED_CERTIFICATE: process.env.SUPPORT_URL_VERIFIED_CERTIFICATE || null,
        TERMS_OF_SERVICE_URL: process.env.TERMS_OF_SERVICE_URL || null,
        TWITTER_HASHTAG: process.env.TWITTER_HASHTAG || null,
        TWITTER_URL: process.env.TWITTER_URL || null,
        LEGACY_THEME_NAME: process.env.LEGACY_THEME_NAME || null,
        EXAMS_BASE_URL: process.env.EXAMS_BASE_URL || null,
        PROCTORED_EXAM_FAQ_URL: process.env.PROCTORED_EXAM_FAQ_URL || null,
        PROCTORED_EXAM_RULES_URL: process.env.PROCTORED_EXAM_RULES_URL || null,
        CHAT_RESPONSE_URL: process.env.CHAT_RESPONSE_URL || null,
        PRIVACY_POLICY_URL: process.env.PRIVACY_POLICY_URL || null
      }, 'LearnerAppConfig');
    }
  },
  messages: _i18n.default
});
//# sourceMappingURL=index.js.map