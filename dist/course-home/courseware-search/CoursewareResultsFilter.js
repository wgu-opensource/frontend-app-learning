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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const filterAll = 'all';
const filterTypes = ['text', 'video', 'sequence'];
const filterOther = 'other';
const validFilters = [filterAll, ...filterTypes, filterOther];
const CoursewareSearchResultsFilter = _ref => {
  let {
    intl
  } = _ref;
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
    const grouped = data.reduce((acc, _ref2) => {
      let {
          type
        } = _ref2,
        rest = _objectWithoutProperties(_ref2, _excluded);
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
    children: filters.filter(_ref3 => {
      let {
        count
      } = _ref3;
      return count > 0;
    }).map(_ref4 => {
      let {
        key,
        label
      } = _ref4;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Tab, {
        eventKey: key,
        title: label,
        "data-testid": `courseware-search-results-tabs-${key}`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CoursewareSearchResults.default, {
          results: results[key]
        })
      }, key);
    })
  });
};
exports.CoursewareSearchResultsFilter = CoursewareSearchResultsFilter;
CoursewareSearchResultsFilter.propTypes = {
  intl: _i18n.intlShape.isRequired
};
var _default = exports.default = (0, _i18n.injectIntl)(CoursewareSearchResultsFilter);
//# sourceMappingURL=CoursewareResultsFilter.js.map