"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CoursewareSearchResultsFilter = void 0;
var _react = _interopRequireWildcard(require("react"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _reactRouter = require("react-router");
var _CoursewareSearchResults = _interopRequireDefault(require("./CoursewareSearchResults"));
var _messages = _interopRequireDefault(require("./messages"));
var _hooks = require("./hooks");
var _modelStore = require("../../generic/model-store");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["type"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const filterAll = 'all';
const filterTypes = ['text', 'video', 'sequence'];
const filterOther = 'other';
const validFilters = [filterAll, ...filterTypes, filterOther];
const CoursewareSearchResultsFilter = () => {
  const intl = (0, _i18n.useIntl)();
  const {
    courseId
  } = (0, _reactRouter.useParams)();
  const lastSearch = (0, _modelStore.useModel)('contentSearchResults', courseId);
  const {
    filter: filterKeyword,
    setFilter
  } = (0, _hooks.useCoursewareSearchParams)();
  if (!lastSearch) {
    return null;
  }
  const {
    results: data = []
  } = lastSearch;

  // If there's no data, we show an empty result.
  if (!data.length) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_CoursewareSearchResults.default, {});
  }
  const results = (0, _react.useMemo)(() => {
    // This reducer distributes the data into different groups to make it easy to
    // use on the filters.
    // All results are added to the "all" key and then to its proper group key as well.
    const grouped = data.reduce((acc, _ref) => {
      let {
          type
        } = _ref,
        rest = _objectWithoutProperties(_ref, _excluded);
      const resultType = filterTypes.includes(type) ? type : filterOther;
      acc[filterAll].push(_objectSpread({
        type: resultType
      }, rest));
      acc[resultType] = [...(acc[resultType] || []), _objectSpread({
        type: resultType
      }, rest)];
      return acc;
    }, {
      [filterAll]: []
    });

    // This is just to format the output object with the expected tab order.
    const output = {};
    validFilters.forEach(key => {
      if (grouped[key]) {
        output[key] = grouped[key];
      }
    });
    return output;
  }, [lastSearch]);
  const tabKeys = Object.keys(results);
  // Filter has no use if it has only 2 tabs (The "all" tab and another one with the same items).
  if (tabKeys.length < 3) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_CoursewareSearchResults.default, {
      results: results[filterAll]
    });
  }
  const filters = (0, _react.useMemo)(() => tabKeys.map(key => ({
    key,
    label: intl.formatMessage(_messages.default[`filter:${key}`]),
    count: results[key].length
  })), [results]);
  const activeKey = validFilters.includes(filterKeyword) ? filterKeyword : filterAll;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Tabs, {
    id: "courseware-search-results-tabs",
    className: "courseware-search-results-tabs",
    "data-testid": "courseware-search-results-tabs",
    variant: "tabs",
    activeKey: activeKey,
    onSelect: setFilter,
    children: filters.filter(({
      count
    }) => count > 0).map(({
      key,
      label
    }) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Tab, {
      eventKey: key,
      title: label,
      "data-testid": `courseware-search-results-tabs-${key}`,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CoursewareSearchResults.default, {
        results: results[key]
      })
    }, key))
  });
};
exports.CoursewareSearchResultsFilter = CoursewareSearchResultsFilter;
var _default = exports.default = CoursewareSearchResultsFilter;
//# sourceMappingURL=CoursewareResultsFilter.js.map