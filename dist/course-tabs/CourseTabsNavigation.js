"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _classnames = _interopRequireDefault(require("classnames"));
var _messages = _interopRequireDefault(require("./messages"));
var _Tabs = _interopRequireDefault(require("../generic/tabs/Tabs"));
var _coursewareSearch = require("../course-home/courseware-search");
var _hooks = require("../course-home/courseware-search/hooks");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CourseTabsNavigation = ({
  activeTabSlug,
  className,
  tabs
}) => {
  const intl = (0, _i18n.useIntl)();
  const {
    show
  } = (0, _hooks.useCoursewareSearchState)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    id: "courseTabsNavigation",
    className: (0, _classnames.default)('course-tabs-navigation', className),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "container-xl",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "nav-bar",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "nav-menu",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tabs.default, {
            className: "nav-underline-tabs",
            "aria-label": intl.formatMessage(_messages.default.courseMaterial),
            children: tabs.map(({
              url,
              title,
              slug
            }) => /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
              className: (0, _classnames.default)('nav-item flex-shrink-0 nav-link', {
                active: slug === activeTabSlug
              }),
              href: url,
              children: title
            }, slug))
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "search-toggle",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_coursewareSearch.CoursewareSearchToggle, {})
        })]
      })
    }), show && /*#__PURE__*/(0, _jsxRuntime.jsx)(_coursewareSearch.CoursewareSearch, {})]
  });
};
CourseTabsNavigation.propTypes = {
  activeTabSlug: _propTypes.default.string,
  className: _propTypes.default.string,
  tabs: _propTypes.default.arrayOf(_propTypes.default.shape({
    title: _propTypes.default.string.isRequired,
    slug: _propTypes.default.string.isRequired,
    url: _propTypes.default.string.isRequired
  })).isRequired
};
CourseTabsNavigation.defaultProps = {
  activeTabSlug: undefined,
  className: null
};
var _default = exports.default = CourseTabsNavigation;
//# sourceMappingURL=CourseTabsNavigation.js.map