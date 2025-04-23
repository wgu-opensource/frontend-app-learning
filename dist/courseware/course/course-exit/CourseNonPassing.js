"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _auth = require("@edx/frontend-platform/auth");
var _i18n = require("@edx/frontend-platform/i18n");
var _reactHelmet = require("react-helmet");
var _reactRedux = require("react-redux");
var _paragon = require("@openedx/paragon");
var _frontendPlatform = require("@edx/frontend-platform");
var _modelStore = require("../../../generic/model-store");
var _CatalogSuggestion = _interopRequireDefault(require("./CatalogSuggestion"));
var _DashboardFootnote = _interopRequireDefault(require("./DashboardFootnote"));
var _messages = _interopRequireDefault(require("./messages"));
var _utils = require("./utils");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CourseNonPassing = _ref => {
  let {
    intl
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseware);
  const {
    org,
    tabs,
    title
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    administrator
  } = (0, _auth.getAuthenticatedUser)();

  // Get progress tab link for 'view grades' button
  const progressTab = tabs.find(tab => tab.slug === 'progress');
  const progressLink = progressTab && progressTab.url;
  (0, _react.useEffect)(() => (0, _utils.logVisit)(org, courseId, administrator, 'nonpassing'), [org, courseId, administrator]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactHelmet.Helmet, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("title", {
        children: `${intl.formatMessage(_messages.default.endOfCourseTitle)} | ${title} | ${(0, _frontendPlatform.getConfig)().SITE_NAME}`
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "row w-100 mx-0 mb-4 px-5 py-4 border border-light justify-content-center",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "col-12 p-0 h2 text-center",
        children: intl.formatMessage(_messages.default.endOfCourseHeader)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert, {
        variant: "primary",
        className: "col col-lg-10 mt-4",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "row w-100 m-0 align-items-start",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "flex-grow-1 col-sm p-0",
            children: intl.formatMessage(_messages.default.endOfCourseDescription)
          }), progressLink && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
            variant: "primary",
            className: "flex-shrink-0 mt-3 mt-sm-0 mb-1 mb-sm-0 ml-sm-5",
            href: progressLink,
            onClick: () => (0, _utils.logClick)(org, courseId, administrator, 'view_grades'),
            children: intl.formatMessage(_messages.default.viewGradesButton)
          })]
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DashboardFootnote.default, {
        variant: "nonpassing"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CatalogSuggestion.default, {
        variant: "nonpassing"
      })]
    })]
  });
};
CourseNonPassing.propTypes = {
  intl: _i18n.intlShape.isRequired
};
var _default = exports.default = (0, _i18n.injectIntl)(CourseNonPassing);
//# sourceMappingURL=CourseNonPassing.js.map