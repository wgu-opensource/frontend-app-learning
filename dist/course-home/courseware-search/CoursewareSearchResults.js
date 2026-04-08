"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _icons = require("@openedx/paragon/icons");
var _frontendPlatform = require("@edx/frontend-platform");
var _paragon = require("@openedx/paragon");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _CoursewareSearchEmpty = _interopRequireDefault(require("./CoursewareSearchEmpty"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const iconTypeMapping = {
  text: _icons.TextFields,
  video: _icons.VideoCamera,
  sequence: _icons.Folder,
  other: _icons.Article
};
const defaultIcon = _icons.Article;
const CoursewareSearchResults = ({
  results = []
}) => {
  if (!results?.length) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_CoursewareSearchEmpty.default, {});
  }
  const baseUrl = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}`;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "courseware-search-results",
    "data-testid": "search-results",
    children: results.map(({
      id,
      title,
      type,
      location,
      url,
      contentHits
    }) => {
      const key = type.toLowerCase();
      const icon = iconTypeMapping[key] || defaultIcon;
      const isExternal = !url.startsWith('/');
      const linkProps = isExternal ? {
        href: url,
        target: '_blank',
        rel: 'nofollow'
      } : {
        href: `${baseUrl}${url}`
      };
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", _objectSpread(_objectSpread({
        className: "courseware-search-results__item"
      }, linkProps), {}, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "courseware-search-results__icon",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
            src: icon
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "courseware-search-results__info",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "courseware-search-results__title",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              children: title
            }), contentHits ? /*#__PURE__*/(0, _jsxRuntime.jsx)("em", {
              children: contentHits
            }) : null]
          }), location?.length ? /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
            className: "courseware-search-results__breadcrumbs",
            children:
            // This ignore is necessary because the breadcrumb texts might have duplicates.
            // The breadcrumbs are not expected to change.
            // eslint-disable-next-line react/no-array-index-key
            location.map((breadcrumb, i) => /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                children: breadcrumb
              })
            }, `${i}:${breadcrumb}`))
          }) : null]
        })]
      }), id);
    })
  });
};
CoursewareSearchResults.propTypes = {
  results: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: _propTypes.default.string,
    title: _propTypes.default.string,
    type: _propTypes.default.string,
    location: _propTypes.default.arrayOf(_propTypes.default.string),
    url: _propTypes.default.string,
    contentHits: _propTypes.default.number
  }))
};
CoursewareSearchResults.defaultProps = {
  results: []
};
var _default = exports.default = CoursewareSearchResults;
//# sourceMappingURL=CoursewareSearchResults.js.map